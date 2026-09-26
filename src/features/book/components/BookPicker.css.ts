import { style } from '@vanilla-extract/css';
import { fontSize, fontWeight, space, vars } from '@/design-system/tokens';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[8],
  minWidth: 0,
});

export const label = style({
  fontSize: fontSize[14],
  fontWeight: fontWeight.semibold,
  lineHeight: 1.5,
  color: vars.color.text,
});

export const selected = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[12],
  padding: space[12],
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.surfaceSubtle,
});

export const bookText = style({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 auto',
  minWidth: 0,
});

export const bookTitle = style({
  fontSize: fontSize[15],
  fontWeight: fontWeight.bold,
  lineHeight: 1.45,
  color: vars.color.text,
  overflowWrap: 'anywhere',
});

export const bookMeta = style({
  fontSize: fontSize[13],
  lineHeight: 1.5,
  color: vars.color.textSecondary,
  overflowWrap: 'anywhere',
});

export const results = style({
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
  padding: space[4],
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  listStyle: 'none',
  maxHeight: '360px',
  overflowY: 'auto',
});

export const result = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[12],
  width: '100%',
  minHeight: '64px',
  boxSizing: 'border-box',
  padding: `${space[8]} ${space[10]}`,
  border: 0,
  borderRadius: vars.radius.md,
  background: 'transparent',
  fontFamily: vars.font.family,
  textAlign: 'start',
  cursor: 'pointer',
  selectors: {
    '&:hover': { backgroundColor: vars.color.surfaceSubtle },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '-2px',
    },
  },
});

export const status = style({
  margin: 0,
  padding: space[12],
  fontSize: fontSize[14],
  color: vars.color.textTertiary,
});

export const error = style({
  margin: 0,
  fontSize: fontSize[13],
  lineHeight: 1.5,
  color: vars.color.danger,
});
