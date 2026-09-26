import { style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

export const layout = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gap: '12px',
  '@media': {
    [mq.md]: { gap: '16px' },
    [mq.lg]: {
      gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)',
      gap: '24px',
    },
  },
});

/** 1위 요약 큰 카드 */
export const top = style({
  display: 'flex',
  gap: '16px',
  padding: '20px',
  borderRadius: vars.radius['2xl'],
  backgroundColor: vars.color.surface,
  color: vars.color.text,
  textDecoration: 'none',
  selectors: {
    '&:hover': { boxShadow: vars.shadow.md },
    '&:focus-visible': {
      outline: `3px solid ${vars.color.brand}`,
      outlineOffset: '2px',
    },
  },
  '@media': {
    [mq.md]: { gap: '28px', padding: '28px', borderRadius: vars.radius['3xl'] },
  },
});

export const topBody = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  flex: '1 1 0',
  minWidth: 0,
});

export const rankRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const rankBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '26px',
  height: '26px',
  borderRadius: vars.radius.sm,
  backgroundColor: vars.color.brand,
  color: vars.color.textOnBrand,
  fontSize: fontSize.md,
  fontWeight: 700,
});

export const category = style({
  fontSize: fontSize.sm,
  fontWeight: 600,
  color: vars.color.info,
});

export const topTitle = style({
  fontSize: fontSize.xl,
  fontWeight: 700,
  lineHeight: 1.4,
  letterSpacing: '-0.5px',
  selectors: {
    [`${top}:hover &`]: { color: vars.color.brand },
  },
  '@media': {
    [mq.md]: { fontSize: '1.375rem' },
  },
});

export const bookLine = style({
  fontSize: fontSize.md,
  color: vars.color.textTertiary,
  '@media': {
    [mq.md]: { fontSize: fontSize.base },
  },
});

export const excerpt = style({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 3,
  fontSize: fontSize.base,
  lineHeight: 1.65,
  color: vars.color.textSecondary,
  '@media': {
    [mq.belowMd]: { display: 'none' },
  },
});

/** 좁은 화면에서 '미리보기'가 안 들어가면 가격 아래 줄로 내려가요. */
export const topFoot = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px 12px',
  marginTop: 'auto',
  paddingTop: '8px',
});

export const price = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: fontSize.lg,
  fontWeight: 700,
  '@media': {
    [mq.md]: { fontSize: fontSize.xl },
  },
});

export const lockIcon = style({
  width: '16px',
  height: '16px',
  color: vars.color.textTertiary,
});

/** 카드 전체가 링크라서 테두리 버튼 모양만 흉내 내요 */
export const fakeButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  height: '40px',
  padding: '0 16px',
  border: `1px solid ${vars.color.brand}`,
  borderRadius: vars.radius.md,
  color: vars.color.brand,
  fontSize: fontSize.md,
  fontWeight: 600,
  '@media': {
    [mq.md]: { height: '44px', padding: '0 18px', fontSize: fontSize.base },
  },
});

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const row = style({
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  padding: '14px 16px',
  borderRadius: vars.radius.xl,
  backgroundColor: vars.color.surface,
  color: vars.color.text,
  textDecoration: 'none',
  selectors: {
    '&:hover': { boxShadow: vars.shadow.md },
    '&:focus-visible': {
      outline: `3px solid ${vars.color.brand}`,
      outlineOffset: '2px',
    },
  },
  '@media': {
    [mq.md]: { gap: '16px', padding: '14px 18px' },
  },
});

export const rank = style({
  width: '20px',
  flexShrink: 0,
  textAlign: 'center',
  fontSize: '1.125rem',
  fontWeight: 700,
  color: vars.color.brand,
});

export const rowText = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  flex: '1 1 0',
  minWidth: 0,
});

export const rowTitle = style({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  fontSize: fontSize.base,
  fontWeight: 700,
  lineHeight: 1.4,
  selectors: {
    [`${row}:hover &`]: { color: vars.color.brand },
  },
  '@media': {
    [mq.md]: { fontSize: fontSize.lg },
  },
});

export const rowMeta = style({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  fontSize: fontSize.sm,
  color: vars.color.textTertiary,
  '@media': {
    [mq.md]: { fontSize: fontSize.md },
  },
});

export const rowPrice = style({
  flexShrink: 0,
  fontSize: fontSize.base,
  fontWeight: 700,
});
