/**
 * 테마로 바꿀 일이 없는 값들이에요. CSS 변수로 만들지 않고 스타일 파일에서 바로 써요.
 * 화면 코드에서는 숫자를 직접 적지 않고 여기 있는 값만 써요.
 */

const px = (value: number) => `${value}px`;
const rem = (value: number) => `${value / 16}rem`;

/**
 * 간격 (padding·margin·gap). 키가 px 값이에요: `space[16]` → '16px'.
 * 2px 단위이고, 화면에서 실제로 쓰는 값만 있어요.
 */
export const space = {
  0: '0',
  2: px(2),
  4: px(4),
  6: px(6),
  8: px(8),
  10: px(10),
  12: px(12),
  14: px(14),
  16: px(16),
  18: px(18),
  20: px(20),
  22: px(22),
  24: px(24),
  28: px(28),
  32: px(32),
  36: px(36),
  40: px(40),
  44: px(44),
  48: px(48),
  56: px(56),
  64: px(64),
  72: px(72),
  80: px(80),
  96: px(96),
  120: px(120),
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
  /** 같은 카드 안에서 위로 올리는 요소 (표지 위 배지, 카드 전체를 덮는 링크) */
  raised: 1,
  sticky: 100,
  fab: 200,
  overlay: 1000,
  popover: 1100,
  toast: 1200,
} as const;

/**
 * 앱 틀 치수. 여러 파일이 함께 맞춰야 하는 값이라 한곳에 모았어요.
 * 예를 들어 하단 탭 높이를 바꾸면 본문 아래 여백, 작성 화면 버튼 줄, 챗봇 버튼 위치가 같이 따라가요.
 */
export const layout = {
  /** 본문 최대 폭. 1280px 본문 + 양옆 여백 24px */
  maxWidth: px(1280 + 2 * 24),
  /** 가운데 틀 (마이페이지·설정·결제 결과·404). 880px 본문 + 양옆 여백 24px */
  centeredMaxWidth: px(880 + 2 * 24),
  /** 가운데 틀과 작성 화면의 본문 폭 */
  centeredWidth: px(880),
  /** 왼쪽 칼럼 폭 (lg 이상) */
  sideColumnWidth: px(240),
  /** 오른쪽 칼럼 폭 (xl 이상 목록·상세) */
  railWidth: px(300),
  /** 모바일 화면 좌우 여백 */
  gutter: px(20),
  /** 데스크톱(md 이상) 화면 좌우 여백 */
  gutterDesktop: px(24),
  /** 데스크톱 상단 내비 높이 */
  topNavHeight: px(72),
  /** 모바일 상단 바 높이 */
  mobileBarHeight: px(56),
  /** 로그인한 모바일 화면의 하단 탭 높이 (기기 아래 안전 영역은 빼고) */
  bottomTabsHeight: px(64),
  /** 스크롤해도 붙어 있는 칼럼·앵커 위치. 데스크톱 상단 내비 아래 24px */
  stickyTop: px(72 + 24),
  /** 모바일 상단 바 아래 16px */
  stickyTopMobile: px(56 + 16),
} as const;

/** 글자 크기. 키가 px 값이고 값은 rem이라 브라우저 글자 크기 설정을 따라가요: `fontSize[15]` → '0.9375rem'. */
export const fontSize = {
  11: rem(11),
  12: rem(12),
  13: rem(13),
  14: rem(14),
  15: rem(15),
  16: rem(16),
  17: rem(17),
  18: rem(18),
  19: rem(19),
  20: rem(20),
  21: rem(21),
  22: rem(22),
  24: rem(24),
  26: rem(26),
  28: rem(28),
  30: rem(30),
  34: rem(34),
  40: rem(40),
  52: rem(52),
} as const;

/**
 * 입력칸 글자 크기. iOS Safari는 16px보다 작은 입력칸에 포커스하면 화면을 확대해서,
 * 브라우저 글자 크기 설정과 상관없이 px로 고정해요.
 */
export const inputFontSize = px(16);

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

/** 글자 크기는 rem이라 브라우저 글자 크기 설정을 따라가요. */
export const typeScale = {
  display: {
    fontSize: fontSize[52],
    lineHeight: 1.25,
    fontWeight: fontWeight.bold,
    letterSpacing: '-1.6px',
  },
  h1: {
    fontSize: fontSize[28],
    lineHeight: 1.4,
    fontWeight: fontWeight.bold,
    letterSpacing: '-0.8px',
  },
  h2: {
    fontSize: fontSize[22],
    lineHeight: 1.4,
    fontWeight: fontWeight.bold,
    letterSpacing: '-0.5px',
  },
  h3: {
    fontSize: fontSize[18],
    lineHeight: 1.4,
    fontWeight: fontWeight.bold,
    letterSpacing: '-0.4px',
  },
  title: {
    fontSize: fontSize[17],
    lineHeight: 1.45,
    fontWeight: fontWeight.bold,
    letterSpacing: '-0.4px',
  },
  body: {
    fontSize: fontSize[16],
    lineHeight: 1.75,
    fontWeight: fontWeight.regular,
    letterSpacing: '-0.2px',
  },
  bodyS: {
    fontSize: fontSize[15],
    lineHeight: 1.6,
    fontWeight: fontWeight.regular,
    letterSpacing: '-0.2px',
  },
  bodyXs: {
    fontSize: fontSize[14],
    lineHeight: 1.6,
    fontWeight: fontWeight.regular,
    letterSpacing: '-0.2px',
  },
  caption: {
    fontSize: fontSize[13],
    lineHeight: 1.5,
    fontWeight: fontWeight.medium,
    letterSpacing: '-0.1px',
  },
  label: {
    fontSize: fontSize[12],
    lineHeight: 1.5,
    fontWeight: fontWeight.bold,
    letterSpacing: '0',
  },
} as const;

export type TypeVariant = keyof typeof typeScale;
