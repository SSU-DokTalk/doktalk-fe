import { keyframes, style } from '@vanilla-extract/css';
import {
  fontSize,
  fontWeight,
  layout,
  mq,
  space,
  typeScale,
  vars,
  zIndex,
} from '@/design-system/tokens';

/* ---------- 여는 버튼 ---------- */

/** 버튼 모양은 IconButton(fab)이 정하고, 여기서는 화면 오른쪽 아래 자리만 정해요. */
export const fab = style({
  position: 'fixed',
  right: layout.fabInset,
  bottom: `calc(${layout.fabInset} + env(safe-area-inset-bottom))`,
  zIndex: zIndex.fab,
  '@media': {
    [mq.md]: { right: layout.fabInsetDesktop, bottom: layout.fabInsetDesktop },
  },
});

/** 로그인하면 모바일 하단 탭 위로 올려요. */
export const fabAboveTabs = style({
  '@media': {
    [mq.belowMd]: {
      bottom: `calc(${layout.bottomTabsHeight} + ${layout.fabInset} + env(safe-area-inset-bottom))`,
    },
  },
});

/* ---------- 창 ---------- */

/** 모바일 아래 시트 높이. 데스크톱은 Dialog의 corner 자리가 정해요. */
export const sheet = style({
  height: 'min(600px, 90dvh)',
  overflow: 'hidden',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[12],
  flexShrink: 0,
  minHeight: '68px',
  padding: `0 ${space[8]} 0 ${space[16]}`,
  backgroundColor: vars.color.brand,
  color: vars.color.textOnBrand,
  '@media': {
    [mq.md]: { minHeight: '72px' },
  },
});

export const headerIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '40px',
  height: '40px',
  borderRadius: vars.radius.pill,
  backgroundColor: vars.color.onBrandSubtle,
});

export const headerText = style({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 0',
  minWidth: 0,
});

export const title = style({
  margin: 0,
  fontSize: fontSize[16],
  fontWeight: fontWeight.bold,
  lineHeight: 1.4,
});

export const subtitle = style({
  fontSize: fontSize[13],
  lineHeight: 1.4,
  color: vars.color.textOnBrandMuted,
});

export const log = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[12],
  flex: '1 1 auto',
  minHeight: 0,
  overflowY: 'auto',
  overscrollBehavior: 'contain',
  padding: `${space[20]} ${space[16]}`,
  backgroundColor: vars.color.canvas,
});

const bubbleBase = style({
  maxWidth: 'min(300px, 85%)',
  // 위아래는 토큰 사이 값(11px)으로 줄 간격과 맞춰요.
  padding: `11px ${space[14]}`,
  ...typeScale.body,
  whiteSpace: 'pre-wrap',
  overflowWrap: 'anywhere',
  boxShadow: vars.shadow.sm,
});

export const botBubble = style([
  bubbleBase,
  {
    alignSelf: 'flex-start',
    // 말꼬리 쪽 모서리만 작게
    borderRadius: `${vars.radius.xl} ${vars.radius.xl} ${vars.radius.xl} 4px`,
    backgroundColor: vars.color.surface,
    color: vars.color.text,
  },
]);

export const myBubble = style([
  bubbleBase,
  {
    alignSelf: 'flex-end',
    borderRadius: `${vars.radius.xl} ${vars.radius.xl} 4px ${vars.radius.xl}`,
    backgroundColor: vars.color.brand,
    color: vars.color.textOnBrand,
  },
]);

export const errorBubble = style([
  botBubble,
  {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: space[8],
    color: vars.color.danger,
  },
]);

const blink = keyframes({
  '0%, 80%, 100%': { opacity: 0.25 },
  '40%': { opacity: 1 },
});

export const typing = style([
  botBubble,
  {
    display: 'flex',
    alignItems: 'center',
    gap: space[4],
    padding: `${space[14]} ${space[16]}`,
  },
]);

export const dot = style({
  width: '6px',
  height: '6px',
  borderRadius: vars.radius.pill,
  backgroundColor: vars.color.textTertiary,
  animation: `${blink} 1.2s ease-in-out infinite`,
  selectors: {
    '&:nth-child(2)': { animationDelay: '0.15s' },
    '&:nth-child(3)': { animationDelay: '0.3s' },
  },
  '@media': {
    [mq.reducedMotion]: { animation: 'none', opacity: 0.6 },
  },
});

/** 질문 하나와 그 답 */
export const exchange = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[12],
});

export const errorText = style({
  margin: 0,
});

export const suggestions = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: space[8],
  marginTop: space[4],
});

export const suggestionsLabel = style({
  margin: 0,
  fontSize: fontSize[13],
  fontWeight: fontWeight.semibold,
  color: vars.color.textSecondary,
});

export const suggestion = style({
  maxWidth: '100%',
  minHeight: '40px',
  padding: `${space[8]} ${space[16]}`,
  border: `1px solid ${vars.color.brandBorder}`,
  // 한 줄일 때는 알약 모양, 두 줄로 늘어나도 모서리가 너무 둥글지 않은 값
  borderRadius: '22px',
  backgroundColor: vars.color.surface,
  color: vars.color.brand,
  fontFamily: vars.font.family,
  fontSize: fontSize[14],
  fontWeight: fontWeight.semibold,
  lineHeight: 1.4,
  textAlign: 'left',
  cursor: 'pointer',
  selectors: {
    '&:hover': { backgroundColor: vars.color.brandSubtle },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '2px',
    },
  },
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[8],
  flexShrink: 0,
  margin: 0,
  padding: `${space[12]} ${space[12]} ${space[16]}`,
  borderTop: `1px solid ${vars.color.borderSubtle}`,
  backgroundColor: vars.color.surface,
  '@media': {
    [mq.md]: { paddingBottom: space[10] },
  },
});

export const inputRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[8],
});

export const inputField = style({
  flex: '1 1 auto',
  minWidth: 0,
});

export const disclaimer = style({
  margin: 0,
  padding: `0 ${space[6]}`,
  fontSize: fontSize[12],
  color: vars.color.textTertiary,
});
