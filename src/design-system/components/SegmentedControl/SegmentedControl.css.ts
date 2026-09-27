import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../../tokens/theme.css';
import { fontSize, fontWeight, space } from '../../tokens/scale';

export const root = recipe({
  base: {
    display: 'inline-flex',
    gap: space[2],
    maxWidth: '100%',
    boxSizing: 'border-box',
  },
  variants: {
    size: {
      // 작은 트랙은 여백 3px, 모서리 11px (안쪽 알약 8px + 여백 3px)
      sm: { padding: '3px', borderRadius: '11px' },
      md: { padding: space[4], borderRadius: vars.radius.lg },
    },
    /** 흰 카드 위에서는 surface, 회색 페이지 위에서는 canvas */
    on: {
      surface: { backgroundColor: vars.color.surfaceSubtle },
      canvas: { backgroundColor: vars.color.canvasInset },
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
    paddingBlock: space[4],
    border: 0,
    backgroundColor: 'transparent',
    color: vars.color.textSecondary,
    fontFamily: vars.font.family,
    fontWeight: fontWeight.medium,
    lineHeight: 1.2,
    textWrap: 'balance',
    cursor: 'pointer',
    transition: 'background-color 120ms ease, color 120ms ease',
    selectors: {
      '&:hover:not([data-pressed])': { color: vars.color.text },
      '&[data-pressed]': {
        backgroundColor: vars.color.surface,
        color: vars.color.brand,
        fontWeight: fontWeight.semibold,
        boxShadow: vars.shadow.xs,
      },
      '&:focus-visible': {
        outline: `2px solid ${vars.color.brand}`,
        outlineOffset: '1px',
      },
    },
  },
  variants: {
    size: {
      sm: {
        paddingInline: '11px',
        borderRadius: vars.radius.sm,
        fontSize: fontSize[13],
      },
      md: {
        paddingInline: space[14],
        // 트랙 모서리(12px)보다 조금 작게. Tabs의 segmented 알약과 같은 값이에요.
        borderRadius: '9px',
        fontSize: fontSize[14],
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
