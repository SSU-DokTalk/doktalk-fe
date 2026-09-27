import { useMemo } from 'react';
import { useDebatesByIds, useHostedDebates } from '@/features/debate/api';
import { productIds, usePurchaseHistory } from '@/features/payment/api';
import type { Debate } from '@/shared/api/models';
import { parseServerDate } from '@/shared/format';

export type Meeting = {
  debate: Debate;
  role: 'host' | 'guest';
  at: Date | null;
};

const DAY = 24 * 60 * 60 * 1000;

/** 오늘부터 며칠 남았는지 (날짜 기준, 오늘이면 0) */
export function daysUntil(date: Date) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - start.getTime()) / DAY);
}

/**
 * 내가 연 토론방과 참여한 토론방을 합쳐서 다가오는 모임·지난 모임으로 나눠요.
 * 참여한 토론방은 구매 기록에서 찾아서 상세 화면과 같은 캐시로 불러와요.
 */
export function useMyMeetings(viewerId: number) {
  const hosted = useHostedDebates(viewerId);
  const history = usePurchaseHistory(viewerId);
  const joinedIds = useMemo(
    () => productIds(history.data, 'D'),
    [history.data]
  );
  const joined = useDebatesByIds(joinedIds);

  const { upcoming, past } = useMemo(() => {
    const byId = new Map<number, Meeting>();
    for (const debate of [...(hosted.data ?? []), ...joined.debates]) {
      if (byId.has(debate.id)) continue;
      byId.set(debate.id, {
        debate,
        role: debate.user_id === viewerId ? 'host' : 'guest',
        at: debate.held_at ? parseServerDate(debate.held_at) : null,
      });
    }
    const now = Date.now();
    const all = [...byId.values()];
    return {
      // 날짜가 없는 모임은 다가오는 모임 맨 뒤에 둬요.
      upcoming: all
        .filter((meeting) => !meeting.at || meeting.at.getTime() >= now)
        .sort(
          (a, b) =>
            (a.at?.getTime() ?? Infinity) - (b.at?.getTime() ?? Infinity)
        ),
      past: all
        .filter((meeting) => meeting.at && meeting.at.getTime() < now)
        .sort((a, b) => (b.at?.getTime() ?? 0) - (a.at?.getTime() ?? 0)),
    };
  }, [hosted.data, joined.debates, viewerId]);

  return {
    upcoming,
    past,
    isPending: hosted.isPending || history.isPending || joined.isPending,
    isError: hosted.isError || history.isError,
    isPartial: joined.isError,
    retry: () => {
      void hosted.refetch();
      void history.refetch();
    },
  };
}
