import {
  infiniteQueryOptions,
  queryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { api, httpStatus } from '@/shared/api/client';
import {
  nextPageParam,
  type Comment,
  type Debate,
  type Purchase,
} from '@/shared/api/models';
import type { components } from '@/shared/api/schema';
import type { SearchBy } from '@/shared/hooks/useListParams';
import { uploadFiles } from '@/shared/api/upload';

export type DebateSort = 'latest' | 'popular' | 'from';
export type DebateSearchBy = SearchBy;

export type DebateListFilters = {
  /** 카테고리 비트마스크. 0이면 전체 */
  category: number;
  search: string;
  /** bt: 도서 제목, it: 토론방 제목 */
  searchBy: DebateSearchBy;
  /** latest: 최신순, popular: 최근 7일 좋아요순, from: 고른 날짜 이후 개설순 */
  sort: DebateSort;
  /** sort가 from일 때 기준 날짜 (YYYY.MM.DD) */
  from?: string;
};

const PAGE_SIZE = 10;

/** 캐시 키. 글을 쓰거나 지우면 debateKeys.all로 한 번에 다시 불러와요. */
export const debateKeys = {
  all: ['debates'] as const,
  lists: () => [...debateKeys.all, 'list'] as const,
  list: (filters: DebateListFilters) =>
    [...debateKeys.lists(), filters] as const,
  popular: () => [...debateKeys.all, 'popular'] as const,
  detail: (id: number) => [...debateKeys.all, 'detail', id] as const,
  comments: (id: number) => [...debateKeys.all, 'comments', id] as const,
  /** 보는 사람마다 다른 값(좋아요·참여)은 로그인한 사용자 id를 키에 넣어요. */
  liked: (id: number, viewerId: number) =>
    [...debateKeys.all, 'liked', id, viewerId] as const,
  purchase: (id: number, viewerId: number) =>
    [...debateKeys.all, 'purchase', id, viewerId] as const,
};

export function debateListQuery(filters: DebateListFilters) {
  return infiniteQueryOptions({
    queryKey: debateKeys.list(filters),
    queryFn: ({ pageParam, signal }) =>
      api.get('/debate', {
        query: {
          category: filters.category,
          search: filters.search,
          searchby: filters.searchBy,
          sortby: filters.sort,
          from_: filters.sort === 'from' ? filters.from : undefined,
          page: pageParam,
          size: PAGE_SIZE,
        },
        signal,
      }),
    initialPageParam: 1,
    getNextPageParam: nextPageParam,
  });
}

/** 좋아요·댓글이 많은 토론방 5개 */
export function popularDebatesQuery() {
  return queryOptions({
    queryKey: debateKeys.popular(),
    queryFn: ({ signal }) => api.get('/debate/popular', { signal }),
  });
}

export function useDebateList(filters: DebateListFilters) {
  return useInfiniteQuery(debateListQuery(filters));
}

export function usePopularDebates() {
  return useQuery(popularDebatesQuery());
}

/* ---------- 상세 ---------- */

export function debateQuery(id: number) {
  return queryOptions({
    queryKey: debateKeys.detail(id),
    queryFn: ({ signal }) =>
      api.get('/debate/{debate_id}', { path: { debate_id: id }, signal }),
  });
}

export function useDebate(id: number) {
  return useQuery({ ...debateQuery(id), enabled: id > 0 });
}

/** 댓글 전체 (토론 댓글은 페이지 없이 한 번에 와요) */
export function useDebateComments(id: number, enabled: boolean) {
  return useQuery({
    queryKey: debateKeys.comments(id),
    queryFn: async ({ signal }) =>
      (await api.get('/debate/{debate_id}/comments', {
        path: { debate_id: id },
        signal,
      })) as Comment[],
    enabled: enabled && id > 0,
  });
}

/** 내가 좋아요를 눌렀는지 */
export function useDebateLiked(id: number, viewerId: number) {
  return useQuery({
    queryKey: debateKeys.liked(id, viewerId),
    queryFn: async ({ signal }) => {
      const liked = await api.get('/debates/like', {
        query: { ids: [id] },
        signal,
      });
      return liked.includes(id);
    },
    enabled: id > 0 && viewerId > 0,
  });
}

/** 내 참여(구매) 기록. 없으면 null */
export function useDebatePurchase(id: number, viewerId: number) {
  return useQuery({
    queryKey: debateKeys.purchase(id, viewerId),
    queryFn: async ({ signal }): Promise<Purchase | null> => {
      try {
        return await api.get('/purchase/{product_type}/{product_id}', {
          path: { product_type: 'D', product_id: id },
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

/** 좋아요 누르기·취소. 누르는 즉시 화면에 반영하고 실패하면 되돌려요. */
export function useToggleDebateLike(id: number, viewerId: number) {
  const queryClient = useQueryClient();
  const likedKey = debateKeys.liked(id, viewerId);
  const detailKey = debateKeys.detail(id);

  return useMutation({
    mutationFn: (like: boolean) =>
      like
        ? api.post('/debate/{debate_id}/like', { path: { debate_id: id } })
        : api.delete('/debate/{debate_id}/like', { path: { debate_id: id } }),
    onMutate: async (like) => {
      await queryClient.cancelQueries({ queryKey: likedKey });
      const previousLiked = queryClient.getQueryData<boolean>(likedKey);
      const previousDebate = queryClient.getQueryData<Debate>(detailKey);
      queryClient.setQueryData(likedKey, like);
      queryClient.setQueryData<Debate>(detailKey, (debate) =>
        debate
          ? {
              ...debate,
              likes_num: Math.max(0, debate.likes_num + (like ? 1 : -1)),
            }
          : debate
      );
      return { previousLiked, previousDebate };
    },
    onError: (_error, _like, context) => {
      queryClient.setQueryData(likedKey, context?.previousLiked);
      queryClient.setQueryData(detailKey, context?.previousDebate);
    },
    onSettled: () => {
      // 목록의 좋아요 수도 맞춰요. 보고 있지 않은 목록은 다음에 열 때 다시 불러와요.
      void queryClient.invalidateQueries({ queryKey: debateKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: debateKeys.popular() });
    },
  });
}

/**
 * 무료 토론방 참여. 결제 없이 참여 기록만 만들어요.
 * 유료는 결제를 마친 뒤 /checkout/success에서 기록을 만들어요.
 */
export function useJoinFreeDebate(debate: Debate, viewerId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      try {
        await api.post('/purchase', {
          body: {
            product_type: 'D',
            product_id: debate.id,
            content: debate.title,
            price: 0,
            quantity: 1,
          },
        });
      } catch (error) {
        // 이미 참여한 경우예요. 참여 상태를 다시 불러오면 돼요.
        if (httpStatus(error) !== 409) throw error;
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: debateKeys.purchase(debate.id, viewerId),
      }),
  });
}

/** 댓글·답글 쓰기 */
export function useCreateDebateComment(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { content: string; upperCommentId?: number }) =>
      api.post('/debate/{debate_id}/comment', {
        path: { debate_id: id },
        body: {
          content: input.content,
          upper_comment_id: input.upperCommentId ?? null,
        },
      }),
    onSuccess: () => {
      queryClient.setQueryData<Debate>(debateKeys.detail(id), (debate) =>
        debate ? { ...debate, comments_num: debate.comments_num + 1 } : debate
      );
      void queryClient.invalidateQueries({ queryKey: debateKeys.comments(id) });
      void queryClient.invalidateQueries({ queryKey: debateKeys.lists() });
    },
  });
}

export function useDeleteDebate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      api.delete('/debate/{debate_id}', { path: { debate_id: id } }),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: debateKeys.detail(id) });
      void queryClient.invalidateQueries({ queryKey: debateKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: debateKeys.popular() });
    },
  });
}

