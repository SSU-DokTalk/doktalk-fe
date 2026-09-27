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

/** 온라인 · 오프라인 (짧은 카드용) */
export function placeKindText(
  debate: Pick<Debate, 'location' | 'is_online'>,
  t: TFunction
) {
  if (debate.location?.trim()) return t('page.debate.item.offline');
  if (debate.is_online) return t('page.debate.item.online');
  return null;
}
