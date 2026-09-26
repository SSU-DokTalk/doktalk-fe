import { style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

/* 상세 화면 본문 (요약·게시글): 제목 묶음, 본문 글자 */

export const heading = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '16px 20px 0',
  '@media': {
    [mq.md]: { padding: 0 },
  },
});

export const badges = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
});

export const title = style({
  margin: 0,
  fontSize: '1.375rem',
  fontWeight: 700,
  lineHeight: 1.4,
  letterSpacing: '-0.6px',
  color: vars.color.text,
  overflowWrap: 'anywhere',
  '@media': {
    [mq.md]: {
      fontSize: '1.875rem',
      lineHeight: 1.35,
      letterSpacing: '-0.9px',
    },
  },
});

export const body = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  padding: '20px 20px 8px',
  '@media': {
    [mq.md]: { padding: 0 },
  },
});

export const text = style({
  margin: 0,
  fontSize: fontSize.lg,
  lineHeight: 1.8,
  color: vars.color.textBody,
  whiteSpace: 'pre-wrap',
  overflowWrap: 'anywhere',
  '@media': {
    [mq.md]: { fontSize: fontSize.xl, lineHeight: 1.85 },
  },
});
