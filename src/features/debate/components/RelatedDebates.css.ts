import { style } from '@vanilla-extract/css';
import { fontSize, vars } from '@/design-system/tokens';

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  padding: '20px',
  borderRadius: vars.radius['2xl'],
  backgroundColor: vars.color.surface,
});

export const heading = style({
  margin: '0 0 4px',
  fontSize: fontSize.xl,
  fontWeight: 700,
  lineHeight: 1.5,
  color: vars.color.brand,
});

export const list = style({
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const item = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 0',
  borderTop: `1px solid ${vars.color.borderSubtle}`,
});

export const body = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  flex: '1 1 0',
  minWidth: 0,
});

export const link = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: fontSize.md,
  fontWeight: 700,
  lineHeight: 1.45,
  color: vars.color.text,
  textDecoration: 'none',
  outline: 'none',
  selectors: {
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      zIndex: 1,
    },
    '&:hover': { color: vars.color.brand },
    '&:focus-visible::after': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '2px',
      borderRadius: vars.radius.sm,
    },
  },
});

export const meta = style({
  fontSize: fontSize.sm,
  lineHeight: 1.5,
  color: vars.color.textTertiary,
});
