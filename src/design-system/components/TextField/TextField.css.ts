import { globalStyle, style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../../tokens/theme.css';
import { fontSize } from '../../tokens/scale';

export const field = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  minWidth: 0,
});

export const label = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontFamily: vars.font.family,
  fontSize: fontSize.md,
  fontWeight: 600,
  lineHeight: 1.5,
  color: vars.color.text,
});

const controlBase = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  boxSizing: 'border-box',
  minWidth: 0,
  border: `1px solid ${vars.color.borderInput}`,
  backgroundColor: vars.color.surface,
  color: vars.color.textTertiary,
  transition: 'border-color 120ms ease, box-shadow 120ms ease',
  selectors: {
    // 테두리를 2px로 키우지 않고 box-shadow로 그려서 글자가 밀리지 않아요.
    '&:focus-within': {
      borderColor: vars.color.brand,
      boxShadow: `0 0 0 1px ${vars.color.brand}, ${vars.shadow.focus}`,
    },
    '&[data-invalid]': {
      borderColor: vars.color.danger,
      boxShadow: `0 0 0 1px ${vars.color.danger}`,
    },
    '&[data-disabled]': {
      backgroundColor: vars.color.surfaceSubtle,
      cursor: 'not-allowed',
    },
  },
});

globalStyle(`${controlBase} > svg`, {
  width: '18px',
  height: '18px',
  flexShrink: 0,
});

export const control = recipe({
  base: controlBase,
  variants: {
    size: {
      sm: { height: '44px', padding: '0 12px', borderRadius: vars.radius.md },
      md: { height: '48px', padding: '0 14px', borderRadius: vars.radius.lg },
      lg: { height: '52px', padding: '0 16px', borderRadius: vars.radius.lg },
    },
    variant: {
      outlined: {},
      /** 회색 배경 검색창 (상단 내비, 통합 검색) */
      filled: {
        backgroundColor: vars.color.surfaceSubtle,
        borderColor: 'transparent',
        selectors: {
          '&:focus-within': { backgroundColor: vars.color.surface },
        },
      },
    },
    /** 오른쪽에 버튼(비밀번호 보기, 지우기)이 있을 때 여백을 줄여요 */
    hasEnd: {
      true: { paddingRight: '4px' },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'outlined',
  },
});

export type ControlVariants = NonNullable<RecipeVariants<typeof control>>;

export const input = style({
  flex: '1 1 0',
  minWidth: 0,
  height: '100%',
  margin: 0,
  padding: 0,
  border: 0,
  outline: 'none',
  background: 'transparent',
  fontFamily: vars.font.family,
  // iOS Safari는 16px보다 작은 입력칸에 포커스하면 화면을 확대해서 px로 고정했어요.
  fontSize: '16px',
  lineHeight: 1.5,
  color: vars.color.text,
  selectors: {
    '&::placeholder': { color: vars.color.textTertiary, opacity: 1 },
    '&:disabled': { cursor: 'not-allowed', color: vars.color.textSecondary },
  },
});

export const textareaControl = style([
  controlBase,
  {
    alignItems: 'stretch',
    padding: '12px 14px',
    borderRadius: vars.radius.lg,
  },
]);

export const textarea = style([
  input,
  {
    height: 'auto',
    minHeight: '120px',
    resize: 'vertical',
    lineHeight: 1.65,
  },
]);

export const helper = style({
  margin: 0,
  fontFamily: vars.font.family,
  fontSize: fontSize.sm,
  lineHeight: 1.5,
  color: vars.color.textTertiary,
});

export const error = style([
  helper,
  {
    color: vars.color.danger,
  },
]);
