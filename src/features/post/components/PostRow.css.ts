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

/** 짧은 게시글 줄 (메인 화면 피드). 글자는 왼쪽, 사진이 있으면 오른쪽에 작게 */
export const row = style({
  position: 'relative',
  display: 'flex',
  gap: space[14],
  padding: `${space[16]} ${layout.gutter}`,
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
  backgroundColor: vars.color.surface,
  selectors: {
    '&:hover': {
      backgroundColor: `color-mix(in srgb, ${vars.color.surfaceSubtle} 55%, ${vars.color.surface})`,
    },
  },
  '@media': {
    [mq.md]: { gap: space[18], padding: `${space[18]} ${space[20]}` },
  },
});

export const text = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[4],
  flex: '1 1 0',
  minWidth: 0,
});

export const title = style({
  margin: 0,
  fontSize: fontSize[16],
  fontWeight: fontWeight.bold,
  lineHeight: 1.4,
  letterSpacing: '-0.3px',
});

/** 줄 전체를 누를 수 있게 제목 링크를 넓혀요. */
export const link = style({
  color: vars.color.text,
  textDecoration: 'none',
  selectors: {
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      zIndex: zIndex.raised,
    },
    '&:hover': { color: vars.color.brand },
    '&:focus-visible': { outline: 'none' },
    '&:focus-visible::after': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '-2px',
    },
  },
});

export const excerpt = style({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  margin: 0,
  ...typeScale.body,
  color: vars.color.textSecondary,
  whiteSpace: 'pre-line',
});

export const meta = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[8],
  margin: `${space[4]} 0 0`,
  fontSize: fontSize[13],
  color: vars.color.textTertiary,
});

export const author = style({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  fontWeight: fontWeight.semibold,
  color: vars.color.textMuted,
});

export const stat = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '3px',
  flexShrink: 0,
});

export const statIcon = style({ width: '14px', height: '14px' });

export const thumb = style({
  flexShrink: 0,
  width: '72px',
  height: '72px',
  borderRadius: vars.radius.md,
  objectFit: 'cover',
  backgroundColor: vars.color.surfaceSubtle,
  '@media': {
    [mq.md]: { width: '88px', height: '88px' },
  },
});
