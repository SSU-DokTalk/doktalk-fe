import { style } from '@vanilla-extract/css';
import { vars } from '@/design-system/tokens';

export const mark = style({
  padding: '0 1px',
  borderRadius: '3px',
  backgroundColor: vars.color.brandMuted,
  color: 'inherit',
});
