import {
  infiniteQueryOptions,
  queryOptions,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { api } from '@/shared/api/client';
import { nextPageParam } from '@/shared/api/models';

export type DebateSort = 'latest' | 'popular' | 'from';
export type DebateSearchBy = 'bt' | 'it';

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
