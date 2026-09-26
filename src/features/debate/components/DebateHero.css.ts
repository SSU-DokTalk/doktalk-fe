import { globalStyle, style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

export const hero = style({
  display: 'flex',
  flexDirection: 'column',
  '@media': {
    [mq.md]: { flexDirection: 'row', alignItems: 'flex-start', gap: '28px' },
  },
});

/** 모바일은 회색 띠 안에, 데스크톱은 왼쪽에 표지 무대를 둬요. */
export const stageBand = style({
  padding: '4px 20px 24px',
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
  gap: '12px',
  flex: '1 1 0',
  minWidth: 0,
  padding: '20px 20px 16px',
  '@media': {
    [mq.md]: { gap: '14px', padding: 0 },
  },
});

export const badges = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
});

export const title = style({
  margin: 0,
  fontSize: '1.375rem',
  fontWeight: 700,
  lineHeight: 1.4,
  letterSpacing: '-0.6px',
  color: vars.color.text,
  overflowWrap: 'anywhere',
  '@media': {
    [mq.md]: { fontSize: '1.75rem', letterSpacing: '-0.8px' },
  },
});

export const hostRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginTop: '2px',
  '@media': {
    [mq.md]: { gap: '12px', marginTop: 0 },
  },
});

/** 모바일은 이름 칸이 늘어나서 팔로우 버튼이 오른쪽 끝에 붙어요. */
export const hostLink = style({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 auto',
  minWidth: 0,
  color: vars.color.text,
  textDecoration: 'none',
  borderRadius: vars.radius.xs,
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '2px',
    },
  },
  '@media': {
    [mq.md]: { flex: '0 1 auto' },
  },
});

export const hostName = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: fontSize.base,
  fontWeight: 600,
  lineHeight: 1.5,
});

globalStyle(`${hostLink}:hover ${hostName}`, {
  textDecoration: 'underline',
});

export const hostMeta = style({
  fontSize: fontSize.sm,
  lineHeight: 1.5,
  color: vars.color.textTertiary,
});

export const spacer = style({
  display: 'none',
  '@media': {
    [mq.md]: { display: 'block', flex: '1 1 auto' },
  },
});

export const actions = style({
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
});

/**
 * 모임 정보. 칸 이름 길이가 언어마다 달라서 subgrid로 줄끼리 열을 맞춰요.
 * 모바일은 줄마다 구분선, 데스크톱은 회색 상자예요.
 */
export const info = style({
  display: 'grid',
  gridTemplateColumns: '18px max-content minmax(0, 1fr)',
  columnGap: '12px',
  margin: '0',
  padding: '4px 16px',
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.xl,
  '@media': {
    [mq.md]: {
      columnGap: '10px',
      rowGap: '10px',
      marginTop: '4px',
      padding: '14px 16px',
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
  fontSize: fontSize.md,
  lineHeight: 1.4,
  color: vars.color.textTertiary,
  '@media': {
    [mq.md]: { fontSize: fontSize.sm, color: vars.color.textSecondary },
  },
});

export const infoValue = style({
  minWidth: 0,
  margin: 0,
  padding: '6px 0',
  fontSize: fontSize.base,
  fontWeight: 600,
  lineHeight: 1.5,
  color: vars.color.text,
  overflowWrap: 'anywhere',
  '@media': {
    [mq.md]: { padding: 0, fontSize: fontSize.md },
  },
});

export const infoMuted = style({
  fontWeight: 500,
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
