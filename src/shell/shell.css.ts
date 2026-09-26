import { style } from '@vanilla-extract/css';
import { mq, vars, zIndex } from '@/design-system/tokens';

export const app = style({
  minHeight: '100vh',
  backgroundColor: vars.color.canvas,
  color: vars.color.text,
  fontFamily: vars.font.family,
});

/** 키보드 사용자가 내비를 건너뛰고 본문으로 가는 링크. 포커스될 때만 보여요. */
export const skipLink = style({
  position: 'absolute',
  left: '16px',
  top: '-80px',
  zIndex: zIndex.toast,
  padding: '10px 16px',
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.brand,
  color: vars.color.textOnBrand,
  fontWeight: 700,
  textDecoration: 'none',
  selectors: {
    '&:focus': { top: '12px' },
  },
});

/** 1280px 본문 + 양옆 여백. 1440 화면에서 좌우 80px이 돼요. */
export const container = style({
  boxSizing: 'border-box',
  width: '100%',
  maxWidth: '1328px',
  margin: '0 auto',
  padding: '0 16px',
  '@media': {
    [mq.md]: { padding: '0 24px' },
  },
});

export const content = style({
  outline: 'none',
});

/** 모바일 하단 탭에 본문 끝이 가리지 않게 */
export const withBottomTabs = style({
  '@media': {
    [mq.belowMd]: {
      paddingBottom: 'calc(64px + env(safe-area-inset-bottom))',
    },
  },
});

export const desktopOnly = style({
  '@media': {
    [mq.belowMd]: { display: 'none !important' },
  },
});

export const mobileOnly = style({
  '@media': {
    [mq.md]: { display: 'none !important' },
  },
});

/**
 * 왼쪽 칼럼 + 본문 (앱 셸 F안).
 * 모바일에서는 여백을 주지 않아요. 기존 페이지가 모바일 여백을 스스로 갖고 있어서예요.
 */
export const columns = style({
  boxSizing: 'border-box',
  width: '100%',
  '@media': {
    [mq.md]: {
      maxWidth: '1328px',
      margin: '0 auto',
      padding: '16px 24px 40px',
    },
    [mq.lg]: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '24px',
      paddingTop: '24px',
      paddingBottom: '56px',
    },
  },
});

export const side = style({
  display: 'none',
  '@media': {
    [mq.lg]: {
      display: 'flex',
      position: 'sticky',
      top: '96px',
    },
  },
});

export const main = style({
  flex: '1 1 0',
  minWidth: 0,
});

/**
 * 가운데 880px 틀 (마이페이지·프로필·설정·결제 결과·404).
 * 왼쪽 칼럼에도 내 프로필 카드가 있어서, 같은 카드가 두 번 나오지 않게 이 화면들은 가운데로 모았어요.
 */
export const centered = style({
  boxSizing: 'border-box',
  width: '100%',
  maxWidth: '928px',
  margin: '0 auto',
  paddingBottom: '40px',
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',
  '@media': {
    [mq.md]: { padding: '32px 24px 56px' },
  },
});
