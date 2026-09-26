import { style } from '@vanilla-extract/css';
import {
  fontSize,
  fontWeight,
  layout,
  mq,
  space,
  vars,
} from '@/design-system/tokens';

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[10],
  boxSizing: 'border-box',
  padding: space[18],
  borderRadius: vars.radius.xl,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surface,
});

/** 오른쪽 칸(xl 이상)에서는 테두리 없는 흰 카드 */
export const rail = style({
  gap: space[12],
  padding: space[20],
  border: 0,
  borderRadius: vars.radius['2xl'],
});

/** 모바일·태블릿: 글 안에 들어가요. */
export const inline = style({
  margin: `0 ${layout.gutter} ${space[12]}`,
  '@media': {
    [mq.md]: { margin: 0 },
  },
});

export const label = style({
  margin: 0,
  fontSize: fontSize[13],
  fontWeight: fontWeight.semibold,
  lineHeight: 1.5,
  color: vars.color.textTertiary,
});

export const price = style({
  margin: 0,
  fontSize: fontSize[24],
  fontWeight: fontWeight.extrabold,
  lineHeight: 1.3,
  letterSpacing: '-0.6px',
  color: vars.color.text,
});

export const title = style({
  margin: 0,
  fontSize: fontSize[17],
  fontWeight: fontWeight.bold,
  lineHeight: 1.45,
  color: vars.color.text,
});

export const description = style({
  margin: 0,
  fontSize: fontSize[13],
  lineHeight: 1.6,
  color: vars.color.textSecondary,
});

export const alert = style({
  margin: 0,
  fontSize: fontSize[13],
  lineHeight: 1.5,
  color: vars.color.danger,
});
