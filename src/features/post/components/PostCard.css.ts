import { globalStyle, style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '16px 20px 8px',
  backgroundColor: vars.color.surface,
  '@media': {
    [mq.md]: {
      gap: '14px',
      padding: '20px 24px 10px',
      borderRadius: vars.radius['2xl'],
    },
  },
});

export const head = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

export const author = style({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 auto',
  minWidth: 0,
  color: vars.color.text,
  textDecoration: 'none',
  borderRadius: vars.radius.xs,
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '2px',
    },
  },
});

export const authorName = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: fontSize.base,
  fontWeight: 600,
  lineHeight: 1.5,
});

globalStyle(`${author}:hover ${authorName}`, { textDecoration: 'underline' });

export const time = style({
  fontSize: fontSize.sm,
  lineHeight: 1.5,
  color: vars.color.textTertiary,
});

export const text = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

export const title = style({
  margin: 0,
  fontSize: fontSize.xl,
  fontWeight: 700,
  lineHeight: 1.4,
  letterSpacing: '-0.5px',
  color: vars.color.text,
  overflowWrap: 'anywhere',
  '@media': {
    [mq.md]: { fontSize: '1.125rem' },
  },
});

export const titleLink = style({
  color: 'inherit',
  textDecoration: 'none',
  borderRadius: vars.radius.xs,
  selectors: {
    '&:hover': { color: vars.color.brand },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '2px',
    },
  },
});

/** 본문 미리보기. 제목 링크와 같은 곳으로 가는 마우스용 링크예요(키보드는 제목 링크). */
export const excerpt = style({
  margin: 0,
  fontSize: fontSize.base,
  lineHeight: 1.7,
  color: vars.color.textMuted,
  whiteSpace: 'pre-line',
  overflowWrap: 'anywhere',
  textDecoration: 'none',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 4,
  overflow: 'hidden',
});

export const actions = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '4px',
  marginLeft: '-10px',
});
