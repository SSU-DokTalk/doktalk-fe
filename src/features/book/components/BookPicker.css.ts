import { style } from '@vanilla-extract/css';
import { fontSize, vars } from '@/design-system/tokens';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  minWidth: 0,
});

export const label = style({
  fontSize: fontSize.md,
  fontWeight: 600,
  lineHeight: 1.5,
  color: vars.color.text,
});

export const selected = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px',
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
  fontSize: fontSize.base,
  fontWeight: 700,
  lineHeight: 1.45,
  color: vars.color.text,
  overflowWrap: 'anywhere',
});

export const bookMeta = style({
  fontSize: fontSize.sm,
  lineHeight: 1.5,
  color: vars.color.textSecondary,
  overflowWrap: 'anywhere',
});

export const results = style({
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
  padding: '4px',
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  listStyle: 'none',
  maxHeight: '360px',
  overflowY: 'auto',
});

export const result = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  width: '100%',
  minHeight: '64px',
  boxSizing: 'border-box',
  padding: '8px 10px',
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
  padding: '12px',
  fontSize: fontSize.md,
  color: vars.color.textTertiary,
});

export const error = style({
  margin: 0,
  fontSize: fontSize.sm,
  lineHeight: 1.5,
  color: vars.color.danger,
});
