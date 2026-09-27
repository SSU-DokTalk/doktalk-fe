/** 네이버는 공동 저자를 ^로 이어 줘요. */
export const authorText = (author?: string | null) =>
  author?.replace(/\^/g, ', ') ?? '';

/** 20220315 · 2022-03-15 → 2022.03 */
export function pubdateText(pubdate?: string | null) {
  const digits = pubdate?.replace(/\D/g, '') ?? '';
  if (digits.length < 6) return digits;
  return `${digits.slice(0, 4)}.${digits.slice(4, 6)}`;
}
