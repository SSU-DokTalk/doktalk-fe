import { globalStyle, style } from '@vanilla-extract/css';
import {
  fontSize,
  fontWeight,
  layout,
  mq,
  space,
  vars,
  zIndex,
} from '@/design-system/tokens';

const focusVisible = {
  outline: `2px solid ${vars.color.brand}`,
  outlineOffset: '-2px',
  borderRadius: vars.radius.sm,
};

/* ---------- 데스크톱 상단 내비 ---------- */

/** 데스크톱(md 이상)에만 보여요. */
export const topNav = style({
  position: 'sticky',
  top: 0,
  zIndex: zIndex.sticky,
  backgroundColor: vars.color.surface,
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
  '@media': {
    [mq.belowMd]: { display: 'none' },
  },
});

export const topNavInner = style({
  height: layout.topNavHeight,
  display: 'flex',
  alignItems: 'center',
  gap: space[8],
});

export const logoLink = style({
  display: 'flex',
  flexShrink: 0,
  marginRight: space[12],
  borderRadius: vars.radius.sm,
  selectors: { '&:focus-visible': focusVisible },
  '@media': { [mq.lg]: { marginRight: space[28] } },
});

export const logo = style({
  display: 'block',
  width: 'auto',
  height: '42px',
});

export const navList = style({
  display: 'flex',
  alignItems: 'stretch',
  alignSelf: 'stretch',
  gap: space[2],
  minWidth: 0,
  flexShrink: 1,
  // 몽골어처럼 긴 메뉴 이름이 좁은 화면에서 넘치면 옆으로 넘겨 봐요.
  overflowX: 'auto',
  scrollbarWidth: 'none',
  selectors: { '&::-webkit-scrollbar': { display: 'none' } },
});

export const navLink = style({
  display: 'flex',
  alignItems: 'center',
  padding: `0 ${space[12]}`,
  color: vars.color.textMuted,
  fontSize: fontSize[15],
  fontWeight: fontWeight.semibold,
  whiteSpace: 'nowrap',
  textDecoration: 'none',
  selectors: {
    '&:hover': { color: vars.color.text },
    '&[aria-current="page"]': {
      color: vars.color.brand,
      fontWeight: fontWeight.bold,
      boxShadow: `inset 0 -3px 0 ${vars.color.brand}`,
    },
    '&:focus-visible': focusVisible,
  },
  '@media': {
    [mq.belowLg]: { padding: `0 ${space[8]}`, fontSize: fontSize[14] },
    [mq.xl]: { padding: `0 ${space[14]}`, fontSize: fontSize[16] },
  },
});

export const spacer = style({
  flex: '1 1 0',
  minWidth: '8px',
});

export const search = style({
  width: 'clamp(160px, 18vw, 320px)',
  margin: 0,
  '@media': {
    [mq.belowLg]: { display: 'none' },
  },
});

/** 만들기 버튼 글자. lg 미만에서는 아이콘만 보이고 스크린 리더는 계속 읽어요. */
export const createLabel = style({
  '@media': {
    [mq.belowLg]: {
      position: 'absolute',
      width: '1px',
      height: '1px',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
    },
  },
});

export const actions = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[8],
  flexShrink: 0,
});

export const profileTrigger = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[8],
  height: '44px',
  margin: 0,
  padding: `0 ${space[6]} 0 ${space[4]}`,
  border: 0,
  borderRadius: vars.radius.pill,
  background: 'transparent',
  color: vars.color.text,
  fontFamily: vars.font.family,
  fontSize: fontSize[15],
  cursor: 'pointer',
  selectors: {
    '&:hover': { backgroundColor: vars.color.surfaceSubtle },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '2px',
    },
  },
});

globalStyle(`${profileTrigger} > svg`, {
  width: '16px',
  height: '16px',
  color: vars.color.textTertiary,
});

/** xl 미만에서는 이름을 숨기되 스크린 리더는 계속 읽어요. */
export const profileName = style({
  whiteSpace: 'nowrap',
  '@media': {
    [mq.belowXl]: {
      position: 'absolute',
      width: '1px',
      height: '1px',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
    },
  },
});

export const menuHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[10],
  margin: `0 0 ${space[6]}`,
  padding: `${space[10]} ${space[10]} ${space[12]}`,
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
  fontFamily: vars.font.family,
  fontSize: fontSize[15],
  fontWeight: fontWeight.bold,
  color: vars.color.text,
});

/* ---------- 모바일 상단 바 ---------- */

/** 모바일(md 미만)에만 보여요. */
export const mobileBar = style({
  position: 'sticky',
  top: 0,
  zIndex: zIndex.sticky,
  height: layout.mobileBarHeight,
  boxSizing: 'border-box',
  padding: `0 ${space[6]} 0 ${space[16]}`,
  display: 'flex',
  alignItems: 'center',
  gap: space[2],
  backgroundColor: vars.color.surface,
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
  '@media': {
    [mq.md]: { display: 'none' },
  },
});

export const mobileLogo = style({
  display: 'block',
  width: 'auto',
  height: '34px',
});

/* ---------- 모바일 하단 탭 ---------- */

export const bottomTabs = style({
  position: 'fixed',
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: zIndex.sticky,
  boxSizing: 'border-box',
  display: 'grid',
  gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
  padding: `${space[4]} ${space[4]} calc(${space[4]} + env(safe-area-inset-bottom))`,
  backgroundColor: vars.color.surface,
  borderTop: `1px solid ${vars.color.border}`,
  fontFamily: vars.font.family,
  '@media': {
    [mq.md]: { display: 'none' },
  },
});

export const bottomTab = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: space[2],
  // 탭 줄 높이에서 위아래 여백을 뺀 만큼
  minHeight: `calc(${layout.bottomTabsHeight} - 2 * ${space[4]})`,
  padding: `${space[4]} 0`,
  borderRadius: vars.radius.md,
  color: vars.color.textTertiary,
  // 칸 너비가 화면의 1/5이라 글자도 화면 폭에 맞춰 11.2~12px 사이에서 정해져요.
  // 360px 폰까지 몽골어 탭 이름('Хэлэлцүүлэг')이 단어 중간에서 끊기지 않아요.
  fontSize: `clamp(0.7rem, 2.9vw, ${fontSize[12]})`,
  fontWeight: fontWeight.medium,
  lineHeight: 1.2,
  textAlign: 'center',
  textDecoration: 'none',
  overflowWrap: 'anywhere',
  WebkitTapHighlightColor: 'transparent',
  selectors: {
    '&[aria-current="page"]': {
      color: vars.color.brand,
      fontWeight: fontWeight.bold,
    },
    '&:focus-visible': focusVisible,
  },
});

globalStyle(`${bottomTab} > svg`, {
  width: '24px',
  height: '24px',
  flexShrink: 0,
});
