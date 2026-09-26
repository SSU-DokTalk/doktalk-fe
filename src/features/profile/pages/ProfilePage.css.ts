import { style } from '@vanilla-extract/css';
import { mq } from '@/design-system/tokens';

/** 프로필 머리와 탭 내용을 세로로 쌓아요 (가운데 880px 틀은 PageLayout이 줘요). */
export const page = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  '@media': {
    [mq.md]: { gap: '20px' },
  },
});

export const panel = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  outline: 'none',
  '@media': {
    [mq.md]: { gap: '16px' },
  },
});
