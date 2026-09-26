import { globalStyle, style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const thumbs = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  margin: 0,
  padding: '6px 0 0',
  listStyle: 'none',
});

const tileSize = { mobile: '80px', desktop: '96px' };

export const thumb = style({
  position: 'relative',
  width: tileSize.mobile,
  height: tileSize.mobile,
  flexShrink: 0,
  '@media': {
    [mq.md]: { width: tileSize.desktop, height: tileSize.desktop },
  },
});

export const image = style({
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.surfaceSubtle,
});

export const remove = style({
  position: 'absolute',
  top: '-8px',
  right: '-8px',
});

export const add = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  width: tileSize.mobile,
  height: tileSize.mobile,
  boxSizing: 'border-box',
  border: `1px dashed ${vars.color.borderInput}`,
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.surface,
  fontFamily: vars.font.family,
  fontSize: fontSize.sm,
  fontWeight: 600,
  color: vars.color.brand,
  cursor: 'pointer',
  selectors: {
    '&:hover': { backgroundColor: vars.color.brandSubtle },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '2px',
    },
  },
  '@media': {
    [mq.md]: { width: tileSize.desktop, height: tileSize.desktop },
  },
});

globalStyle(`${add} svg`, { width: '22px', height: '22px' });

export const count = style({
  fontWeight: 500,
  color: vars.color.textSecondary,
});

export const hint = style({
  margin: 0,
  fontSize: fontSize.sm,
  lineHeight: 1.5,
  color: vars.color.textSecondary,
});

export const error = style({
  margin: 0,
  fontSize: fontSize.sm,
  lineHeight: 1.5,
  color: vars.color.danger,
});

export const input = style({ display: 'none' });
