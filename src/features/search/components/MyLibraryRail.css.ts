import { style } from '@vanilla-extract/css';
import { fontSize, vars } from '@/design-system/tokens';

export const rail = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  padding: '20px',
  borderRadius: vars.radius['2xl'],
  backgroundColor: vars.color.surface,
});

export const head = style({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: '8px',
});

export const heading = style({
  margin: 0,
  fontSize: fontSize.xl,
  fontWeight: 700,
  lineHeight: 1.5,
  color: vars.color.brand,
});

export const count = style({
  fontSize: fontSize.sm,
  color: vars.color.textTertiary,
});

export const covers = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  gap: '8px',
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const empty = style({
  margin: 0,
  fontSize: fontSize.md,
  color: vars.color.textTertiary,
});
