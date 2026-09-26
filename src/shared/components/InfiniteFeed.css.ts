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
