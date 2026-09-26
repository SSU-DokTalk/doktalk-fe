import { style, styleVariants } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';
import { card } from '@/shared/components/Section.css';

export const monthCard = style([
  card,
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '12px 12px 16px',
    '@media': {
      [mq.md]: { padding: '16px 20px 20px' },
    },
  },
]);

export const monthNav = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const month = style({
  margin: 0,
  fontSize: '1.125rem',
  fontWeight: 700,
  lineHeight: 1.4,
  letterSpacing: '-0.4px',
  color: vars.color.text,
});

export const total = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  margin: '0 8px',
  padding: '14px 16px',
  borderRadius: '14px',
  backgroundColor: vars.color.surfaceSubtle,
  '@media': {
    [mq.md]: { margin: 0 },
  },
});

export const totalLabel = style({
  fontSize: fontSize.md,
  lineHeight: 1.5,
  color: vars.color.textSecondary,
});

export const totalValue = style({
  fontSize: '1.125rem',
  fontWeight: 800,
  lineHeight: 1.4,
  letterSpacing: '-0.4px',
  color: vars.color.text,
});

export const listCard = style([
  card,
  {
    overflow: 'hidden',
    transition: 'opacity 120ms ease',
    selectors: {
      '&[aria-busy="true"]': { opacity: 0.6 },
    },
  },
]);

export const list = style({
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const row = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '14px 20px',
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
  '@media': {
    [mq.md]: { padding: '16px 24px' },
  },
});

export const text = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  flex: '1 1 0',
  minWidth: 0,
});

export const badges = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
});

const titleBase = style({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  fontSize: fontSize.base,
  fontWeight: 600,
  lineHeight: 1.45,
  letterSpacing: '-0.3px',
  textDecoration: 'none',
  selectors: {
    '&:hover': { textDecoration: 'underline' },
  },
});

export const title = styleVariants({
  paid: [titleBase, { color: vars.color.text }],
  cancelled: [titleBase, { color: vars.color.textSecondary }],
});

export const date = style({
  fontSize: fontSize.sm,
  lineHeight: 1.5,
  color: vars.color.textTertiary,
});

const priceBase = style({
  flexShrink: 0,
  fontSize: fontSize.lg,
  fontWeight: 700,
});

export const price = styleVariants({
  paid: [priceBase, { color: vars.color.text }],
  cancelled: [
    priceBase,
    { color: vars.color.textTertiary, textDecoration: 'line-through' },
  ],
});

export const note = style({
  margin: 0,
  padding: '14px 20px 18px',
  fontSize: fontSize.sm,
  lineHeight: 1.6,
  color: vars.color.textTertiary,
  '@media': {
    [mq.md]: { padding: '14px 24px 18px' },
  },
});

export const state = style({
  padding: '8px 0',
});
