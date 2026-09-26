import { style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gap: '12px',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  '@media': {
    [mq.md]: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '20px' },
    [mq.lg]: { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '24px' },
  },
});

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'hidden',
  border: `1px solid ${vars.color.borderSubtle}`,
  borderRadius: vars.radius['2xl'],
  backgroundColor: vars.color.surface,
  color: vars.color.text,
  textDecoration: 'none',
  selectors: {
    '&:hover': { boxShadow: vars.shadow.md },
    '&:focus-visible': {
      outline: `3px solid ${vars.color.brand}`,
      outlineOffset: '2px',
    },
  },
});

export const photo = style({
  display: 'block',
  width: '100%',
  height: '180px',
  objectFit: 'cover',
  backgroundColor: vars.color.surfaceSubtle,
  '@media': {
    [mq.md]: { height: '200px' },
  },
});

export const body = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  flex: '1 1 auto',
  padding: '16px 18px 18px',
  '@media': {
    [mq.md]: { padding: '18px 20px 20px' },
  },
});

export const title = style({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  fontSize: fontSize.lg,
  fontWeight: 700,
  lineHeight: 1.4,
  letterSpacing: '-0.4px',
  selectors: {
    [`${card}:hover &`]: { color: vars.color.brand },
  },
  '@media': {
    [mq.md]: { fontSize: '1.125rem' },
  },
});

export const excerpt = style({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  fontSize: fontSize.base,
  lineHeight: 1.6,
  color: vars.color.textSecondary,
  whiteSpace: 'pre-line',
});

export const meta = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginTop: 'auto',
  paddingTop: '8px',
  fontSize: fontSize.sm,
  color: vars.color.textTertiary,
});

export const author = style({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  fontSize: fontSize.md,
  fontWeight: 600,
  color: vars.color.textMuted,
});

export const spacer = style({ flex: '1 1 auto' });

export const stat = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  flexShrink: 0,
});

export const statIcon = style({ width: '15px', height: '15px' });
