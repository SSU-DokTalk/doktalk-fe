/**
 * 그림에만 쓰는 고정 색이에요. 화면(UI) 색은 theme.css.ts의 `vars.color`를 써요.
 */

/**
 * 표지 이미지가 없을 때 쓰는 표지 색. 제목으로 골라서 같은 책은 늘 같은 색이에요.
 * 목업의 남색·금색·크림과 짙은 분류 색(초록·보라·갈색)에서 골랐어요.
 * 모든 조합이 글자 대비 4.5:1 이상이에요.
 */
export const coverTones = [
  { bg: '#C8A84B', ink: '#0D1B3E' },
  { bg: '#0D1B3E', ink: '#E8C96A' },
  { bg: '#F2EDE3', ink: '#1A1A2E' },
  { bg: '#1E2E18', ink: '#F2EDE3' },
  { bg: '#FFF8E1', ink: '#2E1E10' },
  { bg: '#2A1A3A', ink: '#F3E5F5' },
  { bg: '#E8EAF6', ink: '#162B4A' },
  { bg: '#2E1E10', ink: '#F6EED6' },
] as const;
