import { style } from '@vanilla-extract/css';
import { vars } from '@/design-system/tokens';

export const mark = style({
  // 검색어에 딱 붙는 얇은 배경이라 토큰보다 작은 값을 써요.
  padding: '0 1px',
  borderRadius: '3px',
  backgroundColor: vars.color.brandMuted,
  color: 'inherit',
});
