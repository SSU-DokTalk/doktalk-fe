import { style } from '@vanilla-extract/css';
import { fontSize, fontWeight, space, vars } from '@/design-system/tokens';

export const socialTitle = style({
  margin: 0,
  fontSize: fontSize[14],
  fontWeight: fontWeight.semibold,
  color: vars.color.textBody,
});

export const social = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[12],
});

export const passwordGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[8],
});

export const rules = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: `${space[4]} ${space[14]}`,
  margin: 0,
  padding: 0,
  listStyle: 'none',
  fontSize: fontSize[13],
});

export const rule = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[4],
  color: vars.color.textTertiary,
  fontWeight: fontWeight.medium,
});

export const ruleMet = style({
  color: vars.color.info,
  fontWeight: fontWeight.semibold,
});

export const ruleIcon = style({
  width: '16px',
  height: '16px',
  flexShrink: 0,
});
