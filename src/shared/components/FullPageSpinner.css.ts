import { style } from '@vanilla-extract/css';
import { vars } from '@/design-system/tokens';

export const root = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100dvh',
  backgroundColor: vars.color.canvas,
});
