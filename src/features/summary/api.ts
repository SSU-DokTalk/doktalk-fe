import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api/client';

/** 캐시 키. 요약을 쓰거나 지우면 summaryKeys.all로 한 번에 다시 불러와요. */
export const summaryKeys = {
  all: ['summaries'] as const,
  popular: () => [...summaryKeys.all, 'popular'] as const,
};

/** 좋아요가 많은 요약 */
export function popularSummariesQuery() {
  return queryOptions({
    queryKey: summaryKeys.popular(),
    queryFn: ({ signal }) => api.get('/summary/popular', { signal }),
  });
}

export function usePopularSummaries() {
  return useQuery(popularSummariesQuery());
}
