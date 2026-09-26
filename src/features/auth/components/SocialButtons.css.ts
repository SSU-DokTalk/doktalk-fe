import { style, styleVariants } from '@vanilla-extract/css';
import { fontSize, vars } from '@/design-system/tokens';

export const list = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const centered = style({
  justifyContent: 'center',
  gap: '16px',
});

const base = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  width: '52px',
  height: '52px',
  padding: 0,
  border: '1px solid transparent',
  borderRadius: vars.radius.pill,
  fontFamily: vars.font.family,
  cursor: 'pointer',
  transition: 'filter 120ms ease',
  selectors: {
    '&:hover': { filter: 'brightness(0.95)' },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '3px',
    },
  },
});

/** 각 회사 로그인 버튼 색 (회사 가이드 색이라 토큰이 아니에요) */
export const provider = styleVariants({
  naver: [
    base,
    {
      backgroundColor: '#03C75A',
      color: '#FFFFFF',
      fontSize: '1.25rem',
      fontWeight: 900,
    },
  ],
  kakao: [base, { backgroundColor: '#FEE500', color: '#191919' }],
  google: [
    base,
    {
      backgroundColor: vars.color.surface,
      borderColor: vars.color.borderInput,
      color: '#3C4043',
      fontSize: '1.3125rem',
      fontWeight: 700,
    },
  ],
  facebook: [
    base,
    {
      backgroundColor: '#1877F2',
      color: '#FFFFFF',
      fontSize: fontSize.xl,
      fontWeight: 800,
    },
  ],
});

export const kakaoIcon = style({
  width: '24px',
  height: '24px',
});
