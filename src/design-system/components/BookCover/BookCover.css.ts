import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../../tokens/theme.css';
import { fontWeight } from '../../tokens/scale';

export const cover = style({
  position: 'relative',
  display: 'block',
  flexShrink: 0,
  boxSizing: 'border-box',
  overflow: 'hidden',
  // 왼쪽이 책등처럼 보이도록 모서리를 다르게 둬요.
  borderRadius: '2px 5px 5px 2px',
  outline: '1px solid rgba(0, 0, 0, 0.06)',
  outlineOffset: '-1px',
  boxShadow: '0 6px 14px rgba(0, 0, 0, 0.16)',
  fontFamily: vars.font.family,
  selectors: {
    // 책등 그림자. 사진 위에도 보이게 가장 위에 겹쳐요.
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      boxShadow: 'inset 3px 0 0 rgba(0, 0, 0, 0.12)',
      pointerEvents: 'none',
    },
  },
});

/** 표지 그림 층. 제목·저자를 위아래로 벌려 놓아요. */
export const art = style({
  position: 'absolute',
  inset: 0,
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export const image = style({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  maxWidth: 'none',
  objectFit: 'cover',
});

export const fallbackTitle = style({
  fontWeight: fontWeight.extrabold,
  lineHeight: 1.2,
  letterSpacing: '-0.3px',
  overflowWrap: 'anywhere',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 4,
  overflow: 'hidden',
});

export const fallbackAuthor = style({
  fontWeight: fontWeight.semibold,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

/** 표지 뒤 회색 배경 판 (목록 카드 상단) */
export const stage = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: vars.radius.lg,
  background: 'linear-gradient(180deg, #F5F4F3 0%, #E9E9E9 100%)',
});

/**
 * 표지 너비에 비례하는 안쪽 여백과 글자 크기 (너비의 %, 최소 px).
 * 고정 너비 표지는 BookCover.tsx가 px로, 칸을 채우는 표지는 아래 CSS가 cqw로 같은 비율을 써요.
 */
export const proportions = {
  padding: { percent: 10, min: 6 },
  title: { percent: 13, min: 9 },
  author: { percent: 7.5, min: 7 },
};

const fluid = ({ percent, min }: { percent: number; min: number }) =>
  `max(${min}px, ${percent}cqw)`;

/** 칸을 채우는 표지. 안쪽 여백·글자 크기를 표지 너비(cqw)에 맞춰요. */
export const fill = style({
  containerType: 'inline-size',
});

globalStyle(`${fill} ${art}`, { padding: fluid(proportions.padding) });
globalStyle(`${fill} ${fallbackTitle}`, {
  fontSize: fluid(proportions.title),
});
globalStyle(`${fill} ${fallbackAuthor}`, {
  fontSize: fluid(proportions.author),
});
