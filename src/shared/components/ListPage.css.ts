import { style } from '@vanilla-extract/css';
import {
  fontSize,
  fontWeight,
  layout,
  mq,
  space,
  vars,
} from '@/design-system/tokens';

/** 모바일은 흰 바탕에 구역을 회색 띠로 나누고, 데스크톱은 회색 바탕 위 흰 카드로 나눠요. */
export const page = style({
  backgroundColor: vars.color.surface,
  // 한국어를 어절 단위로 줄바꿈하고, 긴 영문·URL은 칸 안에서 끊어요.
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',
  '@media': {
    [mq.md]: { backgroundColor: 'transparent' },
    [mq.xl]: {
      display: 'grid',
      gridTemplateColumns: `minmax(0, 1fr) ${layout.railWidth}`,
      alignItems: 'start',
      gap: space[24],
    },
  },
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
  '@media': {
    [mq.md]: { gap: space[20] },
  },
});

/** 제목과 만들기 버튼이 한 줄에 안 들어가면(몽골어) 버튼이 제목 아래로 내려가요. */
export const header = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: space[12],
  padding: `${space[16]} ${layout.gutter} ${space[4]}`,
  '@media': {
    [mq.md]: { alignItems: 'flex-end', gap: space[16], padding: 0 },
  },
});

export const titles = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[4],
  minWidth: 0,
});

export const title = style({
  margin: 0,
  fontSize: fontSize[22],
  fontWeight: fontWeight.bold,
  lineHeight: 1.4,
  letterSpacing: '-0.6px',
  color: vars.color.text,
  '@media': {
    [mq.md]: { fontSize: fontSize[26], letterSpacing: '-0.7px' },
  },
});

export const subtitle = style({
  display: 'none',
  margin: 0,
  fontSize: fontSize[15],
  lineHeight: 1.6,
  color: vars.color.textTertiary,
  '@media': {
    [mq.md]: { display: 'block' },
  },
});

export const createLink = style({
  flexShrink: 0,
});

export const rail = style({
  position: 'sticky',
  top: layout.stickyTop,
});
