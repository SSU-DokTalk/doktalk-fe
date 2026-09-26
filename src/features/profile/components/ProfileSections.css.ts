import { style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';
import { card } from '@/shared/components/Section.css';

/** 쓰기·만들기 안내 카드 */
export const prompt = style([
  card,
  {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 20px',
    '@media': {
      [mq.md]: { gap: '16px', padding: '20px 24px' },
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
  borderRadius: '14px',
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
  gap: '2px',
  flex: '1 1 180px',
  minWidth: 0,
});

export const promptTitle = style({
  margin: 0,
  fontSize: fontSize.base,
  fontWeight: 700,
  lineHeight: 1.5,
  color: vars.color.text,
  '@media': {
    [mq.md]: { fontSize: fontSize.lg },
  },
});

export const promptDescription = style({
  margin: 0,
  fontSize: fontSize.sm,
  lineHeight: 1.5,
  color: vars.color.textTertiary,
  '@media': {
    [mq.md]: { fontSize: fontSize.md },
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
