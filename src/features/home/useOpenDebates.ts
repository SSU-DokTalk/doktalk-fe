import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { debateListQuery } from '@/features/debate/api';
import { parseServerDate } from '@/shared/format';

/** 모집 중 정렬: 최신·인기는 서버 정렬, 모임 가까운 순은 모임 날짜 순 */
export type OpenDebateSort = 'latest' | 'popular' | 'soonest';

/**
 * 모집 중인 토론방 = 모임 날짜가 아직 오지 않은 토론방.
 * 서버에 '앞으로 열릴 모임' 조건이 없어서 첫 페이지(10개)를 받아 걸러요.
 * 목록 화면(/debate)과 같은 캐시를 써서 '전체 보기'로 가도 다시 부르지 않아요.
 */
export function useOpenDebates(category: number, sort: OpenDebateSort) {
  const query = useInfiniteQuery({
    ...debateListQuery({
      category,
      search: '',
      searchBy: 'bt',
      sort: sort === 'popular' ? 'popular' : 'latest',
    }),
    placeholderData: keepPreviousData,
  });

  const recent = useMemo(() => query.data?.pages[0]?.items ?? [], [query.data]);

  const debates = useMemo(() => {
    const now = Date.now();
    const open = recent.filter(
      (debate) =>
        debate.held_at && parseServerDate(debate.held_at).getTime() > now
    );
    if (sort === 'soonest') {
      open.sort(
        (a, b) =>
          parseServerDate(a.held_at!).getTime() -
          parseServerDate(b.held_at!).getTime()
      );
    }
    return open;
  }, [recent, sort]);

  /** debates: 모집 중(모임 전), recent: 첫 페이지 전부 (모집 중이 없을 때 대신 보여줘요) */
  return { query, debates, recent };
}
