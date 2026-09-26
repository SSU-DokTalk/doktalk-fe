import { style } from '@vanilla-extract/css';
import { mq, vars } from '@/design-system/tokens';

export const list = style({
  borderTop: `1px solid ${vars.color.borderSubtle}`,
  transition: 'opacity 120ms ease',
  selectors: {
    // 조건을 바꾼 뒤 새 결과가 오기 전까지 이전 목록을 흐리게 보여줘요.
    '&[aria-busy="true"]': { opacity: 0.6 },
  },
  '@media': {
    [mq.md]: {
      overflow: 'hidden',
      border: 0,
      borderRadius: vars.radius['2xl'],
      backgroundColor: vars.color.surface,
    },
  },
});

export const items = style({
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const status = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '64px',
  padding: '12px 20px',
});

/** 글마다 따로 카드 (게시글 피드). 빈 목록·오류는 흰 카드 안에 보여줘요. */
export const cards = style({
  transition: 'opacity 120ms ease',
  selectors: {
    '&[aria-busy="true"]': { opacity: 0.6 },
  },
});

export const cardItems = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  '@media': {
    [mq.md]: { gap: '12px' },
  },
});

export const stateCard = style({
  backgroundColor: vars.color.surface,
  '@media': {
    [mq.md]: { borderRadius: vars.radius['2xl'] },
  },
});
