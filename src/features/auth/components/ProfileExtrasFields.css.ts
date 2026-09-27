import { style } from '@vanilla-extract/css';
import { space, typeScale, vars } from '@/design-system/tokens';

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[16],
  minWidth: 0,
});

export const heading = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[4],
});

export const title = style({
  margin: 0,
  ...typeScale.sectionTitleSm,
  color: vars.color.text,
});

/** 세 칸을 글자 폭만큼만 */
export const gender = style({
  alignSelf: 'flex-start',
});
