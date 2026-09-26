import { style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  padding: '8px 0 16px',
  '@media': {
    [mq.md]: {
      gap: '14px',
      padding: '18px 20px 20px',
      borderRadius: vars.radius['2xl'],
      backgroundColor: vars.color.surface,
    },
  },
});

export const head = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  minHeight: '36px',
  padding: '0 20px',
  '@media': {
    [mq.md]: { padding: 0 },
  },
});

export const heading = style({
  margin: 0,
  fontSize: fontSize.lg,
  fontWeight: 700,
  lineHeight: 1.5,
  color: vars.color.text,
  '@media': {
    [mq.md]: { fontSize: fontSize.xl },
  },
});

/** 이전·다음 버튼. 모바일은 손가락으로 넘겨서 숨겨요. */
export const controls = style({
  display: 'none',
  gap: '6px',
  '@media': {
    [mq.md]: { display: 'flex' },
  },
});

export const track = style({
  display: 'grid',
  gridAutoFlow: 'column',
  gridAutoColumns: '250px',
  gap: '10px',
  margin: 0,
  padding: '0 20px',
  listStyle: 'none',
  overflowX: 'auto',
  overscrollBehaviorX: 'contain',
  scrollSnapType: 'x mandatory',
  scrollPadding: '0 20px',
  scrollbarWidth: 'none',
  selectors: {
    '&::-webkit-scrollbar': { display: 'none' },
  },
  '@media': {
    [mq.md]: {
      gridAutoColumns: 'calc((100% - 24px) / 3)',
      gap: '12px',
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
  gap: '12px',
  minWidth: 0,
  boxSizing: 'border-box',
  padding: '12px',
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
  gap: '4px',
  flex: '1 1 0',
  minWidth: 0,
});

export const cardTitle = style({
  margin: 0,
  fontSize: fontSize.base,
  fontWeight: 700,
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
      zIndex: 1,
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
  fontSize: fontSize.sm,
  lineHeight: 1.5,
  color: vars.color.textTertiary,
  overflowWrap: 'anywhere',
});

export const cardPrice = style({
  margin: 'auto 0 0',
  fontSize: fontSize.md,
  fontWeight: 700,
  color: vars.color.text,
});
