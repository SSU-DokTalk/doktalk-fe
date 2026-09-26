import { style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gap: '12px',
  margin: 0,
  padding: '4px 0 20px',
  listStyle: 'none',
  '@media': {
    [mq.sm]: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' },
    [mq.md]: { gap: '16px', paddingBottom: '24px' },
    [mq.lg]: { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' },
  },
});

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '14px',
  padding: '16px',
  border: `1px solid ${vars.color.borderSubtle}`,
  borderRadius: vars.radius.xl,
});

export const top = style({
  display: 'flex',
  gap: '14px',
  minWidth: 0,
});

export const text = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  minWidth: 0,
});

export const bookTitle = style({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  fontSize: fontSize.lg,
  fontWeight: 700,
  lineHeight: 1.4,
  letterSpacing: '-0.4px',
  color: vars.color.text,
});

export const by = style({
  fontSize: fontSize.sm,
  lineHeight: 1.5,
  color: vars.color.textSecondary,
  overflowWrap: 'anywhere',
});

export const bought = style({
  fontSize: fontSize.sm,
  lineHeight: 1.5,
  color: vars.color.textTertiary,
});

export const notice = style({
  margin: '0 0 12px',
  fontSize: fontSize.sm,
  color: vars.color.danger,
});

export const state = style({
  padding: '8px 0 24px',
});
