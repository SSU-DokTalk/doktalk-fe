import type { TFunction } from 'i18next';
import { CATEGORY } from '@/common/variables';

export type CategoryOption = {
  key: string;
  /** 번역 키 (var.category.*) */
  labelKey: string;
  /** 비트마스크 값 */
  value: number;
};

/** 카테고리 9개. 서버는 여러 개를 비트마스크 하나로 주고받아요. */
export const CATEGORY_OPTIONS: CategoryOption[] = Object.entries(CATEGORY).map(
  ([key, category]) => ({ key, labelKey: category.name, value: category.value })
);

/** 비트마스크에 들어 있는 카테고리의 번역 키 */
export function categoryLabelKeys(mask: number): string[] {
  return CATEGORY_OPTIONS.filter((option) => (mask & option.value) !== 0).map(
    (option) => option.labelKey
  );
}

/** 인문 · 논술 */
export function categoryText(mask: number, t: TFunction) {
  return categoryLabelKeys(mask)
    .map((key) => t(key))
    .join(' · ');
}
