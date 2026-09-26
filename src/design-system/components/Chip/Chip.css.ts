import { globalStyle, style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../../tokens/theme.css';
import { fontSize } from '../../tokens/scale';
import { focusRing } from '../../styles/utils.css';

const chipBase = style([
  focusRing,
  {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    flexShrink: 0,
    boxSizing: 'border-box',
    margin: 0,
    border: `1px solid ${vars.color.border}`,
    borderRadius: vars.radius.pill,
    backgroundColor: vars.color.surface,
    color: vars.color.textMuted,
    fontFamily: vars.font.family,
    fontSize: fontSize.md,
    fontWeight: 500,
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
    transition:
      'background-color 120ms ease, border-color 120ms ease, color 120ms ease',
    selectors: {
      '&:hover:not([aria-pressed="true"]):not(:disabled)': {
        backgroundColor: vars.color.surfaceSubtle,
      },
      '&:disabled': {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
    },
  },
]);

globalStyle(`${chipBase} svg`, {
  width: '14px',
  height: '14px',
  flexShrink: 0,
});

export const chipStyles = recipe({
  base: chipBase,
  variants: {
    size: {
      sm: { height: '34px', padding: '0 14px' },
      md: { height: '40px', padding: '0 14px' },
      /** 모바일 터치 영역 44px */
      lg: { height: '44px', padding: '0 16px' },
    },
    selection: {
      /** 하나만 고르는 필터 (전체 / 카테고리) — 채움으로 표시 */
      single: {
        selectors: {
          '&[aria-pressed="true"]': {
            backgroundColor: vars.color.brand,
            borderColor: vars.color.brand,
            color: vars.color.textOnBrand,
            fontWeight: 600,
          },
        },
      },
      /** 여러 개 고르는 선택 (관심분야, 토론 카테고리) — 연한 배경 + 체크 */
      multi: {
        selectors: {
          '&[aria-pressed="true"]': {
            backgroundColor: vars.color.brandSubtle,
            borderColor: vars.color.brand,
            color: vars.color.brand,
            fontWeight: 700,
          },
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
    selection: 'single',
  },
});

export type ChipVariants = NonNullable<RecipeVariants<typeof chipStyles>>;

/** 라벨 옆 개수 (독서 토론 3) */
export const count = style({
  fontWeight: 500,
  color: vars.color.textTertiary,
  selectors: {
    [`${chipBase}[aria-pressed="true"] &`]: {
      color: 'inherit',
      opacity: 0.8,
    },
  },
});

export const group = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
});

/** 모바일에서 한 줄로 두고 옆으로 넘겨 보는 칩 목록 */
export const groupScroll = style({
  flexWrap: 'nowrap',
  overflowX: 'auto',
  scrollbarWidth: 'none',
  selectors: {
    '&::-webkit-scrollbar': { display: 'none' },
  },
});
