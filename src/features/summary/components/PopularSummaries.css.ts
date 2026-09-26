import { globalStyle, style } from '@vanilla-extract/css';
import {
  fontSize,
  fontWeight,
  space,
  vars,
  zIndex,
} from '@/design-system/tokens';

export const rail = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[4],
  padding: space[20],
  borderRadius: vars.radius['2xl'],
  backgroundColor: vars.color.surface,
});

export const head = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: space[8],
  marginBottom: space[4],
});

export const heading = style({
  margin: 0,
  fontSize: fontSize[17],
  fontWeight: fontWeight.bold,
  lineHeight: 1.5,
  color: vars.color.brand,
});

export const more = style({
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '32px',
  padding: `0 ${space[4]}`,
  borderRadius: vars.radius.xs,
  fontSize: fontSize[13],
  fontWeight: fontWeight.semibold,
  color: vars.color.text,
  textDecoration: 'none',
  selectors: {
    '&:hover': { color: vars.color.brand },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '2px',
    },
  },
});

export const list = style({
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const item = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: space[4],
  padding: `${space[12]} 0`,
  borderTop: `1px solid ${vars.color.borderSubtle}`,
});

export const title = style({
  margin: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: fontSize[15],
  fontWeight: fontWeight.bold,
  lineHeight: 1.45,
  letterSpacing: '-0.4px',
  color: vars.color.text,
});

export const link = style({
  color: 'inherit',
  textDecoration: 'none',
  outline: 'none',
  selectors: {
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      zIndex: zIndex.raised,
    },
    '&:hover': { color: vars.color.brand },
    '&:focus-visible::after': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '2px',
      borderRadius: vars.radius.sm,
    },
  },
});

export const preview = style({
  margin: 0,
  fontSize: fontSize[13],
  lineHeight: 1.5,
  color: vars.color.textTertiary,
  overflowWrap: 'anywhere',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
});

export const footer = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[8],
  margin: `${space[4]} 0 0`,
  fontSize: fontSize[13],
  lineHeight: 1.5,
  color: vars.color.textTertiary,
});

export const author = style({
  flex: '1 1 auto',
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontWeight: fontWeight.semibold,
  color: vars.color.textMuted,
});

export const likes = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '3px',
});

globalStyle(`${likes} svg`, { width: '13px', height: '13px' });

export const price = style({
  fontWeight: fontWeight.bold,
  color: vars.color.text,
  whiteSpace: 'nowrap',
});

export const skeletons = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[16],
  paddingTop: space[12],
});
