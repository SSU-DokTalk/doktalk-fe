import { style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

/** 모바일은 흰 바탕에 구역을 회색 띠로 나누고, 데스크톱은 회색 바탕 위 흰 카드로 나눠요. */
export const page = style({
  backgroundColor: vars.color.surface,
  // 한국어를 어절 단위로 줄바꿈하고, 긴 영문·URL은 칸 안에서 끊어요.
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',
  '@media': {
    [mq.md]: { backgroundColor: 'transparent' },
    [mq.xl]: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr) 300px',
      alignItems: 'start',
      gap: '24px',
    },
  },
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
  '@media': {
    [mq.md]: { gap: '20px' },
  },
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  padding: '16px 20px 4px',
  '@media': {
    [mq.md]: { alignItems: 'flex-end', gap: '16px', padding: 0 },
  },
});

export const titles = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  minWidth: 0,
});

export const title = style({
  margin: 0,
  fontSize: '1.375rem',
  fontWeight: 700,
  lineHeight: 1.4,
  letterSpacing: '-0.6px',
  color: vars.color.text,
  '@media': {
    [mq.md]: { fontSize: '1.625rem', letterSpacing: '-0.7px' },
  },
});

export const subtitle = style({
  display: 'none',
  margin: 0,
  fontSize: fontSize.base,
  lineHeight: 1.6,
  color: vars.color.textTertiary,
  '@media': {
    [mq.md]: { display: 'block' },
  },
});

export const createLink = style({
  flexShrink: 0,
});

export const rail = style({
  position: 'sticky',
  top: '96px',
});
