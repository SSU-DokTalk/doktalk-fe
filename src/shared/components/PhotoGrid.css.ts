import { style } from '@vanilla-extract/css';
import { fontSize, fontWeight, mq, space, vars } from '@/design-system/tokens';

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: space[8],
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

/** 사진이 한 장이면 넓게 */
export const single = style({
  gridTemplateColumns: 'minmax(0, 1fr)',
});

export const cell = style({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.surfaceSubtle,
});

export const feed = style({
  height: '160px',
  '@media': {
    [mq.md]: { height: '220px' },
  },
});

export const detail = style({
  height: '220px',
  '@media': {
    [mq.md]: { height: '300px', borderRadius: vars.radius.xl },
  },
});

export const image = style({
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const more = style({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(17, 24, 39, 0.55)',
  fontSize: fontSize[17],
  fontWeight: fontWeight.bold,
  color: vars.color.textOnBrand,
});
