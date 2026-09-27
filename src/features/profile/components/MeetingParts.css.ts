import { style } from '@vanilla-extract/css';
import { fontSize, fontWeight, mq, space, vars } from '@/design-system/tokens';

/** 월·일·요일을 세로로 쌓은 날짜 칸 */
export const date = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  boxSizing: 'border-box',
  height: '66px',
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.brandSubtle,
  color: vars.color.brand,
  textAlign: 'center',
  '@media': {
    [mq.md]: { height: '76px', gap: space[2], borderRadius: vars.radius.tile },
  },
});

export const dateSmall = style({
  fontSize: fontSize[11],
  fontWeight: fontWeight.semibold,
  lineHeight: 1.4,
  whiteSpace: 'nowrap',
  '@media': {
    [mq.md]: { fontSize: fontSize[12] },
  },
});

export const dateDay = style({
  fontSize: fontSize[21],
  fontWeight: fontWeight.extrabold,
  lineHeight: 1.1,
  letterSpacing: '-0.5px',
  '@media': {
    [mq.md]: { fontSize: fontSize[24] },
  },
});

/** 글자 링크 모양 (메인 화면 카드) */
export const textAction = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: space[2],
  minHeight: '32px',
  fontSize: fontSize[14],
  fontWeight: fontWeight.semibold,
  color: vars.color.brand,
  textDecoration: 'none',
  selectors: {
    '&:hover': { textDecoration: 'underline' },
  },
});

export const textActionIcon = style({
  width: '16px',
  height: '16px',
});
