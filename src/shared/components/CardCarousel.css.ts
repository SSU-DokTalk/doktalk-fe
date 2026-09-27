import { style } from '@vanilla-extract/css';
import {
  fontSize,
  fontWeight,
  layout,
  mq,
  space,
  typeScale,
  vars,
  zIndex,
} from '@/design-system/tokens';

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[10],
  padding: `${space[8]} 0 ${space[16]}`,
  '@media': {
    [mq.md]: {
      gap: space[14],
      padding: `${space[18]} ${space[20]} ${space[20]}`,
      borderRadius: vars.radius['2xl'],
      backgroundColor: vars.color.surface,
    },
  },
});

export const head = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: space[12],
  minHeight: '36px',
  padding: `0 ${layout.gutter}`,
  '@media': {
    [mq.md]: { padding: 0 },
  },
});

export const heading = style({
  margin: 0,
  ...typeScale.sectionTitleSm,
  color: vars.color.text,
  '@media': {
    [mq.md]: { fontSize: fontSize[17] },
  },
});

/** 이전·다음 버튼. 모바일은 손가락으로 넘겨서 숨겨요. */
export const controls = style({
  display: 'none',
  gap: space[6],
  '@media': {
    [mq.md]: { display: 'flex' },
  },
});

export const track = style({
  display: 'grid',
  gridAutoFlow: 'column',
  gridAutoColumns: '250px',
  gap: space[10],
  margin: 0,
  padding: `0 ${layout.gutter}`,
  listStyle: 'none',
  overflowX: 'auto',
  overscrollBehaviorX: 'contain',
  scrollSnapType: 'x mandatory',
  scrollPadding: `0 ${layout.gutter}`,
  scrollbarWidth: 'none',
  selectors: {
    '&::-webkit-scrollbar': { display: 'none' },
  },
  '@media': {
    [mq.md]: {
      gridAutoColumns: 'calc((100% - 24px) / 3)',
      gap: space[12],
      padding: 0,
      scrollPadding: 0,
    },
  },
});

export const slide = style({
  display: 'flex',
  minWidth: 0,
  scrollSnapAlign: 'start',
});

export const card = style({
  position: 'relative',
  display: 'flex',
  flex: '1 1 auto',
  gap: space[12],
  minWidth: 0,
  boxSizing: 'border-box',
  padding: space[12],
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.surface,
  transition: 'border-color 120ms ease, background-color 120ms ease',
  selectors: {
    '&:hover': {
      borderColor: vars.color.brandBorder,
      backgroundColor: `color-mix(in srgb, ${vars.color.brandSubtle} 40%, ${vars.color.surface})`,
    },
  },
});

export const cardBody = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[4],
  flex: '1 1 0',
  minWidth: 0,
});

export const cardTitle = style({
  margin: 0,
  fontSize: fontSize[15],
  fontWeight: fontWeight.bold,
  lineHeight: 1.4,
  letterSpacing: '-0.4px',
  color: vars.color.text,
  overflowWrap: 'anywhere',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
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
      borderRadius: vars.radius.lg,
    },
    '&:focus-visible::after': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '2px',
    },
  },
});

export const cardMeta = style({
  margin: 0,
  ...typeScale.caption,
  color: vars.color.textTertiary,
  overflowWrap: 'anywhere',
});

export const cardPrice = style({
  margin: 'auto 0 0',
  fontSize: fontSize[14],
  fontWeight: fontWeight.bold,
  color: vars.color.text,
});
