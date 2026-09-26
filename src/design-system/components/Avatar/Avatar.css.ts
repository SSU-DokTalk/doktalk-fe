import { style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../../tokens/theme.css';

export const avatar = recipe({
  base: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    overflow: 'hidden',
    borderRadius: vars.radius.pill,
    fontFamily: vars.font.family,
    fontWeight: 700,
    lineHeight: 1,
    userSelect: 'none',
  },
  variants: {
    tone: {
      navy: { backgroundColor: vars.color.brandMuted, color: vars.color.brand },
      steel: { backgroundColor: vars.color.infoSubtle, color: vars.color.info },
      gray: {
        backgroundColor: vars.color.border,
        color: vars.color.textMuted,
      },
    },
  },
  defaultVariants: {
    tone: 'navy',
  },
});

export type AvatarVariants = NonNullable<RecipeVariants<typeof avatar>>;

export const image = style({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  maxWidth: 'none',
  objectFit: 'cover',
});
