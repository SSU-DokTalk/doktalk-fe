import { style } from '@vanilla-extract/css';
import { mq, vars } from '@/design-system/tokens';

/** 모바일에서 책·요약을 나누는 알약 탭 줄 */
export const tabsBar = style({
  padding: '12px 20px 4px',
  backgroundColor: vars.color.surface,
  '@media': {
    [mq.md]: { display: 'none' },
  },
});

export const stack = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  '@media': {
    [mq.md]: { gap: '16px' },
  },
});
