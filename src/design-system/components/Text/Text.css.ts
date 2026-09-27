import { style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../../tokens/theme.css';
import { fontWeight, typeScale } from '../../tokens/scale';

export const text = recipe({
  base: {
    margin: 0,
    fontFamily: vars.font.family,
  },
  variants: {
    variant: typeScale,
    tone: {
      default: { color: vars.color.text },
      body: { color: vars.color.textBody },
      muted: { color: vars.color.textMuted },
      secondary: { color: vars.color.textSecondary },
      tertiary: { color: vars.color.textTertiary },
      brand: { color: vars.color.brand },
      info: { color: vars.color.info },
      danger: { color: vars.color.danger },
      onBrand: { color: vars.color.textOnBrand },
      inherit: { color: 'inherit' },
    },
    weight: {
      regular: { fontWeight: fontWeight.regular },
      medium: { fontWeight: fontWeight.medium },
      semibold: { fontWeight: fontWeight.semibold },
      bold: { fontWeight: fontWeight.bold },
      heavy: { fontWeight: fontWeight.extrabold },
    },
    align: {
      start: { textAlign: 'start' },
      center: { textAlign: 'center' },
      end: { textAlign: 'end' },
    },
  },
  defaultVariants: {
    variant: 'body',
    tone: 'default',
  },
});

export type TextVariants = NonNullable<RecipeVariants<typeof text>>;

/** 줄 수 제한. 줄 수는 인라인 스타일(WebkitLineClamp)로 넘겨요. */
export const clamp = style({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

export const truncate = style({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});
