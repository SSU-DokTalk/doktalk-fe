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

/**
 * 모바일은 회색 바탕에 흰 띠(사이 8px), 데스크톱은 흰 카드.
 * 넓은 화면(xl)에서는 오른쪽에 인기 요약·내 서재 칸이 붙어요.
 */
export const page = style({
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',
  '@media': {
    [mq.belowMd]: { backgroundColor: vars.color.canvas },
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
  gap: space[8],
  minWidth: 0,
  '@media': {
    [mq.md]: { gap: space[24] },
  },
});

export const rail = style({
  position: 'sticky',
  top: layout.stickyTop,
  display: 'flex',
  flexDirection: 'column',
  gap: space[16],
});

/* ---------- 인사·다가오는 모임 ---------- */

export const welcome = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[14],
  padding: space[20],
  backgroundColor: vars.color.surface,
  '@media': {
    [mq.md]: { gap: space[16], padding: 0, backgroundColor: 'transparent' },
  },
});

export const greeting = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[4],
});

export const title = style({
  margin: 0,
  ...typeScale.heading,
  '@media': {
    [mq.md]: { fontSize: fontSize[24] },
  },
});

export const subtitle = style({
  margin: 0,
  ...typeScale.bodySm,
  color: vars.color.textTertiary,
  '@media': {
    [mq.md]: { fontSize: fontSize[15] },
  },
});

export const meetings = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gap: space[10],
  margin: 0,
  padding: 0,
  listStyle: 'none',
  '@media': {
    [mq.md]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: space[16],
    },
  },
});

export const meeting = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[14],
  height: '100%',
  boxSizing: 'border-box',
  padding: space[12],
  border: `1px solid ${vars.color.borderSubtle}`,
  borderRadius: vars.radius.xl,
  backgroundColor: vars.color.surface,
  '@media': {
    [mq.md]: {
      padding: space[16],
      border: 0,
      borderRadius: vars.radius['2xl'],
    },
  },
});

export const meetingDate = style({
  width: '56px',
  '@media': {
    [mq.md]: { width: '64px' },
  },
});

export const meetingText = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: space[2],
  minWidth: 0,
});

export const meetingTitle = style({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  fontSize: fontSize[15],
  fontWeight: fontWeight.bold,
  lineHeight: 1.4,
  color: vars.color.text,
  textDecoration: 'none',
  selectors: {
    '&:hover': { color: vars.color.brand, textDecoration: 'underline' },
  },
  '@media': {
    [mq.md]: { fontSize: fontSize[16] },
  },
});

export const meetingMeta = style({
  fontSize: fontSize[13],
  color: vars.color.textTertiary,
});

export const allMeetings = style({
  alignSelf: 'flex-start',
});

/* ---------- 글쓰기 줄 ---------- */

/* ---------- 피드 ---------- */

export const feed = style({
  backgroundColor: vars.color.surface,
  '@media': {
    [mq.md]: { overflow: 'hidden', borderRadius: vars.radius['2xl'] },
  },
});

export const feedTabs = style({
  padding: `0 ${space[8]}`,
  '@media': {
    [mq.md]: { padding: `0 ${space[12]}` },
  },
});

export const chips = style({
  padding: `${space[14]} ${space[20]} ${space[6]}`,
});

export const items = style({
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const more = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: space[2],
  minHeight: '52px',
  fontSize: fontSize[15],
  fontWeight: fontWeight.semibold,
  color: vars.color.brand,
  textDecoration: 'none',
  selectors: {
    '&:hover': { textDecoration: 'underline' },
  },
});

export const moreIcon = style({ width: '18px', height: '18px' });

export const state = style({
  padding: `${space[8]} 0`,
});

/** xl 아래에서는 오른쪽 칸 내용을 피드 아래에 둬요. */
export const below = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[8],
  '@media': {
    [mq.md]: { gap: space[16] },
  },
});
