import { globalStyle, style } from '@vanilla-extract/css';
import { fontSize, vars } from '@/design-system/tokens';

export const danger = style({
  color: vars.color.danger,
});

globalStyle(`${danger} > svg`, { color: vars.color.danger });

export const description = style({
  margin: 0,
  fontSize: fontSize.base,
  lineHeight: 1.6,
  color: vars.color.textSecondary,
});

export const alert = style({
  margin: '8px 0 0',
  fontSize: fontSize.sm,
  lineHeight: 1.5,
  color: vars.color.danger,
});
