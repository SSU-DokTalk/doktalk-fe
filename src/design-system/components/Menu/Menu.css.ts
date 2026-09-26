import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../../tokens/theme.css';
import { fontSize, mq, zIndex } from '../../tokens/scale';

export const positioner = style({
  zIndex: zIndex.popover,
  outline: 'none',
});

export const popup = style({
  boxSizing: 'border-box',
  minWidth: '200px',
  padding: '8px',
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
  gap: '10px',
  boxSizing: 'border-box',
  minHeight: '44px',
  padding: '0 10px',
  borderRadius: vars.radius.md,
  color: vars.color.text,
  fontSize: fontSize.base,
  fontWeight: 500,
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
        fontWeight: 700,
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
  margin: '6px 4px',
  border: 0,
  backgroundColor: vars.color.borderSubtle,
});

export const groupLabel = style({
  padding: '8px 10px 4px',
  fontSize: fontSize.xs,
  fontWeight: 600,
  lineHeight: 1.5,
  color: vars.color.textTertiary,
});
