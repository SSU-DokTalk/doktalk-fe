import { style } from '@vanilla-extract/css';
import { vars } from '../../tokens/theme.css';

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
  fontWeight: 800,
  lineHeight: 1.2,
  letterSpacing: '-0.3px',
  overflowWrap: 'anywhere',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 4,
  overflow: 'hidden',
});

export const fallbackAuthor = style({
  fontWeight: 600,
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
