import { style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

export const list = style({
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

/**
 * 다가오는 모임 한 줄.
 * 모바일: [날짜 | 내용] 아래에 링크 버튼 / 데스크톱: [날짜 | 내용 | 버튼]
 */
export const upcoming = style({
  display: 'grid',
  gridTemplateColumns: '60px minmax(0, 1fr)',
  gridTemplateAreas: '"date body" "action action"',
  alignItems: 'start',
  columnGap: '14px',
  rowGap: '12px',
  padding: '14px 0 16px',
  borderTop: `1px solid ${vars.color.borderSubtle}`,
  '@media': {
    [mq.md]: {
      gridTemplateColumns: '72px minmax(0, 1fr) auto',
      gridTemplateAreas: '"date body action"',
      alignItems: 'center',
      columnGap: '18px',
      padding: '16px 0',
    },
  },
});

export const dateBlock = style({
  gridArea: 'date',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '66px',
  borderRadius: '12px',
  backgroundColor: vars.color.brandSubtle,
  color: vars.color.brand,
  textAlign: 'center',
  '@media': {
    [mq.md]: { height: '76px', gap: '2px', borderRadius: '14px' },
  },
});

export const dateSmall = style({
  fontSize: '0.6875rem',
  fontWeight: 600,
  lineHeight: 1.4,
  whiteSpace: 'nowrap',
  '@media': {
    [mq.md]: { fontSize: fontSize.xs },
  },
});

export const dateDay = style({
  fontSize: '1.3125rem',
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: '-0.5px',
  '@media': {
    [mq.md]: { fontSize: '1.5rem' },
  },
});

export const body = style({
  gridArea: 'body',
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
  minWidth: 0,
  color: vars.color.text,
  textDecoration: 'none',
  borderRadius: vars.radius.sm,
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '4px',
    },
  },
  '@media': {
    [mq.md]: { gap: '4px' },
  },
});

export const badges = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const dday = style({
  fontSize: fontSize.sm,
  fontWeight: 600,
  color: vars.color.info,
});

export const title = style({
  fontSize: fontSize.lg,
  fontWeight: 700,
  lineHeight: 1.4,
  letterSpacing: '-0.4px',
  selectors: {
    [`${body}:hover &`]: { color: vars.color.brand },
  },
  '@media': {
    [mq.md]: { fontSize: fontSize.xl },
  },
});

export const meta = style({
  fontSize: fontSize.sm,
  lineHeight: 1.5,
  color: vars.color.textTertiary,
  '@media': {
    [mq.md]: { fontSize: fontSize.md },
  },
});

export const action = style({
  gridArea: 'action',
  '@media': {
    [mq.belowMd]: { width: '100%' },
  },
});

/** 지난 모임 한 줄 (표지 · 제목 · 역할) */
export const past = style({
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  padding: '12px 0',
  borderTop: `1px solid ${vars.color.borderSubtle}`,
  color: vars.color.text,
  textDecoration: 'none',
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '-2px',
      borderRadius: vars.radius.sm,
    },
  },
  '@media': {
    [mq.md]: { gap: '16px', padding: '14px 0' },
  },
});

export const pastText = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  flex: '1 1 0',
  minWidth: 0,
});

export const pastTitle = style({
  fontSize: fontSize.base,
  fontWeight: 600,
  lineHeight: 1.45,
  letterSpacing: '-0.3px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  selectors: {
    [`${past}:hover &`]: { color: vars.color.brand },
  },
  '@media': {
    [mq.md]: { fontSize: fontSize.lg, whiteSpace: 'normal' },
  },
});

export const chevron = style({
  flexShrink: 0,
  width: '20px',
  height: '20px',
  color: vars.color.textDisabled,
});

export const empty = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '4px',
  padding: '14px 0 16px',
  borderTop: `1px solid ${vars.color.borderSubtle}`,
});

export const emptyTitle = style({
  margin: 0,
  fontSize: fontSize.base,
  fontWeight: 600,
  color: vars.color.textSecondary,
});

export const emptyDescription = style({
  margin: 0,
  fontSize: fontSize.md,
  color: vars.color.textTertiary,
});

export const emptyLink = style({
  marginTop: '8px',
});

export const notice = style({
  margin: 0,
  padding: '10px 0 14px',
  fontSize: fontSize.sm,
  color: vars.color.danger,
});
