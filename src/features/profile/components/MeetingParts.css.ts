import { style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

/** 월·일·요일을 세로로 쌓은 날짜 칸 */
export const date = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  boxSizing: 'border-box',
  height: '66px',
  borderRadius: '12px',
  backgroundColor: vars.color.brandSubtle,
  color: vars.color.brand,
  textAlign: 'center',
  '@media': {
    [mq.md]: { height: '76px', gap: '2px', borderRadius: '14px' },
  },
});

export const dateSmall = style({
  fontSize: '0.6875rem',
  fontWeight: 600,
  lineHeight: 1.4,
  whiteSpace: 'nowrap',
  '@media': {
    [mq.md]: { fontSize: fontSize.xs },
  },
});

export const dateDay = style({
  fontSize: '1.3125rem',
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: '-0.5px',
  '@media': {
    [mq.md]: { fontSize: '1.5rem' },
  },
});

/** 글자 링크 모양 (메인 화면 카드) */
export const textAction = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '2px',
  minHeight: '32px',
  fontSize: fontSize.md,
  fontWeight: 600,
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
