import {
  infiniteQueryOptions,
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { api, httpStatus } from '@/shared/api/client';
import {
  nextPageParam,
  type Comment,
  type Purchase,
  type Summary,
} from '@/shared/api/models';
import type { components } from '@/shared/api/schema';
import { uploadFiles } from '@/shared/api/upload';
import type { SearchBy } from '@/shared/hooks/useListParams';

export type SummarySort = 'latest' | 'popular';

/**
 * 백엔드는 유료 내용 자리에 같은 길이의 가짜 문장을 넣어 보내요(흐리게 보여줄 용도).
 * 문장 언어만 고를 수 있어서 영어 화면만 us, 나머지는 kr이에요.
 */
export type MaskLanguage = 'kr' | 'us';
export const maskLanguageFor = (language: string): MaskLanguage =>
  language === 'us' ? 'us' : 'kr';

export type SummaryListFilters = {
  category: number;
  search: string;
  searchBy: SearchBy;
  sort: SummarySort;
  lang: MaskLanguage;
};

const PAGE_SIZE = 10;

/** 캐시 키. 요약을 쓰거나 지우면 summaryKeys.all로 한 번에 다시 불러와요. */
export const summaryKeys = {
  all: ['summaries'] as const,
  lists: () => [...summaryKeys.all, 'list'] as const,
  list: (filters: SummaryListFilters) =>
    [...summaryKeys.lists(), filters] as const,
  popular: (lang: MaskLanguage) =>
    [...summaryKeys.all, 'popular', lang] as const,
  detail: (id: number, lang: MaskLanguage) =>
    [...summaryKeys.all, 'detail', id, lang] as const,
  details: (id: number) => [...summaryKeys.all, 'detail', id] as const,
  comments: (id: number) => [...summaryKeys.all, 'comments', id] as const,
  liked: (id: number, viewerId: number) =>
    [...summaryKeys.all, 'liked', id, viewerId] as const,
  purchase: (id: number, viewerId: number) =>
    [...summaryKeys.all, 'purchase', id, viewerId] as const,
  charged: (id: number, viewerId: number) =>
    [...summaryKeys.all, 'charged', id, viewerId] as const,
};

/* ---------- 목록 ---------- */

export function summaryListQuery(filters: SummaryListFilters) {
  return infiniteQueryOptions({
    queryKey: summaryKeys.list(filters),
    queryFn: ({ pageParam, signal }) =>
      api.get('/summary', {
        query: {
          category: filters.category,
          search: filters.search,
          searchby: filters.searchBy,
          sortby: filters.sort,
          lang: filters.lang,
          page: pageParam,
          size: PAGE_SIZE,
        },
        signal,
      }),
    initialPageParam: 1,
    getNextPageParam: nextPageParam,
  });
}

/** 좋아요가 많은 요약 */
export function popularSummariesQuery(lang: MaskLanguage = 'kr') {
  return queryOptions({
    queryKey: summaryKeys.popular(lang),
    queryFn: ({ signal }) =>
      api.get('/summary/popular', { query: { lang }, signal }),
  });
}

export function usePopularSummaries(lang: MaskLanguage = 'kr') {
  return useQuery(popularSummariesQuery(lang));
}

/* ---------- 상세 ---------- */

export function useSummary(id: number, lang: MaskLanguage) {
  return useQuery({
    queryKey: summaryKeys.detail(id, lang),
    queryFn: ({ signal }) =>
      api.get('/summary/{summary_id}', {
        path: { summary_id: id },
        query: { lang },
        signal,
      }),
    enabled: id > 0,
  });
}

/** 내 구매 기록. 없으면 null */
export function useSummaryPurchase(id: number, viewerId: number) {
  return useQuery({
    queryKey: summaryKeys.purchase(id, viewerId),
    queryFn: async ({ signal }): Promise<Purchase | null> => {
      try {
        return await api.get('/purchase/{product_type}/{product_id}', {
          path: { product_type: 'S', product_id: id },
          signal,
        });
      } catch (error) {
        if (httpStatus(error) === 404) return null;
        throw error;
      }
    },
    enabled: id > 0 && viewerId > 0,
  });
}

/** 유료 내용. 구매한 사람만 받을 수 있어요. 없으면(404) null */
export function useChargedContent(
  id: number,
  viewerId: number,
  enabled: boolean
) {
  return useQuery({
    queryKey: summaryKeys.charged(id, viewerId),
    queryFn: async ({ signal }): Promise<string | null> => {
      try {
        return await api.get('/summary/{summary_id}/charged_content', {
          path: { summary_id: id },
          signal,
        });
      } catch (error) {
        if (httpStatus(error) === 404) return null;
        throw error;
      }
    },
    enabled: enabled && id > 0 && viewerId > 0,
    staleTime: Infinity,
  });
}

export function useSummaryLiked(id: number, viewerId: number) {
  return useQuery({
    queryKey: summaryKeys.liked(id, viewerId),
    queryFn: async ({ signal }) => {
      const liked = (await api.get('/summarys/like', {
        query: { ids: [id] },
        signal,
      })) as number[];
      return liked.includes(id);
    },
    enabled: id > 0 && viewerId > 0,
  });
}

/** 좋아요 누르기·취소. 누르는 즉시 반영하고 실패하면 되돌려요. */
export function useToggleSummaryLike(id: number, viewerId: number) {
  const queryClient = useQueryClient();
  const likedKey = summaryKeys.liked(id, viewerId);
  const detailKey = summaryKeys.details(id);

  return useMutation({
    mutationFn: (like: boolean) =>
      like
        ? api.post('/summary/{summary_id}/like', {
            path: { summary_id: id },
          })
        : api.delete('/summary/{summary_id}/like', {
            path: { summary_id: id },
          }),
    onMutate: async (like) => {
      await queryClient.cancelQueries({ queryKey: likedKey });
      const previousLiked = queryClient.getQueryData<boolean>(likedKey);
      const previousDetails = queryClient.getQueriesData<Summary>({
        queryKey: detailKey,
      });
      queryClient.setQueryData(likedKey, like);
      queryClient.setQueriesData<Summary>({ queryKey: detailKey }, (summary) =>
        summary
          ? {
              ...summary,
              likes_num: Math.max(0, summary.likes_num + (like ? 1 : -1)),
            }
          : summary
      );
      return { previousLiked, previousDetails };
    },
    onError: (_error, _like, context) => {
      queryClient.setQueryData(likedKey, context?.previousLiked);
      for (const [key, data] of context?.previousDetails ?? []) {
        queryClient.setQueryData(key, data);
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: summaryKeys.lists() });
    },
  });
}

