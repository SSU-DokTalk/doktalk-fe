import { globalStyle, style, type StyleRule } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../../tokens/theme.css';
import { fontSize, fontWeight, layout, mq, space } from '../../tokens/scale';
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
/** 입력칸(md, 48px) 옆에 나란히 두는 크기 */
const sizeLg = style({ width: '48px', height: '48px' });
/** 화면에 떠 있는 버튼 (AI 챗봇) */
const sizeFab = style({
  width: layout.fabSize,
  height: layout.fabSize,
  '@media': {
    [mq.md]: { width: layout.fabSizeDesktop, height: layout.fabSizeDesktop },
  },
});

globalStyle(`${sizeSm} svg`, { width: '18px', height: '18px', flexShrink: 0 });
globalStyle(`${sizeMd} svg`, { width: '22px', height: '22px', flexShrink: 0 });
globalStyle(`${sizeLg} svg`, { width: '22px', height: '22px', flexShrink: 0 });
globalStyle(`${sizeFab} svg`, { width: '26px', height: '26px', flexShrink: 0 });

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
      /** 남색 바탕 위 아이콘만 (챗봇 창 머리의 닫기) */
      onBrand: [
        {
          backgroundColor: 'transparent',
          color: vars.color.textOnBrand,
          selectors: {
            '&:focus-visible': {
              outline: `2px solid ${vars.color.textOnBrand}`,
              outlineOffset: '-4px',
            },
          },
        },
        states(vars.color.onBrandHover, vars.color.onBrandActive),
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
      fab: sizeFab,
    },
    shape: {
      circle: { borderRadius: vars.radius.pill },
      rounded: { borderRadius: vars.radius.lg },
    },
    /** 떠 있는 버튼 (AI 챗봇): 그림자, 굵은 포커스 링, 누르면 살짝 작아져요. */
    elevated: {
      true: {
        boxShadow: vars.shadow.fab,
        transition: 'background-color 120ms ease, transform 160ms ease',
        selectors: {
          '&:active': { transform: 'scale(0.96)' },
          '&:focus-visible': {
            outline: `3px solid ${vars.color.brand}`,
            outlineOffset: '3px',
          },
        },
        '@media': {
          [mq.reducedMotion]: { transition: 'none' },
        },
      },
    },
    /** 아이콘 옆에 짧은 글자를 같이 보여줄 때 (로그인 화면의 언어 버튼) */
    labelled: {
      true: {
        width: 'auto',
        gap: space[6],
        padding: `0 ${space[10]}`,
        fontFamily: vars.font.family,
        fontSize: fontSize[14],
        fontWeight: fontWeight.semibold,
      },
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
