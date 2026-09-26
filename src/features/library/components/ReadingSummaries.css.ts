import { style } from '@vanilla-extract/css';
import { fontSize, mq, space, typeScale, vars } from '@/design-system/tokens';

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gap: space[12],
  margin: 0,
  padding: `${space[4]} 0 ${space[20]}`,
  listStyle: 'none',
  '@media': {
    [mq.sm]: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' },
    [mq.md]: { gap: space[16], paddingBottom: space[24] },
    [mq.lg]: { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' },
  },
});

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: space[14],
  padding: space[16],
  border: `1px solid ${vars.color.borderSubtle}`,
  borderRadius: vars.radius.xl,
});

export const top = style({
  display: 'flex',
  gap: space[14],
  minWidth: 0,
});

export const text = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[4],
  minWidth: 0,
});

export const bookTitle = style({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  ...typeScale.cardTitleSm,
  color: vars.color.text,
});

export const by = style({
  ...typeScale.caption,
  color: vars.color.textSecondary,
  overflowWrap: 'anywhere',
});

export const bought = style({
  ...typeScale.caption,
  color: vars.color.textTertiary,
});

export const notice = style({
  margin: `0 0 ${space[12]}`,
  fontSize: fontSize[13],
  color: vars.color.danger,
});

export const state = style({
  padding: `${space[8]} 0 ${space[24]}`,
});
