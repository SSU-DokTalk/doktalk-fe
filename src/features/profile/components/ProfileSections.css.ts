import { style } from '@vanilla-extract/css';
import {
  fontSize,
  fontWeight,
  layout,
  mq,
  space,
  typeScale,
  vars,
} from '@/design-system/tokens';
import { card } from '@/shared/components/Section.css';

/** 쓰기·만들기 안내 카드 */
export const prompt = style([
  card,
  {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: space[12],
    padding: `${space[16]} ${layout.gutter}`,
    '@media': {
      [mq.md]: { gap: space[16], padding: `${space[20]} ${space[24]}` },
    },
  },
]);

export const promptIcon = style({
  display: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '48px',
  height: '48px',
  borderRadius: vars.radius.tile,
  backgroundColor: vars.color.brandSubtle,
  color: vars.color.brand,
  '@media': {
    [mq.md]: { display: 'flex' },
  },
});

/** 버튼이 길면 설명이 너무 좁아지기 전에 버튼이 다음 줄로 내려가요. */
export const promptText = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[2],
  flex: '1 1 180px',
  minWidth: 0,
});

export const promptTitle = style({
  margin: 0,
  fontSize: fontSize[15],
  fontWeight: fontWeight.bold,
  lineHeight: 1.5,
  color: vars.color.text,
  '@media': {
    [mq.md]: { fontSize: fontSize[16] },
  },
});

export const promptDescription = style({
  margin: 0,
  ...typeScale.caption,
  color: vars.color.textTertiary,
  '@media': {
    [mq.md]: { fontSize: fontSize[14] },
  },
});

export const promptAction = style({
  flexShrink: 0,
});

export const fullLabel = style({
  '@media': {
    [mq.belowMd]: { display: 'none' },
  },
});

export const shortLabel = style({
  '@media': {
    [mq.md]: { display: 'none' },
  },
});

/** 게시글 쓰기 줄. 탭 사이 간격이 이미 있어서 모바일 회색 띠를 빼요. */
export const flatPrompt = style({
  border: 0,
});
