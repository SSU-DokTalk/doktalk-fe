import { style } from '@vanilla-extract/css';
import { mq, vars } from '@/design-system/tokens';

export const root = style({
  padding: '24px 20px',
  backgroundColor: vars.color.surface,
  '@media': {
    [mq.md]: { padding: '48px 32px', borderRadius: vars.radius['3xl'] },
  },
});
