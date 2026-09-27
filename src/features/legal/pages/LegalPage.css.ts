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

/** 긴 글이라 한 줄이 너무 길지 않게 폭을 좁혀요. */
export const page = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[20],
  boxSizing: 'border-box',
  maxWidth: '760px',
  margin: '0 auto',
  padding: `${space[24]} ${layout.gutter} ${space[40]}`,
  backgroundColor: vars.color.surface,
  '@media': {
    [mq.md]: {
      padding: `${space[40]} ${space[48]} ${space[56]}`,
      borderRadius: vars.radius['3xl'],
    },
  },
});

export const header = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[6],
});

export const title = style({
  margin: 0,
  ...typeScale.pageTitle,
  color: vars.color.text,
});

export const effective = style({
  margin: 0,
  ...typeScale.caption,
  color: vars.color.textTertiary,
});

export const preface = style({
  margin: 0,
  ...typeScale.bodySm,
  lineHeight: 1.7,
  color: vars.color.textBody,
});

export const toc = style({
  padding: `${space[16]} ${space[20]}`,
  borderRadius: vars.radius.xl,
  backgroundColor: vars.color.canvas,
});

export const tocTitle = style({
  margin: `0 0 ${space[8]}`,
  ...typeScale.label,
  color: vars.color.text,
});

export const tocList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[4],
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const tocLink = style({
  display: 'inline-block',
  padding: `${space[2]} 0`,
  fontSize: fontSize[14],
  color: vars.color.textSecondary,
  textDecoration: 'none',
  selectors: {
    '&:hover': { color: vars.color.brand, textDecoration: 'underline' },
  },
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[10],
  // 목차에서 옮겨 왔을 때 위쪽 고정 내비에 가리지 않게요.
  scrollMarginTop: layout.stickyTop,
});

export const heading = style({
  margin: 0,
  ...typeScale.sectionTitleSm,
  color: vars.color.text,
});

export const paragraph = style({
  margin: 0,
  fontSize: fontSize[15],
  lineHeight: 1.75,
  color: vars.color.textBody,
});

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[6],
  margin: 0,
  paddingLeft: space[20],
  fontSize: fontSize[15],
  lineHeight: 1.7,
  color: vars.color.textBody,
});

export const orderedList = style([list, { listStyleType: 'decimal' }]);

export const item = style({
  paddingLeft: space[2],
  fontWeight: fontWeight.regular,
});
