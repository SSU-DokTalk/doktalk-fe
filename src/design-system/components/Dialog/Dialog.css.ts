import { style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../../tokens/theme.css';
import { mq, zIndex } from '../../tokens/scale';

export const backdrop = style({
  position: 'fixed',
  inset: 0,
  zIndex: zIndex.overlay,
  backgroundColor: vars.color.overlay,
  transition: 'opacity 200ms ease',
  selectors: {
    '&[data-starting-style], &[data-ending-style]': { opacity: 0 },
  },
  '@media': {
    [mq.reducedMotion]: { transition: 'none' },
  },
});

export const popup = recipe({
  base: {
    position: 'fixed',
    zIndex: zIndex.overlay + 1,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: vars.color.surface,
    boxShadow: vars.shadow.dialog,
    fontFamily: vars.font.family,
    color: vars.color.text,
    outline: 'none',
    transition: 'opacity 200ms ease, transform 240ms ease',
    '@media': {
      [mq.reducedMotion]: { transition: 'none' },
    },
  },
  variants: {
    placement: {
      /** 가운데 모달 (게시글 작성, 결제, 프로필 편집) */
      center: {
        top: '50%',
        left: '50%',
        width: 'min(calc(100vw - 32px), var(--dialog-width, 520px))',
        maxHeight: 'calc(100dvh - 64px)',
        borderRadius: vars.radius['3xl'],
        overflow: 'auto',
        transform: 'translate(-50%, -50%)',
        selectors: {
          '&[data-starting-style], &[data-ending-style]': {
            opacity: 0,
            transform: 'translate(-50%, -48%) scale(0.98)',
          },
        },
      },
      /** 아래에서 올라오는 시트 (모바일 결제, 챗봇) */
      bottom: {
        left: 0,
        right: 0,
        bottom: 0,
        maxHeight: '90dvh',
        paddingBottom: 'env(safe-area-inset-bottom)',
        borderRadius: `${vars.radius['3xl']} ${vars.radius['3xl']} 0 0`,
        overflow: 'auto',
        selectors: {
          '&[data-starting-style], &[data-ending-style]': {
            transform: 'translateY(100%)',
          },
        },
      },
      /** 오른쪽에서 나오는 서랍 (모바일 전체 메뉴) */
      right: {
        top: 0,
        right: 0,
        bottom: 0,
        width: 'min(86vw, 340px)',
        overflowY: 'auto',
        selectors: {
          '&[data-starting-style], &[data-ending-style]': {
            transform: 'translateX(100%)',
          },
        },
      },
    },
  },
  defaultVariants: {
    placement: 'center',
  },
});

export type DialogPopupVariants = NonNullable<RecipeVariants<typeof popup>>;

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px',
  flexShrink: 0,
  minHeight: '64px',
  padding: '0 12px 0 24px',
});

export const headerDivider = style({
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
});

export const title = style({
  margin: 0,
  fontSize: '1.125rem',
  fontWeight: 700,
  lineHeight: 1.4,
  letterSpacing: '-0.4px',
});

export const body = style({
  flex: '1 1 auto',
  padding: '24px',
});

export const footer = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '8px',
  flexShrink: 0,
  padding: '16px 24px 24px',
  borderTop: `1px solid ${vars.color.borderSubtle}`,
});
