import { globalStyle, style } from '@vanilla-extract/css';
import {
  fontSize,
  fontWeight,
  layout,
  mq,
  space,
  typeScale,
  vars,
} from '@/design-system/tokens';

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[12],
  padding: `${space[16]} ${layout.gutter} ${space[8]}`,
  backgroundColor: vars.color.surface,
  '@media': {
    [mq.md]: {
      gap: space[14],
      padding: `${space[20]} ${space[24]} ${space[10]}`,
      borderRadius: vars.radius['2xl'],
    },
  },
});

export const head = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[12],
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
  fontSize: fontSize[15],
  fontWeight: fontWeight.semibold,
  lineHeight: 1.5,
});

globalStyle(`${author}:hover ${authorName}`, { textDecoration: 'underline' });

export const time = style({
  ...typeScale.caption,
  color: vars.color.textTertiary,
});

export const text = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[6],
});

export const title = style({
  margin: 0,
  fontSize: fontSize[17],
  fontWeight: fontWeight.bold,
  lineHeight: 1.4,
  letterSpacing: '-0.5px',
  color: vars.color.text,
  overflowWrap: 'anywhere',
  '@media': {
    [mq.md]: { fontSize: fontSize[18] },
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
  fontSize: fontSize[15],
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
  gap: space[4],
  marginLeft: `-${space[10]}`,
});
