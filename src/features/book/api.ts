import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { api } from '@/shared/api/client';
import { nextPageParam } from '@/shared/api/models';

export const bookKeys = {
  all: ['books'] as const,
  search: (query: string, provider: BookProvider, size: number) =>
    [...bookKeys.all, 'search', provider, size, query] as const,
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
