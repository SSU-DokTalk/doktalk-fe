/**
 * 그림에만 쓰는 고정 색이에요. 화면(UI) 색은 theme.css.ts의 `vars.color`를 써요.
 */

/**
 * 표지 이미지가 없을 때 쓰는 표지 색. 제목으로 골라서 같은 책은 늘 같은 색이에요.
 * 모든 조합이 글자 대비 4.5:1 이상이에요.
 */
export const coverTones = [
  { bg: '#F2C94C', ink: '#111827' },
  { bg: '#1B1F4B', ink: '#E0E7FF' },
  { bg: '#F1ECE3', ink: '#1F2937' },
  { bg: '#A34A24', ink: '#FFF7ED' },
  { bg: '#0F766E', ink: '#ECFDF5' },
  { bg: '#E8F2F7', ink: '#1F2937' },
  { bg: '#1F2937', ink: '#F9FAFB' },
  { bg: '#FDE2E4', ink: '#7F1D1D' },
] as const;
