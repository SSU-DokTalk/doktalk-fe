import { keyframes, style } from '@vanilla-extract/css';
import { fontSize, mq, vars, zIndex } from '@/design-system/tokens';

/* ---------- 여는 버튼 ---------- */

export const fab = style({
  position: 'fixed',
  right: '16px',
  bottom: 'calc(16px + env(safe-area-inset-bottom))',
  zIndex: zIndex.fab,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '56px',
  height: '56px',
  padding: 0,
  border: 0,
  borderRadius: vars.radius.pill,
  backgroundColor: vars.color.brand,
  color: vars.color.textOnBrand,
  boxShadow: vars.shadow.fab,
  cursor: 'pointer',
  transition: 'background-color 120ms ease, transform 160ms ease',
  selectors: {
    '&:hover': { backgroundColor: vars.color.brandHover },
    '&:active': { transform: 'scale(0.96)' },
    '&:focus-visible': {
      outline: `3px solid ${vars.color.brand}`,
      outlineOffset: '3px',
    },
  },
  '@media': {
    [mq.md]: { right: '32px', bottom: '32px', width: '60px', height: '60px' },
    [mq.reducedMotion]: { transition: 'none' },
  },
});

/** 로그인하면 모바일 하단 탭(64px) 위로 올려요. */
export const fabAboveTabs = style({
  '@media': {
    [mq.belowMd]: { bottom: 'calc(80px + env(safe-area-inset-bottom))' },
  },
});

export const fabIcon = style({
  width: '26px',
  height: '26px',
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
  gap: '12px',
  flexShrink: 0,
  minHeight: '68px',
  padding: '0 8px 0 16px',
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
  backgroundColor: 'rgba(255, 255, 255, 0.16)',
});

export const headerText = style({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 0',
  minWidth: 0,
});

export const title = style({
  margin: 0,
  fontSize: fontSize.lg,
  fontWeight: 700,
  lineHeight: 1.4,
});

export const subtitle = style({
  fontSize: fontSize.sm,
  lineHeight: 1.4,
  // 남색 위 옅은 글자 (대비 7:1 이상)
  color: 'rgba(255, 255, 255, 0.84)',
});

export const close = style({
  color: vars.color.textOnBrand,
  selectors: {
    // 기본 ghost 버튼의 hover(밝은 회색)보다 우선하도록 같은 선택자를 써요.
    '&:hover:not(:disabled):not([aria-disabled="true"])': {
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
    },
    '&:active:not(:disabled):not([aria-disabled="true"])': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.textOnBrand}`,
      outlineOffset: '-4px',
    },
  },
});

export const log = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  flex: '1 1 auto',
  minHeight: 0,
  overflowY: 'auto',
  overscrollBehavior: 'contain',
  padding: '20px 16px',
  backgroundColor: vars.color.canvas,
});

const bubbleBase = style({
  maxWidth: 'min(300px, 85%)',
  padding: '11px 14px',
  fontSize: fontSize.base,
  lineHeight: 1.6,
  whiteSpace: 'pre-wrap',
  overflowWrap: 'anywhere',
  boxShadow: vars.shadow.sm,
});

export const botBubble = style([
  bubbleBase,
  {
    alignSelf: 'flex-start',
    borderRadius: '16px 16px 16px 4px',
    backgroundColor: vars.color.surface,
    color: vars.color.text,
  },
]);

export const myBubble = style([
  bubbleBase,
  {
    alignSelf: 'flex-end',
    borderRadius: '16px 16px 4px 16px',
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
    gap: '8px',
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
    gap: '4px',
    padding: '14px 16px',
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
  gap: '12px',
});

export const errorText = style({
  margin: 0,
});

export const suggestions = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '8px',
  marginTop: '4px',
});

export const suggestionsLabel = style({
  margin: 0,
  fontSize: fontSize.sm,
  fontWeight: 600,
  color: vars.color.textSecondary,
});

export const suggestion = style({
  maxWidth: '100%',
  minHeight: '40px',
  padding: '8px 16px',
  border: `1px solid ${vars.color.brandBorder}`,
  borderRadius: '22px',
  backgroundColor: vars.color.surface,
  color: vars.color.brand,
  fontFamily: vars.font.family,
  fontSize: fontSize.md,
  fontWeight: 600,
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
  gap: '8px',
  flexShrink: 0,
  margin: 0,
  padding: '12px 12px 16px',
  borderTop: `1px solid ${vars.color.borderSubtle}`,
  backgroundColor: vars.color.surface,
  '@media': {
    [mq.md]: { paddingBottom: '10px' },
  },
});

export const inputRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const inputField = style({
  flex: '1 1 auto',
  minWidth: 0,
});

/** 둥근 회색 입력칸 */
export const input = style({
  borderRadius: vars.radius.pill,
  paddingLeft: '18px',
});

export const send = style({
  width: '48px',
  height: '48px',
  borderRadius: vars.radius.pill,
});

export const disclaimer = style({
  margin: 0,
  padding: '0 6px',
  fontSize: fontSize.xs,
  color: vars.color.textTertiary,
});
