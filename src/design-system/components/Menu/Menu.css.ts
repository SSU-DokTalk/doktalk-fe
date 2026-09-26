import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../../tokens/theme.css';
import { fontSize, fontWeight, mq, space, zIndex } from '../../tokens/scale';

export const positioner = style({
  zIndex: zIndex.popover,
  outline: 'none',
});

export const popup = style({
  boxSizing: 'border-box',
  minWidth: '200px',
  padding: space[8],
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.xl,
  backgroundColor: vars.color.surface,
  boxShadow: vars.shadow.popover,
  fontFamily: vars.font.family,
  outline: 'none',
  transformOrigin: 'var(--transform-origin)',
  transition: 'opacity 120ms ease, transform 120ms ease',
  selectors: {
    '&[data-starting-style], &[data-ending-style]': {
      opacity: 0,
      transform: 'scale(0.98) translateY(-4px)',
    },
  },
  '@media': {
    [mq.reducedMotion]: { transition: 'none' },
  },
});

export const item = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[10],
  boxSizing: 'border-box',
  minHeight: '44px',
  padding: `0 ${space[10]}`,
  borderRadius: vars.radius.md,
  color: vars.color.text,
  fontSize: fontSize[15],
  fontWeight: fontWeight.medium,
  lineHeight: 1.4,
  textDecoration: 'none',
  cursor: 'pointer',
  userSelect: 'none',
  outline: 'none',
  selectors: {
    '&[data-highlighted]': { backgroundColor: vars.color.surfaceSubtle },
    '&[data-disabled]': {
      color: vars.color.textDisabled,
      cursor: 'not-allowed',
    },
  },
});

globalStyle(`${item} > svg`, {
  width: '18px',
  height: '18px',
  flexShrink: 0,
  color: vars.color.textSecondary,
});

export const radioItem = style([
  item,
  {
    justifyContent: 'space-between',
    selectors: {
      '&[data-checked]': {
        backgroundColor: vars.color.brandSubtle,
        color: vars.color.brand,
        fontWeight: fontWeight.bold,
      },
    },
  },
]);

export const indicator = style({
  display: 'flex',
  color: vars.color.brand,
});

globalStyle(`${indicator} svg`, { width: '18px', height: '18px' });

export const separator = style({
  height: '1px',
  margin: `${space[6]} ${space[4]}`,
  border: 0,
  backgroundColor: vars.color.borderSubtle,
});

export const groupLabel = style({
  padding: `${space[8]} ${space[10]} ${space[4]}`,
  fontSize: fontSize[12],
  fontWeight: fontWeight.semibold,
  lineHeight: 1.5,
  color: vars.color.textTertiary,
});
