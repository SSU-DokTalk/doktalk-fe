import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../../tokens/theme.css';
import { fontSize } from '../../tokens/scale';

export const root = recipe({
  base: {
    display: 'inline-flex',
    gap: '2px',
    maxWidth: '100%',
    boxSizing: 'border-box',
  },
  variants: {
    size: {
      sm: { padding: '3px', borderRadius: '11px' },
      md: { padding: '4px', borderRadius: vars.radius.lg },
    },
    /** 흰 카드 위에서는 surface, 회색 페이지 위에서는 canvas */
    on: {
      surface: { backgroundColor: vars.color.surfaceSubtle },
      canvas: { backgroundColor: '#E9EAF0' },
    },
    fullWidth: {
      true: { display: 'flex', width: '100%' },
    },
  },
  defaultVariants: {
    size: 'md',
    on: 'surface',
  },
});

export type SegmentedControlVariants = NonNullable<RecipeVariants<typeof root>>;

/**
 * 자리가 모자라면 항목이 줄어들고 글자가 띄어쓰기에서 두 줄로 나뉘어요 (긴 몽골어 정렬 이름).
 * 가장 긴 단어보다 좁아지지는 않아서 단어 중간이 끊기지 않아요.
 */
export const item = recipe({
  base: {
    flex: '1 1 auto',
    minHeight: '34px',
    margin: 0,
    paddingBlock: '4px',
    border: 0,
    backgroundColor: 'transparent',
    color: vars.color.textSecondary,
    fontFamily: vars.font.family,
    fontWeight: 500,
    lineHeight: 1.2,
    textWrap: 'balance',
    cursor: 'pointer',
    transition: 'background-color 120ms ease, color 120ms ease',
    selectors: {
      '&:hover:not([data-pressed])': { color: vars.color.text },
      '&[data-pressed]': {
        backgroundColor: vars.color.surface,
        color: vars.color.brand,
        fontWeight: 600,
        boxShadow: '0 1px 3px rgba(17, 24, 39, 0.1)',
      },
      '&:focus-visible': {
        outline: `2px solid ${vars.color.brand}`,
        outlineOffset: '1px',
      },
    },
  },
  variants: {
    size: {
      sm: { paddingInline: '11px', borderRadius: '8px', fontSize: fontSize.sm },
      md: { paddingInline: '14px', borderRadius: '9px', fontSize: fontSize.md },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
