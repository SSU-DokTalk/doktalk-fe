import { style } from '@vanilla-extract/css';
import {
  fontSize,
  fontWeight,
  mq,
  space,
  typeScale,
  vars,
} from '@/design-system/tokens';

export const list = style({
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

/**
 * 다가오는 모임 한 줄.
 * 모바일: [날짜 | 내용] 아래에 링크 버튼 / 데스크톱: [날짜 | 내용 | 버튼]
 */
export const upcoming = style({
  display: 'grid',
  gridTemplateColumns: '60px minmax(0, 1fr)',
  gridTemplateAreas: '"date body" "action action"',
  alignItems: 'start',
  columnGap: space[14],
  rowGap: space[12],
  padding: `${space[14]} 0 ${space[16]}`,
  borderTop: `1px solid ${vars.color.borderSubtle}`,
  '@media': {
    [mq.md]: {
      gridTemplateColumns: '72px minmax(0, 1fr) auto',
      gridTemplateAreas: '"date body action"',
      alignItems: 'center',
      columnGap: space[18],
      padding: `${space[16]} 0`,
    },
  },
});

/** 날짜 칸 자리 (모양은 MeetingParts) */
export const dateArea = style({
  gridArea: 'date',
});

export const body = style({
  gridArea: 'body',
  display: 'flex',
  flexDirection: 'column',
  // 제목과 정보 줄을 촘촘하게 붙여요 (토큰 사이 값).
  gap: '3px',
  minWidth: 0,
  color: vars.color.text,
  textDecoration: 'none',
  borderRadius: vars.radius.sm,
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '4px',
    },
  },
  '@media': {
    [mq.md]: { gap: space[4] },
  },
});

export const badges = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[8],
});

export const dday = style({
  fontSize: fontSize[13],
  fontWeight: fontWeight.semibold,
  color: vars.color.info,
});

export const title = style({
  ...typeScale.cardTitleSm,

  selectors: {
    [`${body}:hover &`]: { color: vars.color.brand },
  },
  '@media': {
    [mq.md]: { fontSize: fontSize[17] },
  },
});

export const meta = style({
  ...typeScale.caption,

  color: vars.color.textTertiary,
  '@media': {
    [mq.md]: { fontSize: fontSize[14] },
  },
});

export const action = style({
  gridArea: 'action',
  '@media': {
    [mq.belowMd]: { width: '100%' },
  },
});

/** 지난 모임 한 줄 (표지 · 제목 · 역할) */
export const past = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[14],
  padding: `${space[12]} 0`,
  borderTop: `1px solid ${vars.color.borderSubtle}`,
  color: vars.color.text,
  textDecoration: 'none',
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '-2px',
      borderRadius: vars.radius.sm,
    },
  },
  '@media': {
    [mq.md]: { gap: space[16], padding: `${space[14]} 0` },
  },
});

export const pastText = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[2],
  flex: '1 1 0',
  minWidth: 0,
});

export const pastTitle = style({
  fontSize: fontSize[15],
  fontWeight: fontWeight.semibold,
  lineHeight: 1.45,
  letterSpacing: '-0.3px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  selectors: {
    [`${past}:hover &`]: { color: vars.color.brand },
  },
  '@media': {
    [mq.md]: { fontSize: fontSize[16], whiteSpace: 'normal' },
  },
});

export const chevron = style({
  flexShrink: 0,
  width: '20px',
  height: '20px',
  color: vars.color.textDisabled,
});

export const empty = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: space[4],
  padding: `${space[14]} 0 ${space[16]}`,
  borderTop: `1px solid ${vars.color.borderSubtle}`,
});

export const emptyTitle = style({
  margin: 0,
  fontSize: fontSize[15],
  fontWeight: fontWeight.semibold,
  color: vars.color.textSecondary,
});

export const emptyDescription = style({
  margin: 0,
  fontSize: fontSize[14],
  color: vars.color.textTertiary,
});

export const emptyLink = style({
  marginTop: space[8],
});

export const notice = style({
  margin: 0,
  padding: `${space[10]} 0 ${space[14]}`,
  fontSize: fontSize[13],
  color: vars.color.danger,
});
