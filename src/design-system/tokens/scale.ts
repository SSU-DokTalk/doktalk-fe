/**
 * 테마로 바꿀 일이 없는 값들이에요. CSS 변수로 만들지 않고 스타일 파일에서 바로 써요.
 */

/** 4의 배수 간격 */
export const space = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  14: '56px',
} as const;

/** 화면 폭 기준점 (Tailwind 기본값과 같은 값) */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export const mq = {
  sm: `screen and (min-width: ${breakpoints.sm}px)`,
  md: `screen and (min-width: ${breakpoints.md}px)`,
  lg: `screen and (min-width: ${breakpoints.lg}px)`,
  xl: `screen and (min-width: ${breakpoints.xl}px)`,
  /** md 미만 (모바일) */
  belowMd: `screen and (max-width: ${breakpoints.md - 0.02}px)`,
  /** lg 미만 (모바일·태블릿) */
  belowLg: `screen and (max-width: ${breakpoints.lg - 0.02}px)`,
  /** xl 미만 */
  belowXl: `screen and (max-width: ${breakpoints.xl - 0.02}px)`,
  reducedMotion: '(prefers-reduced-motion: reduce)',
} as const;

export const zIndex = {
  sticky: 100,
  fab: 200,
  overlay: 1000,
  popover: 1100,
  toast: 1200,
} as const;

const rem = (px: number) => `${px / 16}rem`;

/** 글자 크기는 rem이라 브라우저 글자 크기 설정을 따라가요. */
export const typeScale = {
  display: {
    fontSize: rem(52),
    lineHeight: 1.25,
    fontWeight: 700,
    letterSpacing: '-1.6px',
  },
  h1: {
    fontSize: rem(28),
    lineHeight: 1.4,
    fontWeight: 700,
    letterSpacing: '-0.8px',
  },
  h2: {
    fontSize: rem(22),
    lineHeight: 1.4,
    fontWeight: 700,
    letterSpacing: '-0.5px',
  },
  h3: {
    fontSize: rem(18),
    lineHeight: 1.4,
    fontWeight: 700,
    letterSpacing: '-0.4px',
  },
  title: {
    fontSize: rem(17),
    lineHeight: 1.45,
    fontWeight: 700,
    letterSpacing: '-0.4px',
  },
  body: {
    fontSize: rem(16),
    lineHeight: 1.75,
    fontWeight: 400,
    letterSpacing: '-0.2px',
  },
  bodyS: {
    fontSize: rem(15),
    lineHeight: 1.6,
    fontWeight: 400,
    letterSpacing: '-0.2px',
  },
  bodyXs: {
    fontSize: rem(14),
    lineHeight: 1.6,
    fontWeight: 400,
    letterSpacing: '-0.2px',
  },
  caption: {
    fontSize: rem(13),
    lineHeight: 1.5,
    fontWeight: 500,
    letterSpacing: '-0.1px',
  },
  label: {
    fontSize: rem(12),
    lineHeight: 1.5,
    fontWeight: 700,
    letterSpacing: '0',
  },
} as const;

export type TypeVariant = keyof typeof typeScale;

export const fontSize = {
  xs: rem(12),
  sm: rem(13),
  md: rem(14),
  base: rem(15),
  lg: rem(16),
  xl: rem(17),
} as const;
