import { globalStyle, style, type StyleRule } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../../tokens/theme.css';
import { focusRing } from '../../styles/utils.css';

const interactive = ':not(:disabled):not([aria-disabled="true"])';

const states = (hover: string, active: string): StyleRule => ({
  selectors: {
    [`&:hover${interactive}`]: { backgroundColor: hover },
    [`&:active${interactive}`]: { backgroundColor: active },
  },
});

const sizeSm = style({ width: '36px', height: '36px' });
const sizeMd = style({ width: '44px', height: '44px' });
const sizeLg = style({ width: '52px', height: '52px' });
const sizeXl = style({ width: '60px', height: '60px' });

globalStyle(`${sizeSm} svg`, { width: '18px', height: '18px', flexShrink: 0 });
globalStyle(`${sizeMd} svg`, { width: '22px', height: '22px', flexShrink: 0 });
globalStyle(`${sizeLg} svg`, { width: '22px', height: '22px', flexShrink: 0 });
globalStyle(`${sizeXl} svg`, { width: '28px', height: '28px', flexShrink: 0 });

export const iconButtonStyles = recipe({
  base: [
    focusRing,
    {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
      border: '1px solid transparent',
      textDecoration: 'none',
      cursor: 'pointer',
      WebkitTapHighlightColor: 'transparent',
      transition: 'background-color 120ms ease, color 120ms ease',
      selectors: {
        '&:disabled, &[aria-disabled="true"]': {
          color: vars.color.textDisabled,
          cursor: 'not-allowed',
          opacity: 0.6,
        },
      },
    },
  ],
  variants: {
    variant: {
      /** 배경 없이 아이콘만 (상단 바, 목록 옵션) */
      ghost: [
        { backgroundColor: 'transparent', color: vars.color.textMuted },
        states(vars.color.surfaceSubtle, vars.color.border),
      ],
      /** 회색 테두리 (설정, 찜하기) */
      outline: [
        {
          backgroundColor: vars.color.surface,
          borderColor: vars.color.borderInput,
          color: vars.color.textMuted,
        },
        states(vars.color.surfaceSubtle, vars.color.border),
      ],
      /** 남색 채움 (챗봇, 보내기) */
      solid: [
        { backgroundColor: vars.color.brand, color: vars.color.textOnBrand },
        states(vars.color.brandHover, vars.color.brandActive),
      ],
      tonal: [
        { backgroundColor: vars.color.brandSubtle, color: vars.color.brand },
        states(vars.color.brandMuted, vars.color.brandBorder),
      ],
      /** 이미지 위에 올리는 흰 버튼 (표지 위 삭제) */
      overlay: [
        {
          backgroundColor: vars.color.surfaceTranslucent,
          color: vars.color.textSecondary,
          boxShadow: vars.shadow.overlay,
        },
        states(vars.color.surface, vars.color.surfaceSubtle),
      ],
    },
    size: {
      sm: sizeSm,
      md: sizeMd,
      lg: sizeLg,
      xl: sizeXl,
    },
    shape: {
      circle: { borderRadius: vars.radius.pill },
      rounded: { borderRadius: vars.radius.lg },
    },
    /** 떠 있는 버튼 그림자 (AI 챗봇 버튼) */
    elevated: {
      true: { boxShadow: vars.shadow.fab },
    },
  },
  defaultVariants: {
    variant: 'ghost',
    size: 'md',
    shape: 'circle',
  },
});

export type IconButtonVariants = NonNullable<
  RecipeVariants<typeof iconButtonStyles>
>;
