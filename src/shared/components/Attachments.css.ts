import { globalStyle, style } from '@vanilla-extract/css';
import { fontSize, vars } from '@/design-system/tokens';

export const files = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  margin: '6px 0 0',
  padding: 0,
  listStyle: 'none',
});

export const fileButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  width: '100%',
  maxWidth: '480px',
  minHeight: '52px',
  boxSizing: 'border-box',
  padding: '0 14px',
  border: 0,
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.surfaceSubtle,
  fontFamily: vars.font.family,
  fontSize: fontSize.md,
  fontWeight: 600,
  color: vars.color.text,
  textAlign: 'start',
  cursor: 'pointer',
  selectors: {
    '&:hover': { backgroundColor: vars.color.border },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '2px',
    },
    '&:disabled': { cursor: 'progress', opacity: 0.7 },
  },
});

globalStyle(`${fileButton} svg`, {
  width: '20px',
  height: '20px',
  flexShrink: 0,
  color: vars.color.infoIcon,
});

export const fileName = style({
  flex: '1 1 auto',
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
