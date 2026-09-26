import { style, styleVariants } from '@vanilla-extract/css';
import {
  fontSize,
  fontWeight,
  layout,
  mq,
  space,
  vars,
} from '@/design-system/tokens';
import { card } from '@/shared/components/Section.css';

export const monthCard = style([
  card,
  {
    display: 'flex',
    flexDirection: 'column',
    gap: space[10],
    padding: `${space[12]} ${space[12]} ${space[16]}`,
    '@media': {
      [mq.md]: { padding: `${space[16]} ${space[20]} ${space[20]}` },
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
  fontSize: fontSize[18],
  fontWeight: fontWeight.bold,
  lineHeight: 1.4,
  letterSpacing: '-0.4px',
  color: vars.color.text,
});

export const total = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: space[12],
  margin: `0 ${space[8]}`,
  padding: `${space[14]} ${space[16]}`,
  borderRadius: vars.radius.tile,
  backgroundColor: vars.color.surfaceSubtle,
  '@media': {
    [mq.md]: { margin: 0 },
  },
});

export const totalLabel = style({
  fontSize: fontSize[14],
  lineHeight: 1.5,
  color: vars.color.textSecondary,
});

export const totalValue = style({
  fontSize: fontSize[18],
  fontWeight: fontWeight.extrabold,
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
  gap: space[12],
  padding: `${space[14]} ${layout.gutter}`,
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
  '@media': {
    [mq.md]: { padding: `${space[16]} ${space[24]}` },
  },
});

export const text = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[4],
  flex: '1 1 0',
  minWidth: 0,
});

export const badges = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[6],
});

const titleBase = style({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  fontSize: fontSize[15],
  fontWeight: fontWeight.semibold,
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
  fontSize: fontSize[13],
  lineHeight: 1.5,
  color: vars.color.textTertiary,
});

const priceBase = style({
  flexShrink: 0,
  fontSize: fontSize[16],
  fontWeight: fontWeight.bold,
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
  padding: `${space[14]} ${layout.gutter} ${space[18]}`,
  fontSize: fontSize[13],
  lineHeight: 1.6,
  color: vars.color.textTertiary,
  '@media': {
    [mq.md]: { padding: `${space[14]} ${space[24]} ${space[18]}` },
  },
});

export const state = style({
  padding: `${space[8]} 0`,
});
