import type { TFunction } from 'i18next';
import type { Debate } from '@/shared/api/models';

export { categoryText } from '@/shared/categories';

/**
 * 모임 장소. 장소가 있으면 장소, 링크만 있으면 온라인.
 * 링크는 주최자·참여자에게만 와서 온라인인지는 is_online으로 봐요.
 */
export function placeText(
  debate: Pick<Debate, 'location' | 'is_online'>,
  t: TFunction
) {
  if (debate.location?.trim()) return debate.location.trim();
  if (debate.is_online) return t('page.debate.item.online');
  return null;
}

/**
 * 모인 인원/정원 (예: 참여 4/12명). 정원에는 주최자도 들어가서 참여한 사람 수에 1을 더해요.
 * 정원이 0이면 제한이 없어서 null이에요.
 */
export function seatsText(
  debate: Pick<Debate, 'limit' | 'participants_num'>,
  t: TFunction
) {
  if (debate.limit <= 0) return null;
  return t('page.debate.item.seats', {
    count: memberCount(debate),
    limit: debate.limit,
  });
}

/** 모인 인원 (주최자 포함) */
export const memberCount = (debate: Pick<Debate, 'participants_num'>) =>
  debate.participants_num + 1;

/** 온라인 · 오프라인 (짧은 카드용) */
export function placeKindText(
  debate: Pick<Debate, 'location' | 'is_online'>,
  t: TFunction
) {
  if (debate.location?.trim()) return t('page.debate.item.offline');
  if (debate.is_online) return t('page.debate.item.online');
  return null;
}
