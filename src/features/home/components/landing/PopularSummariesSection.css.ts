import { style } from '@vanilla-extract/css';
import { fontSize, fontWeight, mq, space, vars } from '@/design-system/tokens';

export const layout = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gap: space[12],
  '@media': {
    [mq.md]: { gap: space[16] },
    [mq.lg]: {
      gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)',
      gap: space[24],
    },
  },
});

/** 1위 요약 큰 카드 */
export const top = style({
  display: 'flex',
  gap: space[16],
  padding: space[20],
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
    [mq.md]: {
      gap: space[28],
      padding: space[28],
      borderRadius: vars.radius['3xl'],
    },
  },
});

export const topBody = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[8],
  flex: '1 1 0',
  minWidth: 0,
});

export const rankRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[8],
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
  fontSize: fontSize[14],
  fontWeight: fontWeight.bold,
});

export const category = style({
  fontSize: fontSize[13],
  fontWeight: fontWeight.semibold,
  color: vars.color.info,
});

export const topTitle = style({
  fontSize: fontSize[17],
  fontWeight: fontWeight.bold,
  lineHeight: 1.4,
  letterSpacing: '-0.5px',
  selectors: {
    [`${top}:hover &`]: { color: vars.color.brand },
  },
  '@media': {
    [mq.md]: { fontSize: fontSize[22] },
  },
});

export const bookLine = style({
  fontSize: fontSize[14],
  color: vars.color.textTertiary,
  '@media': {
    [mq.md]: { fontSize: fontSize[15] },
  },
});

export const excerpt = style({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 3,
  fontSize: fontSize[15],
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
  gap: `${space[8]} ${space[12]}`,
  marginTop: 'auto',
  paddingTop: space[8],
});

export const price = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: space[6],
  fontSize: fontSize[16],
  fontWeight: fontWeight.bold,
  '@media': {
    [mq.md]: { fontSize: fontSize[17] },
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
  padding: `0 ${space[16]}`,
  border: `1px solid ${vars.color.brand}`,
  borderRadius: vars.radius.md,
  color: vars.color.brand,
  fontSize: fontSize[14],
  fontWeight: fontWeight.semibold,
  '@media': {
    [mq.md]: {
      height: '44px',
      padding: `0 ${space[18]}`,
      fontSize: fontSize[15],
    },
  },
});

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[12],
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const row = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[14],
  padding: `${space[14]} ${space[16]}`,
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
    [mq.md]: { gap: space[16], padding: `${space[14]} ${space[18]}` },
  },
});

export const rank = style({
  width: '20px',
  flexShrink: 0,
  textAlign: 'center',
  fontSize: fontSize[18],
  fontWeight: fontWeight.bold,
  color: vars.color.brand,
});

export const rowText = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[2],
  flex: '1 1 0',
  minWidth: 0,
});

export const rowTitle = style({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  fontSize: fontSize[15],
  fontWeight: fontWeight.bold,
  lineHeight: 1.4,
  selectors: {
    [`${row}:hover &`]: { color: vars.color.brand },
  },
  '@media': {
    [mq.md]: { fontSize: fontSize[16] },
  },
});

export const rowMeta = style({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  fontSize: fontSize[13],
  color: vars.color.textTertiary,
  '@media': {
    [mq.md]: { fontSize: fontSize[14] },
  },
});

export const rowPrice = style({
  flexShrink: 0,
  fontSize: fontSize[15],
  fontWeight: fontWeight.bold,
});
