import type { TFunction } from 'i18next';
import type { Debate } from '@/shared/api/models';
import { categoryLabelKeys } from '@/shared/categories';

/** 인문 · 논술 */
export function categoryText(mask: number, t: TFunction) {
  return categoryLabelKeys(mask)
    .map((key) => t(key))
    .join(' · ');
}

/** 모임 장소. 장소가 있으면 장소, 링크만 있으면 온라인 */
export function placeText(
  debate: Pick<Debate, 'location' | 'link'>,
  t: TFunction
) {
  if (debate.location?.trim()) return debate.location.trim();
  if (debate.link) return t('page.debate.item.online');
  return null;
}

/** 온라인 · 오프라인 (짧은 카드용) */
export function placeKindText(
  debate: Pick<Debate, 'location' | 'link'>,
  t: TFunction
) {
  if (debate.location?.trim()) return t('page.debate.item.offline');
  if (debate.link) return t('page.debate.item.online');
  return null;
}
