import { style } from '@vanilla-extract/css';
import { fontSize, mq, space, vars } from '@/design-system/tokens';

export const prompt = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[12],
  padding: `${space[12]} ${space[16]}`,
  backgroundColor: vars.color.surface,
  borderTop: `8px solid ${vars.color.canvas}`,
  borderBottom: `8px solid ${vars.color.canvas}`,
  '@media': {
    [mq.md]: {
      padding: `${space[14]} ${space[16]}`,
      border: 0,
      borderRadius: vars.radius['2xl'],
    },
  },
});

export const field = style({
  display: 'flex',
  alignItems: 'center',
  flex: '1 1 auto',
  minWidth: 0,
  minHeight: '48px',
  boxSizing: 'border-box',
  padding: `0 ${space[20]}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.pill,
  backgroundColor: vars.color.surfaceSubtle,
  fontFamily: vars.font.family,
  fontSize: fontSize[15],
  color: vars.color.textTertiary,
  textAlign: 'start',
  cursor: 'pointer',
  selectors: {
    '&:hover': { borderColor: vars.color.borderInput },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '2px',
    },
  },
});

export const loginText = style({
  flex: '1 1 auto',
  margin: 0,
  fontSize: fontSize[15],
  color: vars.color.textSecondary,
});
