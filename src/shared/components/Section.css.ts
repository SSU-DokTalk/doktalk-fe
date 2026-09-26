import { style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

/** 모바일은 흰 띠(사이 8px 회색), 데스크톱은 둥근 흰 카드 */
export const card = style({
  backgroundColor: vars.color.surface,
  '@media': {
    [mq.md]: { borderRadius: vars.radius['2xl'] },
  },
});

/** 제목이 있는 구역 (다가오는 모임, 지난 모임, 읽고 있는 책…) */
export const section = style([
  card,
  {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 20px 4px',
    '@media': {
      [mq.md]: { padding: '20px 24px 8px' },
    },
  },
]);

export const sectionTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  margin: '0 0 4px',
  fontSize: fontSize.lg,
  fontWeight: 700,
  lineHeight: 1.5,
  color: vars.color.text,
  '@media': {
    [mq.md]: { margin: '0 0 6px', fontSize: fontSize.xl },
  },
});

export const sectionCount = style({
  fontWeight: 600,
  color: vars.color.textTertiary,
});

/** 목록 아래 '더보기' 줄 */
export const moreRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2px',
  minHeight: '48px',
  margin: '0 -20px',
  borderTop: `1px solid ${vars.color.borderSubtle}`,
  '@media': {
    [mq.md]: { margin: '0 -24px' },
  },
});

export const state = style([
  card,
  {
    padding: '8px 0',
  },
]);
