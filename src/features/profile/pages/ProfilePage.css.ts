import { style } from '@vanilla-extract/css';
import { mq, space } from '@/design-system/tokens';

/** 프로필 머리와 탭 내용을 세로로 쌓아요 (가운데 880px 틀은 PageLayout이 줘요). */
export const page = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[8],
  '@media': {
    [mq.md]: { gap: space[20] },
  },
});

export const panel = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[8],
  outline: 'none',
  '@media': {
    [mq.md]: { gap: space[16] },
  },
});
