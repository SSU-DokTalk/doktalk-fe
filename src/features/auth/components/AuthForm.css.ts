import { style } from '@vanilla-extract/css';
import { fontSize, space, vars } from '@/design-system/tokens';

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[14],
  margin: 0,
});

export const wideForm = style({
  gap: space[20],
});

export const alert = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: space[8],
  margin: 0,
  padding: `${space[12]} ${space[14]}`,
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.dangerSubtle,
  color: vars.color.danger,
  fontSize: fontSize[14],
  lineHeight: 1.55,
});

export const notice = style([
  alert,
  {
    backgroundColor: vars.color.infoSubtle,
    color: vars.color.info,
  },
]);

export const alertIcon = style({
  flexShrink: 0,
  width: '18px',
  height: '18px',
  marginTop: space[2],
});

export const actions = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[10],
});
