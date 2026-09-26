import { globalStyle, style } from '@vanilla-extract/css';
import { fontSize, vars } from '@/design-system/tokens';

const focusVisible = {
  outline: `2px solid ${vars.color.brand}`,
  outlineOffset: '2px',
};

/* ---------- 왼쪽 칼럼 ---------- */

export const sideColumn = style({
  width: '240px',
  flexShrink: 0,
  flexDirection: 'column',
  gap: '16px',
  fontFamily: vars.font.family,
});

export const profileCard = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px',
  textAlign: 'center',
});

export const profileAvatar = style({
  marginBottom: '8px',
});

export const profileName = style({
  margin: 0,
  fontSize: fontSize.xl,
  fontWeight: 700,
  lineHeight: 1.45,
  letterSpacing: '-0.4px',
  overflowWrap: 'anywhere',
});

export const profileMeta = style({
  margin: 0,
  fontSize: fontSize.sm,
  lineHeight: 1.5,
  color: vars.color.textTertiary,
});

export const profileActions = style({
  alignSelf: 'stretch',
  marginTop: '12px',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '8px',
});

// 몽골어 버튼 이름("Миний номын сан")이 반 칸에 안 들어가서 줄바꿈을 허용해요.
globalStyle(`${profileActions} > a`, {
  height: 'auto',
  minHeight: '36px',
  padding: '6px 8px',
  whiteSpace: 'normal',
  lineHeight: 1.3,
});

export const activityCard = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  padding: '16px 8px 8px',
});

export const activityTitle = style({
  margin: 0,
  padding: '0 12px 6px',
  fontSize: fontSize.sm,
  fontWeight: 600,
  lineHeight: 1.5,
  color: vars.color.textTertiary,
});

export const activityLink = style({
  display: 'flex',
  alignItems: 'center',
  minHeight: '40px',
  boxSizing: 'border-box',
  padding: '8px 12px',
  borderRadius: vars.radius.md,
  color: vars.color.textMuted,
  fontSize: fontSize.md,
  fontWeight: 500,
  lineHeight: 1.45,
  textDecoration: 'none',
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.surfaceSubtle,
      color: vars.color.text,
    },
    '&:focus-visible': { ...focusVisible, outlineOffset: '-2px' },
  },
});

export const loginCard = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const loginIcon = style({
  width: '44px',
  height: '44px',
  marginBottom: '6px',
  borderRadius: '14px',
  backgroundColor: vars.color.brandSubtle,
  color: vars.color.brand,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

globalStyle(`${loginIcon} svg`, { width: '22px', height: '22px' });

export const loginTitle = style({
  margin: 0,
  fontSize: fontSize.lg,
  fontWeight: 700,
  lineHeight: 1.45,
  letterSpacing: '-0.4px',
});

export const loginDescription = style({
  margin: '0 0 8px',
  fontSize: fontSize.md,
  lineHeight: 1.6,
  color: vars.color.textTertiary,
});

/* ---------- 약관·고객지원 링크 ---------- */

export const siteLinks = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  fontFamily: vars.font.family,
  fontSize: fontSize.sm,
  lineHeight: 1.6,
  color: vars.color.textSecondary,
});

export const siteLinksColumn = style({
  padding: '4px 12px',
});

/** 왼쪽 칼럼이 없는 화면 아래 한 줄 푸터 */
export const siteLinksBar = style({
  // 기존 설정 화면의 고정 사이드바보다 위에 그려요.
  position: 'relative',
  zIndex: 1,
  backgroundColor: vars.color.canvas,
  boxSizing: 'border-box',
  width: '100%',
  maxWidth: '1328px',
  margin: '0 auto',
  padding: '20px 24px 32px',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderTop: `1px solid ${vars.color.border}`,
});

export const siteLinkList = style({
  display: 'flex',
  flexWrap: 'wrap',
  columnGap: '12px',
  rowGap: 0,
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const siteLink = style({
  // 몽골어처럼 줄이 바뀌어도 누르는 영역이 24px 이상이 되게 해요 (WCAG 2.5.8).
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '24px',
  color: vars.color.textSecondary,
  textDecoration: 'none',
  selectors: {
    '&:hover': { color: vars.color.text, textDecoration: 'underline' },
    '&:focus-visible': focusVisible,
  },
});

export const siteLinkStrong = style({
  fontWeight: 700,
});

export const siteMeta = style({
  margin: 0,
  color: vars.color.textTertiary,
});

/* ---------- 모바일 전체 메뉴(서랍) ---------- */

export const drawerBody = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '4px 16px 24px',
  fontFamily: vars.font.family,
});

export const drawerCta = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '18px',
  borderRadius: vars.radius.xl,
  backgroundColor: vars.color.surfaceSubtle,
});

export const drawerCtaActions = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '8px',
});

export const drawerProfile = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px',
  borderRadius: vars.radius.xl,
  backgroundColor: vars.color.surfaceSubtle,
  color: vars.color.text,
  fontSize: fontSize.lg,
  fontWeight: 700,
  textDecoration: 'none',
  selectors: {
    '&:focus-visible': focusVisible,
  },
});

export const drawerList = style({
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const drawerLink = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  minHeight: '52px',
  boxSizing: 'border-box',
  padding: '0 8px',
  borderRadius: vars.radius.lg,
  color: vars.color.text,
  fontSize: fontSize.lg,
  fontWeight: 600,
  textDecoration: 'none',
  selectors: {
    '&:hover': { backgroundColor: vars.color.surfaceSubtle },
    '&[aria-current="page"]': { color: vars.color.brand },
    '&:focus-visible': { ...focusVisible, outlineOffset: '-2px' },
  },
});

export const drawerLinkIcon = style({
  width: '36px',
  height: '36px',
  flexShrink: 0,
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.brandSubtle,
  color: vars.color.brand,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

globalStyle(`${drawerLinkIcon} svg`, { width: '19px', height: '19px' });

export const drawerSection = style({
  margin: 0,
  padding: '12px 0 0',
  border: 0,
  borderTop: `1px solid ${vars.color.borderSubtle}`,
  minWidth: 0,
});

export const drawerSectionTitle = style({
  margin: '0 0 2px',
  padding: 0,
  fontSize: fontSize.sm,
  fontWeight: 600,
  lineHeight: 1.5,
  color: vars.color.textSecondary,
});

export const drawerRadio = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: '44px',
  padding: '0 4px',
  fontSize: fontSize.base,
  color: vars.color.text,
  cursor: 'pointer',
});

globalStyle(`${drawerRadio} input`, {
  width: '20px',
  height: '20px',
  margin: 0,
  accentColor: vars.color.brand,
});

export const drawerLogout = style({
  alignSelf: 'flex-start',
});
