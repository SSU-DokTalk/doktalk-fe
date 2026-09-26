import { keyframes, style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../../tokens/theme.css';
import { fontSize, mq, space } from '../../tokens/scale';

const spin = keyframes({
  to: { transform: 'rotate(360deg)' },
});

export const spinner = recipe({
  base: {
    display: 'inline-block',
    flexShrink: 0,
    boxSizing: 'border-box',
    borderRadius: vars.radius.pill,
    borderStyle: 'solid',
    animation: `${spin} 0.8s linear infinite`,
    '@media': {
      [mq.reducedMotion]: {
        animationDuration: '2.4s',
      },
    },
  },
  variants: {
    size: {
      sm: { width: '16px', height: '16px', borderWidth: '2px' },
      md: { width: '18px', height: '18px', borderWidth: '2px' },
      lg: { width: '28px', height: '28px', borderWidth: '3px' },
    },
    tone: {
      brand: {
        borderColor: vars.color.brandMuted,
        borderTopColor: vars.color.brand,
      },
      onBrand: {
        borderColor: 'rgba(255, 255, 255, 0.35)',
        borderTopColor: vars.color.textOnBrand,
      },
      current: {
        borderColor: 'currentColor',
        borderTopColor: 'transparent',
        opacity: 0.8,
      },
    },
  },
  defaultVariants: {
    size: 'md',
    tone: 'brand',
  },
});

export type SpinnerVariants = NonNullable<RecipeVariants<typeof spinner>>;

export const status = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: space[10],
});

export const labelText = style({
  fontFamily: vars.font.family,
  fontSize: fontSize[14],
  lineHeight: 1.5,
  color: vars.color.textTertiary,
});
