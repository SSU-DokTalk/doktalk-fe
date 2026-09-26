import { globalStyle, style } from '@vanilla-extract/css';
import { fontSize, mq, vars, zIndex } from '@/design-system/tokens';

const focusVisible = {
  outline: `2px solid ${vars.color.brand}`,
  outlineOffset: '-2px',
  borderRadius: vars.radius.sm,
};

/* ---------- 데스크톱 상단 내비 ---------- */

export const topNav = style({
  position: 'sticky',
  top: 0,
  zIndex: zIndex.sticky,
  backgroundColor: vars.color.surface,
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
});

export const topNavInner = style({
  height: '72px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const logoLink = style({
  display: 'flex',
  flexShrink: 0,
  marginRight: '12px',
  borderRadius: vars.radius.sm,
  selectors: { '&:focus-visible': focusVisible },
  '@media': { [mq.lg]: { marginRight: '28px' } },
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
  gap: '2px',
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
  padding: '0 12px',
  color: vars.color.textMuted,
  fontSize: fontSize.base,
  fontWeight: 600,
  whiteSpace: 'nowrap',
  textDecoration: 'none',
  selectors: {
    '&:hover': { color: vars.color.text },
    '&[aria-current="page"]': {
      color: vars.color.brand,
      fontWeight: 700,
      boxShadow: `inset 0 -3px 0 ${vars.color.brand}`,
    },
    '&:focus-visible': focusVisible,
  },
  '@media': {
    [mq.belowLg]: { padding: '0 8px', fontSize: fontSize.md },
    [mq.xl]: { padding: '0 14px', fontSize: fontSize.lg },
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

/** lg 미만에서는 검색창 대신 검색 화면으로 가는 아이콘 */
export const searchIcon = style({
  '@media': {
    // iconButtonStyles의 display보다 앞서도록 !important를 써요 (shell.desktopOnly와 같은 방식).
    [mq.lg]: { display: 'none !important' },
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
  gap: '8px',
  flexShrink: 0,
});

/** 언어 버튼에 현재 언어 이름을 같이 보여줄 때 */
export const languageTriggerLabelled = style({
  width: 'auto',
  gap: '6px',
  padding: '0 10px',
  fontFamily: vars.font.family,
  fontSize: fontSize.md,
  fontWeight: 600,
  color: vars.color.textMuted,
});

export const profileTrigger = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  height: '44px',
  margin: 0,
  padding: '0 6px 0 4px',
  border: 0,
  borderRadius: vars.radius.pill,
  background: 'transparent',
  color: vars.color.text,
  fontFamily: vars.font.family,
  fontSize: fontSize.base,
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
  gap: '10px',
  margin: '0 0 6px',
  padding: '10px 10px 12px',
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
  fontFamily: vars.font.family,
  fontSize: fontSize.base,
  fontWeight: 700,
  color: vars.color.text,
});

/* ---------- 모바일 상단 바 ---------- */

export const mobileBar = style({
  position: 'sticky',
  top: 0,
  zIndex: zIndex.sticky,
  height: '56px',
  boxSizing: 'border-box',
  padding: '0 6px 0 16px',
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
  backgroundColor: vars.color.surface,
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
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
  padding: '4px 4px calc(4px + env(safe-area-inset-bottom))',
  backgroundColor: vars.color.surface,
  borderTop: `1px solid ${vars.color.border}`,
  fontFamily: vars.font.family,
});

export const bottomTab = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2px',
  minHeight: '56px',
  padding: '4px 2px',
  borderRadius: vars.radius.md,
  color: vars.color.textTertiary,
  fontSize: fontSize.xs,
  fontWeight: 500,
  lineHeight: 1.2,
  textAlign: 'center',
  textDecoration: 'none',
  overflowWrap: 'anywhere',
  WebkitTapHighlightColor: 'transparent',
  selectors: {
    '&[aria-current="page"]': { color: vars.color.brand, fontWeight: 700 },
    '&:focus-visible': focusVisible,
  },
});

globalStyle(`${bottomTab} > svg`, {
  width: '24px',
  height: '24px',
  flexShrink: 0,
});
