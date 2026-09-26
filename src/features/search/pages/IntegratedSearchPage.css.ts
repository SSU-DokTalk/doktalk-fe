import { globalStyle, style } from '@vanilla-extract/css';
import {
  fontSize,
  fontWeight,
  layout,
  mq,
  space,
  vars,
  zIndex,
} from '@/design-system/tokens';

export const page = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[12],
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',
  '@media': {
    [mq.md]: { gap: space[16] },
  },
});

/** lg 미만: 상단 내비 검색창이 아이콘으로 줄어서 여기에 검색창을 둬요. */
export const searchForm = style({
  margin: 0,
  padding: `${space[12]} ${layout.gutter} 0`,
  '@media': {
    [mq.md]: { padding: 0 },
    [mq.lg]: { display: 'none' },
  },
});

export const heading = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[4],
  padding: `${space[4]} ${layout.gutter} 0`,
  '@media': {
    [mq.md]: { padding: 0 },
  },
});

export const eyebrow = style({
  fontSize: fontSize[14],
  fontWeight: fontWeight.semibold,
  lineHeight: 1.5,
  color: vars.color.info,
});

export const title = style({
  margin: 0,
  fontSize: fontSize[22],
  fontWeight: fontWeight.bold,
  lineHeight: 1.4,
  letterSpacing: '-0.6px',
  color: vars.color.text,
  overflowWrap: 'anywhere',
  '@media': {
    [mq.md]: { fontSize: fontSize[26], letterSpacing: '-0.7px' },
  },
});

export const chips = style({
  padding: `0 ${layout.gutter}`,
  '@media': {
    [mq.md]: { padding: 0 },
  },
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[12],
  padding: space[20],
  backgroundColor: vars.color.surface,
  '@media': {
    [mq.md]: { borderRadius: vars.radius['2xl'] },
  },
});

export const sectionHead = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: space[8],
});

export const sectionTitle = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: space[6],
  margin: 0,
  fontSize: fontSize[17],
  fontWeight: fontWeight.bold,
  lineHeight: 1.5,
  color: vars.color.text,
});

export const sectionCount = style({
  fontWeight: fontWeight.semibold,
  color: vars.color.textTertiary,
});

export const grid3 = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gap: space[10],
  margin: 0,
  padding: 0,
  listStyle: 'none',
  '@media': {
    [mq.md]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: space[12],
    },
    [mq.xl]: { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' },
  },
});

export const grid2 = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gap: space[10],
  margin: 0,
  padding: 0,
  listStyle: 'none',
  '@media': {
    [mq.md]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: space[12],
    },
  },
});

export const card = style({
  position: 'relative',
  display: 'flex',
  gap: space[12],
  height: '100%',
  boxSizing: 'border-box',
  padding: space[14],
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  transition: 'border-color 120ms ease, background-color 120ms ease',
  selectors: {
    '&:hover': { borderColor: vars.color.brandBorder },
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
    },
    '&:focus-visible::after': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '2px',
      borderRadius: vars.radius.lg,
    },
  },
});

export const cardMeta = style({
  margin: 0,
  fontSize: fontSize[13],
  lineHeight: 1.5,
  color: vars.color.textTertiary,
  overflowWrap: 'anywhere',
});

export const excerpt = style({
  margin: 0,
  fontSize: fontSize[14],
  lineHeight: 1.6,
  color: vars.color.textMuted,
  overflowWrap: 'anywhere',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
});

export const cardFoot = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[10],
  marginTop: 'auto',
  paddingTop: space[4],
  fontSize: fontSize[13],
  color: vars.color.textTertiary,
});

export const author = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontWeight: fontWeight.semibold,
  color: vars.color.textMuted,
});

export const stat = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '3px',
});

globalStyle(`${stat} svg`, { width: '13px', height: '13px' });

export const posts = style({
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const postRow = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: space[6],
  padding: `${space[14]} 0 ${space[16]}`,
  borderTop: `1px solid ${vars.color.borderSubtle}`,
});

export const books = style({
  display: 'grid',
  gridAutoFlow: 'column',
  gridAutoColumns: '140px',
  gap: space[12],
  margin: 0,
  padding: `0 0 ${space[4]}`,
  listStyle: 'none',
  overflowX: 'auto',
  '@media': {
    [mq.md]: {
      gridAutoFlow: 'row',
      gridTemplateColumns: 'repeat(auto-fill, minmax(132px, 1fr))',
      overflowX: 'visible',
    },
  },
});

export const book = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[10],
  minWidth: 0,
});

export const bookStage = style({
  height: '180px',
  borderRadius: vars.radius.lg,
});

export const bookTitle = style({
  margin: 0,
  minHeight: '2.8em',
  fontSize: fontSize[15],
  fontWeight: fontWeight.bold,
  lineHeight: 1.4,
  color: vars.color.text,
  overflowWrap: 'anywhere',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
});

export const sectionError = style({
  margin: 0,
  fontSize: fontSize[14],
  color: vars.color.textTertiary,
});
