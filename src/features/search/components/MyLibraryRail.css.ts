import { style } from '@vanilla-extract/css';
import { fontSize, space, typeScale, vars } from '@/design-system/tokens';

export const rail = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[14],
  padding: space[20],
  borderRadius: vars.radius['2xl'],
  backgroundColor: vars.color.surface,
});

export const head = style({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: space[8],
});

export const heading = style({
  margin: 0,
  ...typeScale.sectionTitle,
  color: vars.color.brand,
});

export const count = style({
  fontSize: fontSize[13],
  color: vars.color.textTertiary,
});

export const covers = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  gap: space[8],
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const empty = style({
  margin: 0,
  fontSize: fontSize[14],
  color: vars.color.textTertiary,
});
