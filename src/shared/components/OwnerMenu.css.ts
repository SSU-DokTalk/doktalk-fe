import { globalStyle, style } from '@vanilla-extract/css';
import { fontSize, space, vars } from '@/design-system/tokens';

export const danger = style({
  color: vars.color.danger,
});

globalStyle(`${danger} > svg`, { color: vars.color.danger });

export const description = style({
  margin: 0,
  fontSize: fontSize[15],
  lineHeight: 1.6,
  color: vars.color.textSecondary,
});

export const alert = style({
  margin: `${space[8]} 0 0`,
  fontSize: fontSize[13],
  lineHeight: 1.5,
  color: vars.color.danger,
});
