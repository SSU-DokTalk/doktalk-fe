import { style } from '@vanilla-extract/css';
import {
  fontSize,
  fontWeight,
  space,
  typeScale,
  vars,
  zIndex,
} from '@/design-system/tokens';

export const section = style({
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

export const heading = style({
  margin: 0,
  ...typeScale.sectionTitle,

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
  gap: space[12],
  padding: `${space[12]} 0`,
  borderTop: `1px solid ${vars.color.borderSubtle}`,
});

export const body = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[2],
  flex: '1 1 0',
  minWidth: 0,
});

export const link = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: fontSize[14],
  fontWeight: fontWeight.bold,
  lineHeight: 1.45,
  color: vars.color.text,
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

export const meta = style({
  ...typeScale.caption,

  color: vars.color.textTertiary,
});
