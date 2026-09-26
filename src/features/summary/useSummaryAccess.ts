import type { Summary } from '@/shared/api/models';
import { useAuth } from '@/shell/hooks';
import {
  useChargedContent,
  useSummaryPurchase,
  useUnlockFreeSummary,
} from './api';

/**
 * 유료 내용을 볼 수 있는지. 구매 기록이 있어야 서버가 유료 내용을 줘요.
 * 작성자도 지금은 구매 기록이 없으면 받을 수 없어요(백엔드 수정 대기).
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
