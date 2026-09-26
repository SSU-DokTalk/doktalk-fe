import { globalStyle, style } from '@vanilla-extract/css';
import {
  fontSize,
  fontWeight,
  layout,
  mq,
  space,
  vars,
} from '@/design-system/tokens';

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[14],
  padding: space[20],
  borderTop: `8px solid ${vars.color.canvas}`,
  backgroundColor: vars.color.surface,
  // 상단 고정 내비에 제목이 가리지 않게 (#comments로 이동할 때)
  scrollMarginTop: layout.stickyTopMobile,
  '@media': {
    [mq.md]: {
      padding: `${space[24]} ${space[28]} ${space[20]}`,
      border: 0,
      borderRadius: vars.radius['3xl'],
      scrollMarginTop: layout.stickyTop,
    },
  },
});

export const heading = style({
  margin: 0,
  fontSize: fontSize[16],
  fontWeight: fontWeight.bold,
  lineHeight: 1.5,
  color: vars.color.text,
  '@media': {
    [mq.md]: { fontSize: fontSize[18] },
  },
});

export const composer = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: space[8],
  margin: 0,
});

export const composerField = style({
  flex: '1 1 0',
});

export const alert = style({
  margin: 0,
  fontSize: fontSize[13],
  lineHeight: 1.5,
  color: vars.color.danger,
});

export const loginPrompt = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: `${space[8]} ${space[12]}`,
  margin: 0,
  padding: `${space[12]} ${space[14]}`,
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.surfaceSubtle,
  fontSize: fontSize[14],
  color: vars.color.textSecondary,
});

export const status = style({
  margin: 0,
  padding: `${space[12]} 0`,
  fontSize: fontSize[14],
  color: vars.color.textTertiary,
});

export const list = style({
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const item = style({
  display: 'flex',
  gap: space[12],
  padding: `${space[14]} 0 ${space[4]}`,
  borderTop: `1px solid ${vars.color.borderSubtle}`,
});

export const body = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[4],
  flex: '1 1 0',
  minWidth: 0,
});

export const meta = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'baseline',
  gap: `0 ${space[8]}`,
  lineHeight: 1.5,
});

export const author = style({
  fontSize: fontSize[14],
  fontWeight: fontWeight.semibold,
  color: vars.color.text,
});

export const time = style({
  fontSize: fontSize[13],
  color: vars.color.textTertiary,
});

export const content = style({
  margin: 0,
  fontSize: fontSize[15],
  lineHeight: 1.6,
  color: vars.color.textBody,
  whiteSpace: 'pre-wrap',
  overflowWrap: 'anywhere',
});

export const replyButton = style({
  alignSelf: 'flex-start',
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '32px',
  padding: `0 ${space[2]}`,
  border: 0,
  borderRadius: vars.radius.xs,
  background: 'transparent',
  fontFamily: vars.font.family,
  fontSize: fontSize[13],
  fontWeight: fontWeight.semibold,
  color: vars.color.textTertiary,
  cursor: 'pointer',
  selectors: {
    '&:hover': { color: vars.color.text },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '2px',
    },
  },
});

/** 답글과 답글 입력칸은 아바타(32) + 간격(12)만큼 들여 써요. */
export const replyForm = style({
  padding: `${space[4]} 0 ${space[10]} ${space[44]}`,
});

export const replies = style({
  margin: `${space[4]} 0 0`,
  padding: `0 0 0 ${space[44]}`,
  listStyle: 'none',
});

globalStyle(`${replies} > li > ${item}`, {
  paddingTop: space[10],
});

export const more = style({
  marginTop: space[4],
});
