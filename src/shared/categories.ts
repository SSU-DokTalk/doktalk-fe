import type { TFunction } from 'i18next';

/** 서버의 카테고리 목록. 값은 비트마스크 자리예요. */
const CATEGORY: Record<string, { name: string; value: number }> = {
  POLITICS: { name: 'var.category.POLITICS', value: 1 << 0 },
  HUMANITIES: { name: 'var.category.HUMANITIES', value: 1 << 1 },
  ECONOMY: { name: 'var.category.ECONOMY', value: 1 << 2 },
  HISTORY: { name: 'var.category.HISTORY', value: 1 << 3 },
  SCIENCE: { name: 'var.category.SCIENCE', value: 1 << 4 },
  ESSAY: { name: 'var.category.ESSAY', value: 1 << 5 },
  TEENAGER: { name: 'var.category.TEENAGER', value: 1 << 6 },
  CHILD: { name: 'var.category.CHILD', value: 1 << 7 },
  WEBTOON: { name: 'var.category.WEBTOON', value: 1 << 8 },
};

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
