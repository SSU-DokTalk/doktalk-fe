import { globalStyle, style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

export const page = style({
  backgroundColor: vars.color.surface,
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',
  '@media': {
    [mq.md]: { backgroundColor: 'transparent' },
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
  minWidth: 0,
  '@media': {
    [mq.md]: { gap: '16px' },
  },
});

export const article = style({
  display: 'flex',
  flexDirection: 'column',
  '@media': {
    [mq.md]: {
      gap: '24px',
      padding: '28px 32px',
      borderRadius: vars.radius['3xl'],
      backgroundColor: vars.color.surface,
    },
  },
});

/** 모바일: 회색 띠 위 뒤로 가기·공유·옵션. 데스크톱: 뒤로 가기 링크만 */
export const topRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
  padding: '6px 6px 0',
  backgroundColor: vars.color.canvas,
  '@media': {
    [mq.md]: {
      padding: 0,
      marginBottom: '-8px',
      backgroundColor: 'transparent',
    },
  },
});

export const backLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  minHeight: '44px',
  padding: '0 10px 0 6px',
  borderRadius: vars.radius.md,
  fontSize: fontSize.md,
  fontWeight: 600,
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
    [mq.md]: { minHeight: '32px', padding: '0 6px 0 0' },
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
  gap: '10px',
  padding: '8px 20px 24px',
  '@media': {
    [mq.md]: { gap: '12px', padding: 0 },
  },
});

export const sectionTitle = style({
  margin: 0,
  fontSize: fontSize.lg,
  fontWeight: 700,
  lineHeight: 1.5,
  color: vars.color.text,
  '@media': {
    [mq.md]: { fontSize: '1.125rem' },
  },
});

export const introText = style({
  margin: 0,
  fontSize: fontSize.base,
  lineHeight: 1.75,
  color: vars.color.textBody,
  whiteSpace: 'pre-wrap',
  overflowWrap: 'anywhere',
  '@media': {
    [mq.md]: { fontSize: fontSize.lg, lineHeight: 1.8 },
  },
});

export const footer = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4px',
  padding: '12px 10px 16px',
  borderTop: `1px solid ${vars.color.borderSubtle}`,
  '@media': {
    [mq.md]: { padding: '16px 0 0', marginLeft: '-10px' },
  },
});

export const rail = style({
  position: 'sticky',
  top: '96px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const skeleton = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '20px',
  backgroundColor: vars.color.surface,
  '@media': {
    [mq.md]: { padding: '28px 32px', borderRadius: vars.radius['3xl'] },
  },
});

export const skeletonHero = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  '@media': {
    [mq.md]: { flexDirection: 'row', gap: '28px' },
  },
});

export const skeletonLines = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  flex: '1 1 0',
});
