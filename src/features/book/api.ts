import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { api } from '@/shared/api/client';
import { nextPageParam } from '@/shared/api/models';
import type { components } from '@/shared/api/schema';

export type BookResult = components['schemas']['BookAPISchema'];
export type BookSort = 'latest' | 'popular';

/** 도서 검색 한 페이지 + 그중 내 서재에 있는 책 isbn */
export type BookSearchPage = components['schemas']['BookAPIResponseSchema'] & {
  inLibrary: number[];
};

export const bookKeys = {
  all: ['books'] as const,
  search: (query: string, provider: BookProvider, size: number) =>
    [...bookKeys.all, 'search', provider, size, query] as const,
  /** 도서 검색 화면 (서재 여부 포함) */
  pages: () => [...bookKeys.all, 'page'] as const,
  page: (
    query: string,
    provider: BookProvider,
    sort: BookSort,
    viewerId: number
  ) => [...bookKeys.pages(), provider, sort, viewerId, query] as const,
};

/** 영어 화면은 구글 도서, 그 밖에는 네이버 책 검색을 써요. */
export type BookProvider = 'naver' | 'google';

export function bookProviderFor(language: string): BookProvider {
  return language === 'us' ? 'google' : 'naver';
}

export function bookSearchQuery(
  query: string,
  provider: BookProvider,
  size: number
) {
  return infiniteQueryOptions({
    queryKey: bookKeys.search(query, provider, size),
    queryFn: ({ pageParam, signal }) =>
      api.get('/books', {
        query: {
          search: query,
          page: pageParam,
          size,
          sortby: 'latest',
          api_provider: provider,
        },
        signal,
      }),
    initialPageParam: 1,
    getNextPageParam: nextPageParam,
    staleTime: 5 * 60_000,
  });
}

export function useBookSearch(query: string, provider: BookProvider, size = 5) {
  return useInfiniteQuery({
    ...bookSearchQuery(query, provider, size),
    enabled: query.trim().length > 0,
  });
}

const SEARCH_PAGE_SIZE = 10;

/** 도서 검색 화면. 로그인했으면 페이지마다 내 서재 여부를 같이 불러와요. */
export function useBookSearchPage(
  query: string,
  provider: BookProvider,
  sort: BookSort,
  viewerId: number
) {
  return useInfiniteQuery({
    queryKey: bookKeys.page(query, provider, sort, viewerId),
    queryFn: async ({ pageParam, signal }): Promise<BookSearchPage> => {
      const page = await api.get('/books', {
        query: {
          search: query,
          page: pageParam,
          size: SEARCH_PAGE_SIZE,
          sortby: sort,
          api_provider: provider,
        },
        signal,
      });
      const ids = page.items.map((book) => book.isbn);
      const inLibrary =
        viewerId > 0 && ids.length > 0
          ? ((await api.get('/librarys/is_in_library', {
              query: { ids },
              signal,
            })) as number[])
          : [];
      return { ...page, inLibrary };
    },
    initialPageParam: 1,
    getNextPageParam: nextPageParam,
    enabled: query.trim().length > 0,
    staleTime: 5 * 60_000,
  });
}
