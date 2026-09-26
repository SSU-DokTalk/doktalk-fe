import { style } from '@vanilla-extract/css';
import {
  fontSize,
  layout,
  mq,
  space,
  typeScale,
  vars,
} from '@/design-system/tokens';

/* 상세 화면 본문 (요약·게시글): 제목 묶음, 본문 글자 */

export const heading = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[12],
  padding: `${space[16]} ${layout.gutter} 0`,
  '@media': {
    [mq.md]: { padding: 0 },
  },
});

export const badges = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: space[6],
});

export const title = style({
  margin: 0,
  ...typeScale.heading,

  color: vars.color.text,
  overflowWrap: 'anywhere',
  '@media': {
    [mq.md]: {
      fontSize: fontSize[30],
      lineHeight: 1.35,
      letterSpacing: '-0.9px',
    },
  },
});

export const body = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[14],
  padding: `${space[20]} ${layout.gutter} ${space[8]}`,
  '@media': {
    [mq.md]: { padding: 0 },
  },
});

export const text = style({
  margin: 0,
  fontSize: fontSize[16],
  lineHeight: 1.8,
  color: vars.color.textBody,
  whiteSpace: 'pre-wrap',
  overflowWrap: 'anywhere',
  '@media': {
    [mq.md]: { fontSize: fontSize[17], lineHeight: 1.85 },
  },
});
