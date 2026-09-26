import {
  useMutation,
  useQuery,
  useQueryClient,
  type InfiniteData,
} from '@tanstack/react-query';
import { bookKeys, type BookSearchPage } from '@/features/book/api';
import { api } from '@/shared/api/client';

export const libraryKeys = {
  all: ['library'] as const,
  contains: (isbn: number, viewerId: number) =>
    [...libraryKeys.all, 'contains', isbn, viewerId] as const,
  mine: (viewerId: number) => [...libraryKeys.all, 'mine', viewerId] as const,
};

/** 이 책이 내 서재에 있는지 */
export function useInLibrary(isbn: number, viewerId: number) {
  return useQuery({
    queryKey: libraryKeys.contains(isbn, viewerId),
    queryFn: async ({ signal }) => {
      const isbns = (await api.get('/librarys/is_in_library', {
        query: { ids: [isbn] },
        signal,
      })) as number[];
      return isbns.includes(isbn);
    },
    enabled: isbn > 0 && viewerId > 0,
  });
}

/** 내 서재 (앞의 몇 권과 전체 권수) */
export function useMyLibrary(viewerId: number, size = 4) {
  return useQuery({
    queryKey: [...libraryKeys.mine(viewerId), size],
    queryFn: ({ signal }) =>
      api.get('/user/{user_id}/mybooks', {
        path: { user_id: viewerId },
        query: { page: 1, size },
        signal,
      }),
    enabled: viewerId > 0,
  });
}

type SearchData = InfiniteData<BookSearchPage>;
/** 통합 검색의 도서 영역 (페이지 하나) */
type SectionData = BookSearchPage;
const SECTION_KEY = ['search', 'book'] as const;

function toggleInPage(page: BookSearchPage, isbn: number, add: boolean) {
  return {
    ...page,
    inLibrary: add
      ? [...page.inLibrary, isbn]
      : page.inLibrary.filter((item) => item !== isbn),
    items: page.items.map((book) =>
      book.isbn === isbn
        ? {
            ...book,
            in_library_num: Math.max(
              0,
              (book.in_library_num ?? 0) + (add ? 1 : -1)
            ),
          }
        : book
    ),
  };
}

/**
 * 서재에 담기·빼기. 책 상세 여부와 도서 검색 결과(담은 수 포함)에 바로 반영하고
 * 실패하면 되돌려요.
 */
export function useToggleLibrary(viewerId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ isbn, add }: { isbn: number; add: boolean }) =>
      add
        ? api.post('/library/{isbn}', { path: { isbn } })
        : api.delete('/library/{isbn}', { path: { isbn } }),
    onMutate: async ({ isbn, add }) => {
      const containsKey = libraryKeys.contains(isbn, viewerId);
      const pagesKey = bookKeys.pages();
      await Promise.all([
        queryClient.cancelQueries({ queryKey: containsKey }),
        queryClient.cancelQueries({ queryKey: pagesKey }),
      ]);
      const previousContains = queryClient.getQueryData<boolean>(containsKey);
      const previousPages = queryClient.getQueriesData<SearchData>({
        queryKey: pagesKey,
      });
      queryClient.setQueryData(containsKey, add);
      const previousSections = queryClient.getQueriesData<SectionData>({
        queryKey: SECTION_KEY,
      });
      queryClient.setQueriesData<SearchData>({ queryKey: pagesKey }, (data) =>
        data
          ? {
              ...data,
              pages: data.pages.map((page) => toggleInPage(page, isbn, add)),
            }
          : data
      );
      queryClient.setQueriesData<SectionData>(
        { queryKey: SECTION_KEY },
        (data) => (data ? toggleInPage(data, isbn, add) : data)
      );
      return { previousContains, previousPages, previousSections };
    },
    onError: (_error, { isbn }, context) => {
      queryClient.setQueryData(
        libraryKeys.contains(isbn, viewerId),
        context?.previousContains
      );
      for (const [key, data] of [
        ...(context?.previousPages ?? []),
        ...(context?.previousSections ?? []),
      ]) {
        queryClient.setQueryData(key, data);
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({
        queryKey: libraryKeys.mine(viewerId),
      });
    },
  });
}
