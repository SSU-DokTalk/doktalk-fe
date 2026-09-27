import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../../tokens/theme.css';
import { space } from '../../tokens/scale';

export const card = recipe({
  base: {
    boxSizing: 'border-box',
    minWidth: 0,
    backgroundColor: vars.color.surface,
  },
  variants: {
    padding: {
      none: { padding: 0 },
      sm: { padding: space[16] },
      md: { padding: space[20] },
      lg: { padding: space[24] },
      xl: { padding: space[32] },
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
      true: { border: `1px solid ${vars.color.borderSubtle}` },
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
