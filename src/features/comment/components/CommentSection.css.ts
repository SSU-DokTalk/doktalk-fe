import { globalStyle, style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  padding: '20px',
  borderTop: `8px solid ${vars.color.canvas}`,
  backgroundColor: vars.color.surface,
  // 상단 고정 내비에 제목이 가리지 않게 (#comments로 이동할 때)
  scrollMarginTop: '72px',
  '@media': {
    [mq.md]: {
      padding: '24px 28px 20px',
      border: 0,
      borderRadius: vars.radius['3xl'],
      scrollMarginTop: '96px',
    },
  },
});

export const heading = style({
  margin: 0,
  fontSize: fontSize.lg,
  fontWeight: 700,
  lineHeight: 1.5,
  color: vars.color.text,
  '@media': {
    [mq.md]: { fontSize: '1.125rem' },
  },
});

export const composer = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '8px',
  margin: 0,
});

export const composerField = style({
  flex: '1 1 0',
});

export const alert = style({
  margin: 0,
  fontSize: fontSize.sm,
  lineHeight: 1.5,
  color: vars.color.danger,
});

export const loginPrompt = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px 12px',
  margin: 0,
  padding: '12px 14px',
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.surfaceSubtle,
  fontSize: fontSize.md,
  color: vars.color.textSecondary,
});

export const status = style({
  margin: 0,
  padding: '12px 0',
  fontSize: fontSize.md,
  color: vars.color.textTertiary,
});

export const list = style({
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const item = style({
  display: 'flex',
  gap: '12px',
  padding: '14px 0 4px',
  borderTop: `1px solid ${vars.color.borderSubtle}`,
});

export const body = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  flex: '1 1 0',
  minWidth: 0,
});

export const meta = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'baseline',
  gap: '0 8px',
  lineHeight: 1.5,
});

export const author = style({
  fontSize: fontSize.md,
  fontWeight: 600,
  color: vars.color.text,
});

export const time = style({
  fontSize: fontSize.sm,
  color: vars.color.textTertiary,
});

export const content = style({
  margin: 0,
  fontSize: fontSize.base,
  lineHeight: 1.6,
  color: vars.color.textBody,
  whiteSpace: 'pre-wrap',
  overflowWrap: 'anywhere',
});

export const replyButton = style({
  alignSelf: 'flex-start',
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '32px',
  padding: '0 2px',
  border: 0,
  borderRadius: vars.radius.xs,
  background: 'transparent',
  fontFamily: vars.font.family,
  fontSize: fontSize.sm,
  fontWeight: 600,
  color: vars.color.textTertiary,
  cursor: 'pointer',
  selectors: {
    '&:hover': { color: vars.color.text },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '2px',
    },
  },
});

/** 답글과 답글 입력칸은 아바타(32) + 간격(12)만큼 들여 써요. */
export const replyForm = style({
  padding: '4px 0 10px 44px',
});

export const replies = style({
  margin: '4px 0 0',
  padding: '0 0 0 44px',
  listStyle: 'none',
});

globalStyle(`${replies} > li > ${item}`, {
  paddingTop: '10px',
});

export const more = style({
  marginTop: '4px',
});
