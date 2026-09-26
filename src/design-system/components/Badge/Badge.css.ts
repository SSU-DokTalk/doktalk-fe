import { globalStyle, style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../../tokens/theme.css';
import { fontSize } from '../../tokens/scale';

const badgeBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  flexShrink: 0,
  // grid·세로 flex 안에서도 늘어나지 않고 글자 폭만큼만 차지해요.
  width: 'fit-content',
  boxSizing: 'border-box',
  border: '1px solid transparent',
  fontFamily: vars.font.family,
  fontWeight: 700,
  lineHeight: 1,
  whiteSpace: 'nowrap',
});

globalStyle(`${badgeBase} svg`, {
  width: '13px',
  height: '13px',
  flexShrink: 0,
});

export const badgeStyles = recipe({
  base: badgeBase,
  variants: {
    tone: {
      /** 무료·카테고리·온라인 */
      info: { backgroundColor: vars.color.infoSubtle, color: vars.color.info },
      /** 구매한 요약·참여 중 */
      brand: {
        backgroundColor: vars.color.brandSubtle,
        color: vars.color.brand,
      },
      /** 주최 */
      solid: {
        backgroundColor: vars.color.brand,
        color: vars.color.textOnBrand,
      },
      /** 지난 모임의 역할처럼 강조가 필요 없는 정보 */
      neutral: {
        backgroundColor: vars.color.surfaceSubtle,
        color: vars.color.textSecondary,
      },
      /** 결제 취소 */
      danger: {
        backgroundColor: vars.color.surface,
        borderColor: vars.color.dangerBorder,
        color: vars.color.danger,
      },
      /** 표지·사진 위 */
      overlay: {
        backgroundColor: 'rgba(255, 255, 255, 0.94)',
        color: vars.color.text,
        fontWeight: 600,
      },
    },
    size: {
      sm: { height: '22px', padding: '0 7px', fontSize: fontSize.xs },
      md: { height: '26px', padding: '0 10px', fontSize: fontSize.xs },
      lg: { height: '28px', padding: '0 10px', fontSize: fontSize.sm },
    },
    shape: {
      rounded: { borderRadius: vars.radius.xs },
      pill: { borderRadius: vars.radius.pill },
    },
  },
  defaultVariants: {
    tone: 'info',
    size: 'sm',
    shape: 'rounded',
  },
});

export type BadgeVariants = NonNullable<RecipeVariants<typeof badgeStyles>>;
