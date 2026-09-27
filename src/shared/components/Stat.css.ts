import { style, styleVariants } from '@vanilla-extract/css';
import { space } from '@/design-system/tokens';

export const stat = style({
  display: 'inline-flex',
  alignItems: 'center',
});

/** 아이콘 크기와 숫자와의 간격. 작은 크기는 토큰 사이 값(3px)으로 좁게 붙여요. */
export const size = styleVariants({
  sm: { gap: '3px' },
  md: { gap: '3px' },
  lg: { gap: space[4] },
});

export const icon = styleVariants({
  sm: { width: '13px', height: '13px', flexShrink: 0 },
  md: { width: '14px', height: '14px', flexShrink: 0 },
  lg: { width: '15px', height: '15px', flexShrink: 0 },
});
