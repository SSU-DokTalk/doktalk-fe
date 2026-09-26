import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@/design-system/tokens';

/** 좋아요를 누르면 하트를 채워요. */
export const liked = style({
  color: vars.color.danger,
});

globalStyle(`${liked} svg`, { fill: 'currentColor' });