/* ---------- 만들기·수정 ---------- */

type DebateRequest = components['schemas']['CreateDebateReq'];

type SaveDebateInput = {
  /** 새로 고른 파일. 먼저 올리고 요청에 붙여요. */
  files: File[];
  toRequest: (uploaded: DebateRequest['files']) => DebateRequest;
};

/** 파일 업로드 단계에서 실패했는지 구분해요 (안내 문구가 달라요). */
export class UploadError extends Error {}

async function uploadForDebate(files: File[]) {
  try {
    return await uploadFiles(files, 'debate');
  } catch (error) {
    throw new UploadError(String(error));
  }
}

/** 토론방 만들기. 성공하면 새 토론방 id를 돌려줘요. */
export function useCreateDebate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ files, toRequest }: SaveDebateInput) => {
      const uploaded = await uploadForDebate(files);
      return api.post('/debate', { body: toRequest(uploaded) });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: debateKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: debateKeys.popular() });
    },
  });
}

export function useUpdateDebate(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ files, toRequest }: SaveDebateInput) => {
      const uploaded = await uploadForDebate(files);
      await api.put('/debate/{debate_id}', {
        path: { debate_id: id },
        body: toRequest(uploaded),
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: debateKeys.detail(id) });
      void queryClient.invalidateQueries({ queryKey: debateKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: debateKeys.popular() });
    },
  });
}
