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

/** 모바일은 흰 띠(사이 8px 회색), 데스크톱은 둥근 흰 카드 */
export const card = style({
  backgroundColor: vars.color.surface,
  '@media': {
    [mq.md]: { borderRadius: vars.radius['2xl'] },
  },
});

/** 구역 좌우 안쪽 여백. '더보기' 줄은 이만큼 밖으로 늘려서 구분선을 끝까지 그어요. */
const inset = { mobile: layout.gutter, desktop: space[24] };

/** 제목이 있는 구역 (다가오는 모임, 지난 모임, 읽고 있는 책…) */
export const section = style([
  card,
  {
    display: 'flex',
    flexDirection: 'column',
    padding: `${space[16]} ${inset.mobile} ${space[4]}`,
    '@media': {
      [mq.md]: { padding: `${space[20]} ${inset.desktop} ${space[8]}` },
    },
  },
]);

export const sectionTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[6],
  margin: `0 0 ${space[4]}`,
  ...typeScale.sectionTitleSm,

  color: vars.color.text,
  '@media': {
    [mq.md]: { margin: `0 0 ${space[6]}`, fontSize: fontSize[17] },
  },
});

export const sectionCount = style({
  fontWeight: fontWeight.semibold,
  color: vars.color.textTertiary,
});

/** 목록 아래 '더보기' 줄 */
export const moreRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: space[2],
  minHeight: '48px',
  margin: `0 -${inset.mobile}`,
  borderTop: `1px solid ${vars.color.borderSubtle}`,
  '@media': {
    [mq.md]: { margin: `0 -${inset.desktop}` },
  },
});

export const state = style([
  card,
  {
    padding: `${space[8]} 0`,
  },
]);
