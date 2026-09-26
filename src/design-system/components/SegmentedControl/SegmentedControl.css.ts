import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../../tokens/theme.css';
import { fontSize } from '../../tokens/scale';

export const root = recipe({
  base: {
    display: 'inline-flex',
    gap: '2px',
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

export const item = recipe({
  base: {
    flex: '1 0 auto',
    height: '34px',
    margin: 0,
    border: 0,
    backgroundColor: 'transparent',
    color: vars.color.textSecondary,
    fontFamily: vars.font.family,
    fontWeight: 500,
    lineHeight: 1,
    whiteSpace: 'nowrap',
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
      sm: { padding: '0 11px', borderRadius: '8px', fontSize: fontSize.sm },
      md: { padding: '0 14px', borderRadius: '9px', fontSize: fontSize.md },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
