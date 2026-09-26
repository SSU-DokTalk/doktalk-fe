import { style } from '@vanilla-extract/css';
import { layout, mq, space, vars } from '@/design-system/tokens';

export const root = style({
  padding: `${space[24]} ${layout.gutter}`,
  backgroundColor: vars.color.surface,
  '@media': {
    [mq.md]: {
      padding: `${space[48]} ${space[32]}`,
      borderRadius: vars.radius['3xl'],
    },
  },
});
