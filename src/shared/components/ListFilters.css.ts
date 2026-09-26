import { style } from '@vanilla-extract/css';
import { layout, mq, space, vars } from '@/design-system/tokens';

export const filters = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[12],
  padding: `${space[16]} 0 ${space[12]}`,
  borderTop: `8px solid ${vars.color.canvas}`,
  '@media': {
    [mq.md]: {
      gap: space[14],
      padding: `${space[16]} ${space[20]}`,
      border: 0,
      borderRadius: vars.radius['2xl'],
      backgroundColor: vars.color.surface,
    },
  },
});

/** 모바일에서 좌우 20px 여백. 칩 줄은 여백 안쪽에서 옆으로 넘겨요. */
const gutter = style({
  paddingLeft: layout.gutter,
  paddingRight: layout.gutter,
  '@media': {
    [mq.md]: { paddingLeft: 0, paddingRight: 0 },
  },
});

export const searchRow = style([
  gutter,
  {
    display: 'flex',
    gap: space[8],
    margin: 0,
  },
]);

/** 검색 기준은 글자 길이만큼, 최대 40%까지 */
export const searchBy = style({
  flex: '0 1 auto',
  maxWidth: '40%',
});

export const searchField = style({
  flex: '1 1 0',
});

export const chips = style([gutter, {}]);

export const sortRow = style([
  gutter,
  {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: space[8],
    '@media': {
      [mq.md]: {
        gap: space[12],
        paddingTop: space[14],
        borderTop: `1px solid ${vars.color.borderSubtle}`,
      },
    },
  },
]);

export const dateField = style({
  flex: '0 0 auto',
  width: '184px',
});
