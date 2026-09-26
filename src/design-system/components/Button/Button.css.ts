import { globalStyle, style, type StyleRule } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../../tokens/theme.css';
import { fontSize, fontWeight, space } from '../../tokens/scale';
import { focusRing } from '../../styles/utils.css';

const interactive = ':not(:disabled):not([aria-disabled="true"])';

/** 비활성·로딩이 아닐 때만 적용되는 hover/active 배경 */
const states = (hover: string, active: string): StyleRule => ({
  selectors: {
    [`&:hover${interactive}`]: { backgroundColor: hover },
    [`&:active${interactive}`]: { backgroundColor: active },
  },
});

const sizeSm = style({
  height: '36px',
  padding: `0 ${space[14]}`,
  gap: space[4],
  borderRadius: vars.radius.md,
  fontSize: fontSize[14],
  fontWeight: fontWeight.semibold,
});
const sizeMd = style({
  height: '44px',
  padding: `0 ${space[18]}`,
  gap: space[6],
  borderRadius: vars.radius.md,
  fontSize: fontSize[15],
  fontWeight: fontWeight.semibold,
});
const sizeLg = style({
  height: '52px',
  padding: `0 ${space[24]}`,
  gap: space[8],
  borderRadius: vars.radius.lg,
  fontSize: fontSize[16],
  fontWeight: fontWeight.bold,
});

// 아이콘 크기를 버튼 크기에 맞춰요. 기존 reset이 svg를 block으로 바꿔도 flex 안이라 괜찮아요.
globalStyle(`${sizeSm} svg`, { width: '16px', height: '16px', flexShrink: 0 });
globalStyle(`${sizeMd} svg`, { width: '18px', height: '18px', flexShrink: 0 });
globalStyle(`${sizeLg} svg`, { width: '20px', height: '20px', flexShrink: 0 });

/** 배경 없는 버튼은 비활성일 때도 배경 없이 글자만 흐리게 */
const transparentDisabled = {
  selectors: {
    '&:disabled:not([data-loading]), &[aria-disabled="true"]:not([data-loading])':
      { backgroundColor: 'transparent' },
  },
};

export const buttonStyles = recipe({
  base: [
    focusRing,
    {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      margin: 0,
      border: '1px solid transparent',
      fontFamily: vars.font.family,
      lineHeight: 1.2,
      letterSpacing: '-0.2px',
      textAlign: 'center',
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      cursor: 'pointer',
      userSelect: 'none',
      WebkitTapHighlightColor: 'transparent',
      transition:
        'background-color 120ms ease, border-color 120ms ease, color 120ms ease',
      selectors: {
        '&:disabled:not([data-loading]), &[aria-disabled="true"]:not([data-loading])':
          {
            backgroundColor: vars.color.disabled,
            borderColor: 'transparent',
            color: vars.color.textDisabled,
            cursor: 'not-allowed',
          },
        '&[data-loading]': {
          cursor: 'progress',
          opacity: 0.8,
        },
      },
    },
  ],
  variants: {
    variant: {
      /** 화면에서 가장 중요한 행동 하나 */
      primary: [
        {
          backgroundColor: vars.color.brand,
          color: vars.color.textOnBrand,
        },
        states(vars.color.brandHover, vars.color.brandActive),
      ],
      /** 흰 배경 + 회색 테두리 + 남색 글자 (도서 요약 보기, 서재로 가기) */
      secondary: [
        {
          backgroundColor: vars.color.surface,
          borderColor: vars.color.borderInput,
          color: vars.color.brand,
        },
        states(vars.color.brandSubtle, vars.color.brandMuted),
      ],
      /** 흰 배경 + 회색 테두리 + 기본 글자 (취소, 프로필 편집, 로그아웃) */
      neutral: [
        {
          backgroundColor: vars.color.surface,
          borderColor: vars.color.borderInput,
          color: vars.color.text,
        },
        states(vars.color.surfaceSubtle, vars.color.border),
      ],
      /** 남색 테두리 (팔로우, 본인인증 하기) */
      outline: [
        {
          backgroundColor: vars.color.surface,
          borderColor: vars.color.brand,
          color: vars.color.brand,
        },
        states(vars.color.brandSubtle, vars.color.brandMuted),
      ],
      /** 연한 남색 배경 (이어 읽기, 서재에 담김) */
      tonal: [
        {
          backgroundColor: vars.color.brandSubtle,
          color: vars.color.brand,
        },
        states(vars.color.brandMuted, vars.color.brandBorder),
      ],
      /** 글자만 (더보기, 전체 보기) */
      ghost: [
        {
          backgroundColor: 'transparent',
          color: vars.color.brand,
        },
        states(vars.color.brandSubtle, vars.color.brandMuted),
        transparentDisabled,
      ],
      /** 글자만 회색 (좋아요·댓글·공유처럼 곁들이는 행동) */
      plain: [
        {
          backgroundColor: 'transparent',
          color: vars.color.textSecondary,
        },
        states(vars.color.surfaceSubtle, vars.color.border),
        transparentDisabled,
      ],
      /** 되돌리기 어려운 행동 (탈퇴하기) */
      danger: [
        {
          backgroundColor: vars.color.surface,
          borderColor: vars.color.dangerBorder,
          color: vars.color.danger,
        },
        states(vars.color.dangerSubtle, vars.color.dangerBorder),
      ],
      /** 글자만 빨간색 (삭제) */
      dangerGhost: [
        {
          backgroundColor: 'transparent',
          color: vars.color.danger,
        },
        states(vars.color.dangerSubtle, vars.color.dangerBorder),
        transparentDisabled,
      ],
    },
    size: {
      sm: sizeSm,
      md: sizeMd,
      lg: sizeLg,
    },
    fullWidth: {
      true: { width: '100%' },
    },
    /**
     * 좁은 칸에서 긴 이름(몽골어)을 두 줄로 내려요. 높이는 크기만큼을 최소로 두고,
     * 옆 여백을 줄여 한 줄에 더 들어가게 해요.
     */
    wrap: {
      true: { height: 'auto', whiteSpace: 'normal', lineHeight: 1.3 },
    },
  },
  compoundVariants: [
    {
      variants: { wrap: true, size: 'sm' },
      style: { minHeight: '36px', padding: `${space[6]} ${space[8]}` },
    },
    {
      variants: { wrap: true, size: 'md' },
      style: { minHeight: '44px', padding: `${space[8]} ${space[12]}` },
    },
    {
      variants: { wrap: true, size: 'lg' },
      style: { minHeight: '52px', padding: `${space[10]} ${space[16]}` },
    },
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export type ButtonVariants = NonNullable<RecipeVariants<typeof buttonStyles>>;
