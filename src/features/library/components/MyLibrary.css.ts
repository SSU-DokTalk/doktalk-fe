import { style } from '@vanilla-extract/css';
import { layout, mq, space, vars } from '@/design-system/tokens';

/** 모바일에서 책·요약을 나누는 알약 탭 줄 */
export const tabsBar = style({
  padding: `${space[12]} ${layout.gutter} ${space[4]}`,
  backgroundColor: vars.color.surface,
  '@media': {
    [mq.md]: { display: 'none' },
  },
});

export const stack = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[8],
  '@media': {
    [mq.md]: { gap: space[16] },
  },
});
