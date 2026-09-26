import { style } from '@vanilla-extract/css';
import { fontSize, mq, space, vars } from '@/design-system/tokens';

export const page = style({
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',
  '@media': {
    [mq.belowMd]: { backgroundColor: vars.color.surface },
    [mq.md]: { gap: space[20] },
  },
});

/** 목록 화면과 달리 모바일에서도 설명을 보여줘요 (시안). */
export const subtitle = style({
  margin: 0,
  fontSize: fontSize[14],
  lineHeight: 1.6,
  color: vars.color.textTertiary,
  '@media': {
    [mq.md]: { fontSize: fontSize[15] },
  },
});

/** 모바일은 서재 첫 칸의 '책 담기'가 대신해요. */
export const searchLink = style({
  flexShrink: 0,
  '@media': {
    [mq.belowMd]: { display: 'none' },
  },
});
