import { globalStyle, style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

export const page = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',
  '@media': {
    [mq.md]: { gap: '16px' },
  },
});

/** lg 미만: 상단 내비 검색창이 아이콘으로 줄어서 여기에 검색창을 둬요. */
export const searchForm = style({
  margin: 0,
  padding: '12px 20px 0',
  '@media': {
    [mq.md]: { padding: 0 },
    [mq.lg]: { display: 'none' },
  },
});

export const heading = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  padding: '4px 20px 0',
  '@media': {
    [mq.md]: { padding: 0 },
  },
});

export const eyebrow = style({
  fontSize: fontSize.md,
  fontWeight: 600,
  lineHeight: 1.5,
  color: vars.color.info,
});

export const title = style({
  margin: 0,
  fontSize: '1.375rem',
  fontWeight: 700,
  lineHeight: 1.4,
  letterSpacing: '-0.6px',
  color: vars.color.text,
  overflowWrap: 'anywhere',
  '@media': {
    [mq.md]: { fontSize: '1.625rem', letterSpacing: '-0.7px' },
  },
});

export const chips = style({
  padding: '0 20px',
  '@media': {
    [mq.md]: { padding: 0 },
  },
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '20px',
  backgroundColor: vars.color.surface,
  '@media': {
    [mq.md]: { borderRadius: vars.radius['2xl'] },
  },
});

export const sectionHead = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px',
});

export const sectionTitle = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: '6px',
  margin: 0,
  fontSize: fontSize.xl,
  fontWeight: 700,
  lineHeight: 1.5,
  color: vars.color.text,
});

export const sectionCount = style({
  fontWeight: 600,
  color: vars.color.textTertiary,
});

export const grid3 = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gap: '10px',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  '@media': {
    [mq.md]: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' },
    [mq.xl]: { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' },
  },
});

export const grid2 = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gap: '10px',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  '@media': {
    [mq.md]: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' },
  },
});

export const card = style({
  position: 'relative',
  display: 'flex',
  gap: '12px',
  height: '100%',
  boxSizing: 'border-box',
  padding: '14px',
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
    '&::after': { content: '""', position: 'absolute', inset: 0, zIndex: 1 },
    '&:focus-visible::after': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '2px',
      borderRadius: vars.radius.lg,
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

export const excerpt = style({
  margin: 0,
  fontSize: fontSize.md,
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
  gap: '10px',
  marginTop: 'auto',
  paddingTop: '4px',
  fontSize: fontSize.sm,
  color: vars.color.textTertiary,
});

export const author = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontWeight: 600,
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
  gap: '6px',
  padding: '14px 0 16px',
  borderTop: `1px solid ${vars.color.borderSubtle}`,
});

export const books = style({
  display: 'grid',
  gridAutoFlow: 'column',
  gridAutoColumns: '140px',
  gap: '12px',
  margin: 0,
  padding: '0 0 4px',
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
  gap: '10px',
  minWidth: 0,
});

export const bookStage = style({
  height: '180px',
  borderRadius: vars.radius.lg,
});

export const bookTitle = style({
  margin: 0,
  minHeight: '2.8em',
  fontSize: fontSize.base,
  fontWeight: 700,
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
  fontSize: fontSize.md,
  color: vars.color.textTertiary,
});
