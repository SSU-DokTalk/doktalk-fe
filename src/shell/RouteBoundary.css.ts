import { keyframes, style } from '@vanilla-extract/css';
import { mq, vars } from '@/design-system/tokens';

const appear = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const loading = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '60vh',
  paddingTop: '120px',
  // 0.3초 안에 끝나는 로딩은 보이지 않게 해요.
  animation: `${appear} 150ms ease-out 300ms both`,
  '@media': {
    [mq.reducedMotion]: { animationDuration: '1ms' },
  },
});

export const error = style({
  padding: '64px 20px',
  '@media': {
    [mq.md]: { padding: '96px 0' },
  },
});

/** 셸 밖 화면(로그인·회원가입)에서는 화면 가운데에 둬요. */
export const fullPage = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100dvh',
  padding: '24px 20px',
  backgroundColor: vars.color.canvas,
});