/** 무료 요약 열기. 결제 없이 구매 기록만 만들고 유료 내용을 다시 불러와요. */
export function useUnlockFreeSummary(summary: Summary, viewerId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      try {
        await api.post('/purchase', {
          body: {
            product_type: 'S',
            product_id: summary.id,
            content: summary.title,
            price: 0,
            quantity: 1,
          },
        });
      } catch (error) {
        if (httpStatus(error) !== 409) throw error;
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: summaryKeys.purchase(summary.id, viewerId),
      });
      await queryClient.invalidateQueries({
        queryKey: summaryKeys.charged(summary.id, viewerId),
      });
    },
  });
}

export function useSummaryComments(id: number) {
  return useQuery({
    queryKey: summaryKeys.comments(id),
    queryFn: async ({ signal }) =>
      (await api.get('/summary/{summary_id}/comments', {
        path: { summary_id: id },
        signal,
      })) as Comment[],
    enabled: id > 0,
  });
}

export function useCreateSummaryComment(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { content: string; upperCommentId?: number }) =>
      api.post('/summary/{summary_id}/comment', {
        path: { summary_id: id },
        // 백엔드가 upper_comment_id를 필수로 받아서 지금은 답글만 등록돼요.
        // Optional로 고치면(백엔드 작업) 맨 위 댓글도 그대로 동작해요.
        body: {
          content: input.content,
          ...(input.upperCommentId
            ? { upper_comment_id: input.upperCommentId }
            : {}),
        } as components['schemas']['CreateSummaryCommentReq'],
      }),
    onSuccess: () => {
      queryClient.setQueriesData<Summary>(
        { queryKey: summaryKeys.details(id) },
        (summary) =>
          summary
            ? { ...summary, comments_num: summary.comments_num + 1 }
            : summary
      );
      void queryClient.invalidateQueries({
        queryKey: summaryKeys.comments(id),
      });
      void queryClient.invalidateQueries({ queryKey: summaryKeys.lists() });
    },
  });
}

export function useDeleteSummary() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      api.delete('/summary/{summary_id}', { path: { summary_id: id } }),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: summaryKeys.details(id) });
      void queryClient.invalidateQueries({ queryKey: summaryKeys.lists() });
      void queryClient.invalidateQueries({
        queryKey: [...summaryKeys.all, 'popular'],
      });
    },
  });
}

/* ---------- 쓰기·수정 ---------- */

type SummaryRequest = components['schemas']['CreateSummaryReq'];

type SaveSummaryInput = {
  files: File[];
  toRequest: (uploaded: NonNullable<SummaryRequest['files']>) => SummaryRequest;
};

/** 파일 업로드 단계에서 실패했는지 구분해요 (안내 문구가 달라요). */
export class SummaryUploadError extends Error {}

async function uploadForSummary(files: File[]) {
  try {
    return await uploadFiles(files, 'summary');
  } catch (error) {
    throw new SummaryUploadError(String(error));
  }
}

export function useCreateSummary() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ files, toRequest }: SaveSummaryInput) => {
      const uploaded = await uploadForSummary(files);
      return api.post('/summary', { body: toRequest(uploaded) });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: summaryKeys.lists() });
    },
  });
}

export function useUpdateSummary(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ files, toRequest }: SaveSummaryInput) => {
      const uploaded = await uploadForSummary(files);
      await api.put('/summary/{summary_id}', {
        path: { summary_id: id },
        body: toRequest(uploaded),
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: summaryKeys.details(id) });
      void queryClient.invalidateQueries({ queryKey: summaryKeys.lists() });
      void queryClient.invalidateQueries({
        queryKey: [...summaryKeys.all, 'charged', id],
      });
    },
  });
}
