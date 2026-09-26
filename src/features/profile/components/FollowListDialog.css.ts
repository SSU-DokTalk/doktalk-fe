import { style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

/** 탭을 바꿔도 창 높이가 그대로이게 높이를 정해 두고, 목록만 스크롤해요. */
export const popup = style({
  overflow: 'hidden',
  '@media': {
    [mq.md]: { height: 'min(640px, calc(100dvh - 64px))' },
  },
});

export const body = style({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 auto',
  minHeight: 0,
});

export const tabs = style({
  flexShrink: 0,
});

export const panel = style({
  flex: '1 1 auto',
  minHeight: 0,
  overflowY: 'auto',
  overscrollBehavior: 'contain',
});

export const list = style({
  margin: 0,
  padding: '8px 0',
  listStyle: 'none',
});

export const row = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  minHeight: '68px',
  padding: '0 20px 0 24px',
});

export const person = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  flex: '1 1 0',
  minWidth: 0,
  minHeight: '44px',
  color: vars.color.text,
  textDecoration: 'none',
  borderRadius: vars.radius.sm,
  selectors: {
    '&:hover': { color: vars.color.brand },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '2px',
    },
  },
});

export const personName = style({
  fontSize: fontSize.base,
  fontWeight: 600,
  lineHeight: 1.5,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const status = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '56px',
  padding: '8px 20px',
});

export const state = style({
  padding: '24px 20px',
});
