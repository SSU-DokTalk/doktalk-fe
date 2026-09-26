import { globalStyle, style } from '@vanilla-extract/css';
import {
  fontSize,
  fontWeight,
  layout,
  mq,
  space,
  typeScale,
  vars,
} from '@/design-system/tokens';

export const page = style({
  backgroundColor: vars.color.surface,
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
    [mq.md]: { gap: space[16] },
  },
});

export const article = style({
  display: 'flex',
  flexDirection: 'column',
  '@media': {
    [mq.md]: {
      gap: space[24],
      padding: `${space[28]} ${space[32]}`,
      borderRadius: vars.radius['3xl'],
      backgroundColor: vars.color.surface,
    },
  },
});

/** 모바일: 회색 띠 위 뒤로 가기·공유·옵션. 데스크톱: 뒤로 가기 링크만 */
export const topRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[2],
  padding: `${space[6]} ${space[6]} 0`,
  backgroundColor: vars.color.canvas,
  '@media': {
    [mq.md]: {
      padding: 0,
      marginBottom: `-${space[8]}`,
      backgroundColor: 'transparent',
    },
  },
});

export const backLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: space[4],
  minHeight: '44px',
  padding: `0 ${space[10]} 0 ${space[6]}`,
  borderRadius: vars.radius.md,
  fontSize: fontSize[14],
  fontWeight: fontWeight.semibold,
  color: vars.color.textSecondary,
  textDecoration: 'none',
  selectors: {
    '&:hover': { color: vars.color.text },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '2px',
    },
  },
  '@media': {
    [mq.md]: { minHeight: '32px', padding: `0 ${space[6]} 0 0` },
  },
});

globalStyle(`${backLink} svg`, { width: '18px', height: '18px' });

export const spacer = style({ flex: '1 1 auto' });

export const topActions = style({
  display: 'flex',
  alignItems: 'center',
});

export const intro = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[10],
  padding: `${space[8]} ${layout.gutter} ${space[24]}`,
  '@media': {
    [mq.md]: { gap: space[12], padding: 0 },
  },
});

export const sectionTitle = style({
  margin: 0,
  ...typeScale.sectionTitleSm,

  color: vars.color.text,
  '@media': {
    [mq.md]: { fontSize: fontSize[18] },
  },
});

export const introText = style({
  margin: 0,
  fontSize: fontSize[15],
  lineHeight: 1.75,
  color: vars.color.textBody,
  whiteSpace: 'pre-wrap',
  overflowWrap: 'anywhere',
  '@media': {
    [mq.md]: { fontSize: fontSize[16], lineHeight: 1.8 },
  },
});

export const footer = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: space[4],
  padding: `${space[12]} ${space[10]} ${space[16]}`,
  borderTop: `1px solid ${vars.color.borderSubtle}`,
  '@media': {
    [mq.md]: { padding: `${space[16]} 0 0`, marginLeft: `-${space[10]}` },
  },
});

export const rail = style({
  position: 'sticky',
  top: layout.stickyTop,
  display: 'flex',
  flexDirection: 'column',
  gap: space[16],
});

export const skeleton = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[16],
  padding: space[20],
  backgroundColor: vars.color.surface,
  '@media': {
    [mq.md]: {
      padding: `${space[28]} ${space[32]}`,
      borderRadius: vars.radius['3xl'],
    },
  },
});

export const skeletonHero = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[16],
  '@media': {
    [mq.md]: { flexDirection: 'row', gap: space[28] },
  },
});

export const skeletonLines = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[12],
  flex: '1 1 0',
});
