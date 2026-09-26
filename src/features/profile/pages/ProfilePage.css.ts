import { style } from '@vanilla-extract/css';
import { mq } from '@/design-system/tokens';

/**
 * 가운데 880px 틀 (왼쪽 칼럼 없음). 왼쪽 칼럼에도 내 프로필 카드가 있어서
 * 같은 카드가 두 번 나오지 않게 프로필 화면만 가운데로 모았어요.
 */
export const page = style({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
  maxWidth: '928px',
  margin: '0 auto',
  paddingBottom: '40px',
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',
  '@media': {
    [mq.md]: { gap: '20px', padding: '32px 24px 56px' },
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
