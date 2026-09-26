import { globalStyle, style } from '@vanilla-extract/css';
import { space, typeScale, vars } from '@/design-system/tokens';

export const danger = style({
  color: vars.color.danger,
});

globalStyle(`${danger} > svg`, { color: vars.color.danger });

export const description = style({
  margin: 0,
  ...typeScale.body,

  color: vars.color.textSecondary,
});

export const alert = style({
  margin: `${space[8]} 0 0`,
  ...typeScale.caption,

  color: vars.color.danger,
});
