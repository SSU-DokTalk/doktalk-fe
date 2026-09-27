import type { Summary } from '@/shared/api/models';
import { useAuth } from '@/shell/hooks';
import {
  useChargedContent,
  useSummaryPurchase,
  useUnlockFreeSummary,
} from './api';

/**
 * 유료 내용을 볼 수 있는지. 서버는 작성자와 구매 기록이 있는 사람에게 유료 내용을 줘요.
 * 무료 요약은 '무료로 읽기'로 0원 구매 기록을 만들어 내 서재에 담은 뒤 열어요.
 */
export function useSummaryAccess(summary: Summary) {
  const { user, isLoggedIn } = useAuth();
  const viewerId = isLoggedIn ? (user.id ?? 0) : 0;
  const isOwner = viewerId > 0 && viewerId === summary.user.id;
  const purchase = useSummaryPurchase(summary.id, viewerId);
  const purchased = Boolean(purchase.data);
  const charged = useChargedContent(summary.id, viewerId, purchased || isOwner);
  const unlock = useUnlockFreeSummary(summary, viewerId);

  return {
    viewerId,
    isLoggedIn,
    isOwner,
    purchase,
    purchased,
    charged,
    /** 유료 내용까지 볼 수 있어요 */
    unlocked: typeof charged.data === 'string',
    /** 구매·유료 내용을 확인하는 중 */
    checking:
      purchase.isLoading || (charged.isLoading && (purchased || isOwner)),
    unlock,
  };
}

export type SummaryAccess = ReturnType<typeof useSummaryAccess>;
