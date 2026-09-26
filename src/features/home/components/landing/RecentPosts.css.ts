import { style } from '@vanilla-extract/css';
import {
  fontSize,
  fontWeight,
  mq,
  space,
  typeScale,
  vars,
} from '@/design-system/tokens';

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gap: space[12],
  margin: 0,
  padding: 0,
  listStyle: 'none',
  '@media': {
    [mq.md]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: space[20],
    },
    [mq.lg]: {
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      gap: space[24],
    },
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
  gap: space[6],
  flex: '1 1 auto',
  padding: `${space[16]} ${space[18]} ${space[18]}`,
  '@media': {
    [mq.md]: { padding: `${space[18]} ${space[20]} ${space[20]}` },
  },
});

export const title = style({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  ...typeScale.cardTitleSm,

  selectors: {
    [`${card}:hover &`]: { color: vars.color.brand },
  },
  '@media': {
    [mq.md]: { fontSize: fontSize[18] },
  },
});

export const excerpt = style({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  ...typeScale.body,

  color: vars.color.textSecondary,
  whiteSpace: 'pre-line',
});

export const meta = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[8],
  marginTop: 'auto',
  paddingTop: space[8],
  fontSize: fontSize[13],
  color: vars.color.textTertiary,
});

export const author = style({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  fontSize: fontSize[14],
  fontWeight: fontWeight.semibold,
  color: vars.color.textMuted,
});

export const spacer = style({ flex: '1 1 auto' });

export const stat = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: space[4],
  flexShrink: 0,
});

export const statIcon = style({ width: '15px', height: '15px' });
