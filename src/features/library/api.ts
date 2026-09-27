import {
  infiniteQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  type InfiniteData,
} from '@tanstack/react-query';
import { bookKeys, type BookSearchPage } from '@/features/book/api';
import { api } from '@/shared/api/client';
import { nextPageParam, type Page } from '@/shared/api/models';
import type { components } from '@/shared/api/schema';

export type LibraryBook = components['schemas']['BasicMyBookRes'];

/** 서재 한 번에 24권 (6·4·3칸 그리드가 모두 딱 떨어져요) */
export const LIBRARY_PAGE_SIZE = 24;

export const libraryKeys = {
  all: ['library'] as const,
  contains: (isbn: number, viewerId: number) =>
    [...libraryKeys.all, 'contains', isbn, viewerId] as const,
  mine: (viewerId: number) => [...libraryKeys.all, 'mine', viewerId] as const,
  /** 한 사람의 서재 전체 (페이지로) */
  books: (userId: number) => [...libraryKeys.all, 'books', userId] as const,
};

/** 한 사람의 서재 (최근에 담은 순) */
export function libraryBooksQuery(userId: number) {
  return infiniteQueryOptions({
    queryKey: libraryKeys.books(userId),
    queryFn: ({ pageParam, signal }) =>
      api.get('/user/{user_id}/mybooks', {
        path: { user_id: userId },
        query: { page: pageParam, size: LIBRARY_PAGE_SIZE },
        signal,
      }),
    initialPageParam: 1,
    getNextPageParam: nextPageParam,
  });
}

export function useLibraryBooks(userId: number) {
  return useInfiniteQuery({
    ...libraryBooksQuery(userId),
    enabled: userId > 0,
  });
}

type BooksData = InfiniteData<Page<LibraryBook>>;

/** 내 서재에서 빼기. 목록에서 바로 지우고 실패하면 되돌려요. */
export function useRemoveFromLibrary(viewerId: number) {
  const queryClient = useQueryClient();
  const booksKey = libraryKeys.books(viewerId);

  return useMutation({
    mutationKey: [...booksKey, 'remove'],
    mutationFn: (isbn: number) =>
      api.delete('/library/{isbn}', { path: { isbn } }),
    onMutate: async (isbn) => {
      await queryClient.cancelQueries({ queryKey: booksKey });
      const previous = queryClient.getQueryData<BooksData>(booksKey);
      queryClient.setQueryData<BooksData>(booksKey, (data) =>
        data
          ? {
              ...data,
              pages: data.pages.map((page) => ({
                ...page,
                items: page.items.filter((item) => item.isbn !== isbn),
                total: page.total === null ? null : Math.max(0, page.total - 1),
              })),
            }
          : data
      );
      queryClient.setQueryData(libraryKeys.contains(isbn, viewerId), false);
      return { previous };
    },
    onError: (_error, isbn, context) => {
      queryClient.setQueryData(booksKey, context?.previous);
      void queryClient.invalidateQueries({
        queryKey: libraryKeys.contains(isbn, viewerId),
      });
    },
    onSettled: () => {
      void queryClient.invalidateQueries({
        queryKey: libraryKeys.mine(viewerId),
      });
      // 도서 검색 결과의 '담은 수'도 맞춰요.
      void queryClient.invalidateQueries({ queryKey: bookKeys.pages() });
      // 페이지 경계가 밀려서 서재를 다시 불러와요. 여러 권을 연달아 빼는 중이면
      // 마지막 요청이 끝난 뒤 한 번만 불러와서 빠진 책이 잠깐 되살아나지 않게 해요.
      if (
        queryClient.isMutating({ mutationKey: [...booksKey, 'remove'] }) <= 1
      ) {
        void queryClient.invalidateQueries({ queryKey: booksKey });
      }
    },
  });
}

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
      void queryClient.invalidateQueries({
        queryKey: libraryKeys.books(viewerId),
      });
    },
  });
}
