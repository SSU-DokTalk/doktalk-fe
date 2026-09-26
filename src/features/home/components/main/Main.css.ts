import { style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

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
      gridTemplateColumns: 'minmax(0, 1fr) 300px',
      alignItems: 'start',
      gap: '24px',
    },
  },
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  minWidth: 0,
  '@media': {
    [mq.md]: { gap: '24px' },
  },
});

export const rail = style({
  position: 'sticky',
  top: '96px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

/* ---------- 인사·다가오는 모임 ---------- */

export const welcome = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  padding: '20px',
  backgroundColor: vars.color.surface,
  '@media': {
    [mq.md]: { gap: '16px', padding: 0, backgroundColor: 'transparent' },
  },
});

export const greeting = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export const title = style({
  margin: 0,
  fontSize: '1.375rem',
  fontWeight: 700,
  lineHeight: 1.4,
  letterSpacing: '-0.6px',
  '@media': {
    [mq.md]: { fontSize: '1.5rem' },
  },
});

export const subtitle = style({
  margin: 0,
  fontSize: fontSize.md,
  lineHeight: 1.6,
  color: vars.color.textTertiary,
  '@media': {
    [mq.md]: { fontSize: fontSize.base },
  },
});

export const meetings = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gap: '10px',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  '@media': {
    [mq.md]: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '16px' },
  },
});

export const meeting = style({
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  height: '100%',
  boxSizing: 'border-box',
  padding: '12px',
  border: `1px solid ${vars.color.borderSubtle}`,
  borderRadius: vars.radius.xl,
  backgroundColor: vars.color.surface,
  '@media': {
    [mq.md]: { padding: '16px', border: 0, borderRadius: vars.radius['2xl'] },
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
  gap: '2px',
  minWidth: 0,
});

export const meetingTitle = style({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  fontSize: fontSize.base,
  fontWeight: 700,
  lineHeight: 1.4,
  color: vars.color.text,
  textDecoration: 'none',
  selectors: {
    '&:hover': { color: vars.color.brand, textDecoration: 'underline' },
  },
  '@media': {
    [mq.md]: { fontSize: fontSize.lg },
  },
});

export const meetingMeta = style({
  fontSize: fontSize.sm,
  color: vars.color.textTertiary,
});

export const allMeetings = style({
  alignSelf: 'flex-start',
});

/* ---------- 글쓰기 줄 ---------- */

export const flatPrompt = style({
  border: 0,
});

export const photoButton = style({
  flexShrink: 0,
});

/* ---------- 피드 ---------- */

export const feed = style({
  backgroundColor: vars.color.surface,
  '@media': {
    [mq.md]: { overflow: 'hidden', borderRadius: vars.radius['2xl'] },
  },
});

export const feedTabs = style({
  padding: '0 8px',
  '@media': {
    [mq.md]: { padding: '0 12px' },
  },
});

export const chips = style({
  padding: '14px 20px 6px',
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
  gap: '2px',
  minHeight: '52px',
  fontSize: fontSize.base,
  fontWeight: 600,
  color: vars.color.brand,
  textDecoration: 'none',
  selectors: {
    '&:hover': { textDecoration: 'underline' },
  },
});

export const moreIcon = style({ width: '18px', height: '18px' });

export const state = style({
  padding: '8px 0',
});

/** xl 아래에서는 오른쪽 칸 내용을 피드 아래에 둬요. */
export const below = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  '@media': {
    [mq.md]: { gap: '16px' },
  },
});
