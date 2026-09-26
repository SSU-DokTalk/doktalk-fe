import { style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  boxSizing: 'border-box',
  padding: '18px',
  borderRadius: vars.radius.xl,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surface,
});

/** 오른쪽 칸(xl 이상)에서는 테두리 없는 흰 카드 */
export const rail = style({
  gap: '12px',
  padding: '20px',
  border: 0,
  borderRadius: vars.radius['2xl'],
});

/** 모바일·태블릿: 글 안에 들어가요. */
export const inline = style({
  margin: '0 20px 12px',
  '@media': {
    [mq.md]: { margin: 0 },
  },
});

export const label = style({
  margin: 0,
  fontSize: fontSize.sm,
  fontWeight: 600,
  lineHeight: 1.5,
  color: vars.color.textTertiary,
});

export const price = style({
  margin: 0,
  fontSize: '1.5rem',
  fontWeight: 800,
  lineHeight: 1.3,
  letterSpacing: '-0.6px',
  color: vars.color.text,
});

export const title = style({
  margin: 0,
  fontSize: fontSize.xl,
  fontWeight: 700,
  lineHeight: 1.45,
  color: vars.color.text,
});

export const description = style({
  margin: 0,
  fontSize: fontSize.sm,
  lineHeight: 1.6,
  color: vars.color.textSecondary,
});

export const alert = style({
  margin: 0,
  fontSize: fontSize.sm,
  lineHeight: 1.5,
  color: vars.color.danger,
});
