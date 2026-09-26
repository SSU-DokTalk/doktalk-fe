import { style } from '@vanilla-extract/css';
import {
  fontSize,
  fontWeight,
  mq,
  space,
  vars,
  zIndex,
} from '@/design-system/tokens';

/** 모바일은 옆으로 넘기는 줄, 넓어지면 2칸 → 4칸 */
export const grid = style({
  display: 'grid',
  gridAutoFlow: 'column',
  gridAutoColumns: 'minmax(240px, 72%)',
  gap: space[12],
  margin: `0 -${space[16]}`,
  padding: `0 ${space[16]} ${space[4]}`,
  overflowX: 'auto',
  scrollSnapType: 'x mandatory',
  scrollPaddingLeft: space[16],
  listStyle: 'none',
  scrollbarWidth: 'none',
  selectors: {
    '&::-webkit-scrollbar': { display: 'none' },
  },
  '@media': {
    [mq.sm]: {
      gridAutoFlow: 'row',
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      margin: 0,
      padding: 0,
      overflow: 'visible',
      gap: space[20],
    },
    [mq.lg]: {
      gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
      gap: space[24],
    },
  },
});

export const item = style({
  scrollSnapAlign: 'start',
  minWidth: 0,
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
  transition: 'box-shadow 160ms ease, transform 160ms ease',
  selectors: {
    '&:hover': { boxShadow: vars.shadow.md },
    '&:focus-visible': {
      outline: `3px solid ${vars.color.brand}`,
      outlineOffset: '2px',
    },
  },
});

export const stage = style({
  position: 'relative',
  height: '200px',
  borderRadius: 0,
  '@media': {
    [mq.md]: { height: '240px' },
  },
});

export const mode = style({
  position: 'absolute',
  top: space[14],
  left: space[14],
  // 좁은 카드에서 표지와 겹쳐도 배지가 위에 보이게
  zIndex: zIndex.raised,
});

export const modeIcon = style({ width: '14px', height: '14px' });

export const body = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[4],
  flex: '1 1 auto',
  padding: `${space[16]} ${space[18]} ${space[18]}`,
});

export const category = style({
  fontSize: fontSize[13],
  fontWeight: fontWeight.semibold,
  color: vars.color.info,
});

export const title = style({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  minHeight: '2.8em',
  fontSize: fontSize[17],
  fontWeight: fontWeight.bold,
  lineHeight: 1.4,
  letterSpacing: '-0.4px',
  selectors: {
    [`${card}:hover &`]: { color: vars.color.brand },
  },
});

export const when = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[6],
  fontSize: fontSize[14],
  color: vars.color.textTertiary,
});

export const whenIcon = style({
  width: '16px',
  height: '16px',
  flexShrink: 0,
});

export const foot = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: space[8],
  marginTop: 'auto',
  paddingTop: space[8],
});

export const price = style({
  fontSize: fontSize[16],
  fontWeight: fontWeight.bold,
});

export const limit = style({
  fontSize: fontSize[13],
  color: vars.color.textTertiary,
});
