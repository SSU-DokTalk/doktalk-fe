import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../../tokens/theme.css';

export const card = recipe({
  base: {
    boxSizing: 'border-box',
    minWidth: 0,
    backgroundColor: vars.color.surface,
  },
  variants: {
    padding: {
      none: { padding: 0 },
      sm: { padding: '16px' },
      md: { padding: '20px' },
      lg: { padding: '24px' },
      xl: { padding: '32px' },
    },
    radius: {
      /** 카드 안의 작은 카드 */
      md: { borderRadius: vars.radius.xl },
      /** 기본 카드 */
      lg: { borderRadius: vars.radius['2xl'] },
      /** 패널·프로필 카드 */
      xl: { borderRadius: vars.radius['3xl'] },
      none: { borderRadius: 0 },
    },
    bordered: {
      true: { border: '1px solid #ECEEF2' },
    },
    elevated: {
      true: { boxShadow: vars.shadow.md },
    },
  },
  defaultVariants: {
    padding: 'md',
    radius: 'lg',
  },
});

export type CardVariants = NonNullable<RecipeVariants<typeof card>>;
