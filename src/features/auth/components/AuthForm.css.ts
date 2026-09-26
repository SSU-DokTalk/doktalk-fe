import { style } from '@vanilla-extract/css';
import { fontSize, vars } from '@/design-system/tokens';

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  margin: 0,
});

export const wideForm = style({
  gap: '20px',
});

export const alert = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '8px',
  margin: 0,
  padding: '12px 14px',
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.dangerSubtle,
  color: vars.color.danger,
  fontSize: fontSize.md,
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
  marginTop: '2px',
});

export const actions = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});
