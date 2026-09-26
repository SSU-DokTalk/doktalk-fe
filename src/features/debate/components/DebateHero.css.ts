import { globalStyle, style } from '@vanilla-extract/css';
import {
  fontSize,
  fontWeight,
  layout,
  mq,
  space,
  vars,
} from '@/design-system/tokens';

export const hero = style({
  display: 'flex',
  flexDirection: 'column',
  '@media': {
    [mq.md]: { flexDirection: 'row', alignItems: 'flex-start', gap: space[28] },
  },
});

/** 모바일은 회색 띠 안에, 데스크톱은 왼쪽에 표지 무대를 둬요. */
export const stageBand = style({
  padding: `${space[4]} ${layout.gutter} ${space[24]}`,
  backgroundColor: vars.color.canvas,
  '@media': {
    [mq.md]: { padding: 0, backgroundColor: 'transparent', flexShrink: 0 },
  },
});

export const stage = style({
  height: '196px',
  borderRadius: vars.radius['2xl'],
  '@media': {
    [mq.md]: { width: '200px', height: '272px' },
  },
});

export const body = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[12],
  flex: '1 1 0',
  minWidth: 0,
  padding: `${space[20]} ${layout.gutter} ${space[16]}`,
  '@media': {
    [mq.md]: { gap: space[14], padding: 0 },
  },
});

export const badges = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: space[6],
});

export const title = style({
  margin: 0,
  fontSize: fontSize[22],
  fontWeight: fontWeight.bold,
  lineHeight: 1.4,
  letterSpacing: '-0.6px',
  color: vars.color.text,
  overflowWrap: 'anywhere',
  '@media': {
    [mq.md]: { fontSize: fontSize[28], letterSpacing: '-0.8px' },
  },
});

/**
 * 모임 정보. 칸 이름 길이가 언어마다 달라서 subgrid로 줄끼리 열을 맞춰요.
 * 모바일은 줄마다 구분선, 데스크톱은 회색 상자예요.
 */
export const info = style({
  display: 'grid',
  gridTemplateColumns: '18px max-content minmax(0, 1fr)',
  columnGap: space[12],
  margin: '0',
  padding: `${space[4]} ${space[16]}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.xl,
  '@media': {
    [mq.md]: {
      columnGap: space[10],
      rowGap: space[10],
      marginTop: space[4],
      padding: `${space[14]} ${space[16]}`,
      border: 0,
      backgroundColor: vars.color.surfaceSubtle,
    },
  },
});

export const infoRow = style({
  display: 'grid',
  gridColumn: '1 / -1',
  gridTemplateColumns: 'subgrid',
  alignItems: 'center',
  minHeight: '52px',
  selectors: {
    '&:not(:last-child)': {
      borderBottom: `1px solid ${vars.color.borderSubtle}`,
    },
  },
  '@media': {
    [mq.md]: {
      minHeight: 0,
      selectors: {
        '&:not(:last-child)': { borderBottom: 0 },
      },
    },
  },
});

globalStyle(`${infoRow} > svg`, {
  width: '18px',
  height: '18px',
  color: vars.color.infoIcon,
});

export const infoLabel = style({
  maxWidth: '9rem',
  fontSize: fontSize[14],
  lineHeight: 1.4,
  color: vars.color.textTertiary,
  '@media': {
    [mq.md]: { fontSize: fontSize[13], color: vars.color.textSecondary },
  },
});

export const infoValue = style({
  minWidth: 0,
  margin: 0,
  padding: `${space[6]} 0`,
  fontSize: fontSize[15],
  fontWeight: fontWeight.semibold,
  lineHeight: 1.5,
  color: vars.color.text,
  overflowWrap: 'anywhere',
  '@media': {
    [mq.md]: { padding: 0, fontSize: fontSize[14] },
  },
});

export const infoMuted = style({
  fontWeight: fontWeight.medium,
  color: vars.color.textTertiary,
});

export const infoLink = style({
  display: 'block',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  color: vars.color.brand,
  textUnderlineOffset: '3px',
  selectors: {
    '&:hover': { color: vars.color.brandHover },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '2px',
      borderRadius: vars.radius.xs,
    },
  },
});
