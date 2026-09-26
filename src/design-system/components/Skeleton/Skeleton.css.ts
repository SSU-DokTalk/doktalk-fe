import { keyframes, style } from '@vanilla-extract/css';
import { vars } from '../../tokens/theme.css';
import { mq } from '../../tokens/scale';

const pulse = keyframes({
  '0%': { opacity: 1 },
  '50%': { opacity: 0.55 },
  '100%': { opacity: 1 },
});

export const skeleton = style({
  display: 'block',
  flexShrink: 0,
  backgroundColor: vars.color.skeleton,
  animation: `${pulse} 1.6s ease-in-out infinite`,
  '@media': {
    [mq.reducedMotion]: {
      animation: 'none',
    },
  },
});
