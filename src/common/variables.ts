export const ACCEPTABLE_IMAGE = [".jpg", ".jpeg", ".png", ".gif"];
export const ACCEPTABLE_FILE = [".pdf"];
export const ACCEPTABLE = [...ACCEPTABLE_IMAGE, ...ACCEPTABLE_FILE];
export const DEFAULT_LANGUAGE = "kr";
export const CATEGORY: {
  [key: string]: { name: string; value: number };
} = {
  POLITICS: { name: "var.category.POLITICS", value: 1 << 0 },
  HUMANITIES: { name: "var.category.HUMANITIES", value: 1 << 1 },
  ECONOMY: { name: "var.category.ECONOMY", value: 1 << 2 },
  HISTORY: { name: "var.category.HISTORY", value: 1 << 3 },
  SCIENCE: { name: "var.category.SCIENCE", value: 1 << 4 },
  ESSAY: { name: "var.category.ESSAY", value: 1 << 5 },
  TEENAGER: { name: "var.category.TEENAGER", value: 1 << 6 },
  CHILD: { name: "var.category.CHILD", value: 1 << 7 },
  WEBTOON: { name: "var.category.WEBTOON", value: 1 << 8 },
} as const;
export type CATEGORY_KEY = keyof typeof CATEGORY;
