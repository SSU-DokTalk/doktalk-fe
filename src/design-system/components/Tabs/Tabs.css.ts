import { style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../../tokens/theme.css';
import { fontSize } from '../../tokens/scale';

export const list = recipe({
  base: {
    position: 'relative',
    display: 'flex',
    gap: '4px',
    boxSizing: 'border-box',
  },
  variants: {
    /** 탭이 폭을 똑같이 나눠 가져요 (모바일 2~3개 탭) */
    fill: {
      true: { gap: 0 },
    },
    /** 줄바꿈 없이 옆으로 넘겨 봐요 (모바일 마이페이지 5개 탭) */
    scroll: {
      true: {
        overflowX: 'auto',
        scrollbarWidth: 'none',
        selectors: { '&::-webkit-scrollbar': { display: 'none' } },
      },
    },
    divider: {
      true: { borderBottom: `1px solid ${vars.color.border}` },
    },
    /** 회색 틀 안의 흰 알약 (모바일 내 서재: 읽고 있는 책 / 요약) */
    segmented: {
      true: {
        display: 'grid',
        gridAutoColumns: 'minmax(0, 1fr)',
        gridAutoFlow: 'column',
        padding: '4px',
        borderRadius: vars.radius.lg,
        backgroundColor: vars.color.surfaceSubtle,
      },
    },
  },
});

export type TabsListVariants = NonNullable<RecipeVariants<typeof list>>;

export const tab = recipe({
  base: {
    flexShrink: 0,
    boxSizing: 'border-box',
    margin: 0,
    border: 0,
    background: 'transparent',
    color: vars.color.textSecondary,
    fontFamily: vars.font.family,
    fontWeight: 500,
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    transition: 'color 120ms ease',
    selectors: {
      '&:hover:not([data-active]):not([data-disabled])': {
        color: vars.color.text,
      },
      '&[data-active]': { color: vars.color.brand, fontWeight: 700 },
      '&[data-disabled]': {
        color: vars.color.textDisabled,
        cursor: 'not-allowed',
      },
      // 스크롤 목록 안에서 잘리지 않게 안쪽으로 그려요.
      '&:focus-visible': {
        outline: `2px solid ${vars.color.brand}`,
        outlineOffset: '-2px',
        borderRadius: vars.radius.sm,
      },
    },
  },
  variants: {
    size: {
      md: { height: '48px', padding: '0 12px', fontSize: fontSize.base },
      lg: { height: '56px', padding: '0 14px', fontSize: fontSize.lg },
    },
    fill: {
      true: { flex: '1 1 0' },
    },
    segmented: {
      true: {
        // 긴 이름(몽골어)은 두 줄로 내려요.
        height: 'auto',
        minHeight: '44px',
        padding: '4px 8px',
        whiteSpace: 'normal',
        textAlign: 'center',
        lineHeight: 1.3,
        borderRadius: '9px',
        selectors: {
          '&[data-active]': {
            backgroundColor: vars.color.surface,
            boxShadow: '0 1px 3px rgba(17, 24, 39, 0.1)',
          },
          '&:focus-visible': { outlineOffset: '1px' },
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const indicator = style({
  position: 'absolute',
  bottom: 0,
  left: 'var(--active-tab-left)',
  width: 'var(--active-tab-width)',
  height: '3px',
  backgroundColor: vars.color.brand,
  transition: 'left 200ms ease, width 200ms ease',
  '@media': {
    '(prefers-reduced-motion: reduce)': { transition: 'none' },
  },
});

export const panel = style({
  outline: 'none',
});
