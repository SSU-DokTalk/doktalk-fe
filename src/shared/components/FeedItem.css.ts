import { globalStyle, style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

/** 표지 너비(px). 컴포넌트에서도 같은 값을 써요. */
export const COVER_WIDTH = { mobile: 72, desktop: 84 } as const;
const coverHeight = (width: number) => Math.round(width * 1.45);

const MOBILE_PADDING_Y = 16;
/** 개설자 줄(24) + 아래 여백(6) + 줄 간격(4) */
const MOBILE_HEADER = 24 + 6 + 4;
const DESKTOP_PADDING = 20;

/**
 * 모바일: 개설자·카테고리 줄 아래에 제목·일정·가격, 오른쪽에 표지.
 * 데스크톱: 왼쪽 표지, 오른쪽에 카테고리·제목·소개·일정 칩, 맨 아래 개설자와 좋아요.
 * 마크업 하나를 grid-template-areas로 옮겨 놓아요.
 *
 * 표지는 자기 칸(cover) 안에 absolute로 놓아서 줄 높이 계산에서 빼요.
 * 여러 줄에 걸친 표지가 1fr 줄을 부풀리는 걸 막고, 표지 높이는 min-height로 확보해요.
 * 마지막 줄(1fr)이 남는 높이를 받아서 가격·좋아요 줄이 표지 아래 끝에 맞춰져요.
 */
export const item = style({
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: `minmax(0, 1fr) ${COVER_WIDTH.mobile}px`,
  gridTemplateRows: 'auto auto auto 1fr',
  gridTemplateAreas: `
    "header header"
    "title cover"
    "meta cover"
    "stats cover"`,
  columnGap: '14px',
  rowGap: '4px',
  boxSizing: 'border-box',
  minHeight: `${MOBILE_PADDING_Y * 2 + MOBILE_HEADER + coverHeight(COVER_WIDTH.mobile)}px`,
  padding: `${MOBILE_PADDING_Y}px 20px`,
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
  backgroundColor: vars.color.surface,
  transition: 'background-color 120ms ease',
  selectors: {
    '&:hover': {
      backgroundColor: `color-mix(in srgb, ${vars.color.surfaceSubtle} 55%, ${vars.color.surface})`,
    },
  },
  '@media': {
    [mq.md]: {
      gridTemplateColumns: `${COVER_WIDTH.desktop}px minmax(0, 1fr) auto`,
      gridTemplateRows: 'auto auto auto auto 1fr',
      gridTemplateAreas: `
        "cover category category"
        "cover title title"
        "cover body body"
        "cover meta meta"
        "cover host stats"`,
      columnGap: '18px',
      rowGap: '6px',
      minHeight: `${DESKTOP_PADDING * 2 + coverHeight(COVER_WIDTH.desktop)}px`,
      padding: `${DESKTOP_PADDING}px`,
    },
  },
});

/** 요약처럼 부가 정보(책)를 소개보다 먼저 보여줄 때 (데스크톱) */
export const metaFirst = style({
  '@media': {
    [mq.md]: {
      gridTemplateAreas: `
        "cover category category"
        "cover title title"
        "cover meta meta"
        "cover body body"
        "cover host stats"`,
    },
  },
});

/** 모바일에서만 한 줄로 묶어요. 데스크톱에서는 풀어서 각자 자리로 가요. */
export const header = style({
  gridArea: 'header',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  minWidth: 0,
  marginBottom: '6px',
  '@media': {
    [mq.md]: { display: 'contents' },
  },
});

/**
 * 모바일 한 줄에서는 이름이 먼저 자리를 잡고(최대 9em), 카테고리가 남는 폭에서 줄어요.
 * 몽골어 카테고리가 길어도 짧은 이름이 잘리지 않아요.
 */
export const host = style({
  gridArea: 'host',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flex: '0 0 auto',
  minWidth: 0,
  fontSize: fontSize.sm,
  lineHeight: 1.5,
  color: vars.color.textTertiary,
  '@media': {
    [mq.md]: { marginTop: '6px' },
  },
});

export const hostName = style({
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontWeight: 600,
  color: vars.color.textMuted,
  '@media': {
    [mq.belowMd]: { maxWidth: '9em' },
  },
});

export const time = style({
  flexShrink: 0,
});

export const category = style({
  gridArea: 'category',
  flex: '0 1 auto',
  minWidth: 0,
  maxWidth: '55%',
  margin: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: fontSize.sm,
  fontWeight: 600,
  lineHeight: 1.5,
  color: vars.color.info,
  '@media': {
    [mq.md]: { maxWidth: 'none' },
  },
});

export const title = style({
  gridArea: 'title',
  margin: 0,
  fontSize: fontSize.lg,
  fontWeight: 700,
  lineHeight: 1.4,
  letterSpacing: '-0.4px',
  color: vars.color.text,
  overflowWrap: 'anywhere',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  '@media': {
    [mq.md]: {
      fontSize: '1.125rem',
      letterSpacing: '-0.5px',
      WebkitLineClamp: 1,
    },
  },
});

/** 카드 전체를 누를 수 있게 제목 링크를 카드 크기로 펼쳐요. */
export const link = style({
  color: 'inherit',
  textDecoration: 'none',
  outline: 'none',
  selectors: {
    // 표지·아바타처럼 position이 있는 요소보다 위에 깔아야 어디를 눌러도 이동해요.
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      zIndex: 1,
    },
    '&:focus-visible::after': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '-2px',
    },
  },
});

export const body = style({
  gridArea: 'body',
  display: 'none',
  margin: 0,
  fontSize: fontSize.base,
  lineHeight: 1.6,
  color: vars.color.textSecondary,
  overflowWrap: 'anywhere',
  whiteSpace: 'pre-line',
  '@media': {
    [mq.md]: {
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 2,
      overflow: 'hidden',
    },
  },
});

/** 모바일은 "10.06 (화) 19:30 · 온라인" 한 줄, 데스크톱은 회색 칩 */
export const meta = style({
  gridArea: 'meta',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  fontSize: fontSize.sm,
  lineHeight: 1.5,
  color: vars.color.textTertiary,
  '@media': {
    [mq.md]: {
      gap: '6px',
      marginTop: '4px',
    },
  },
});

export const metaItem = style({
  minWidth: 0,
  overflowWrap: 'anywhere',
  selectors: {
    '& + &::before': {
      content: '"·"',
      margin: '0 5px',
    },
  },
  '@media': {
    [mq.md]: {
      display: 'flex',
      alignItems: 'center',
      minHeight: '26px',
      boxSizing: 'border-box',
      padding: '3px 8px',
      borderRadius: vars.radius.sm,
      backgroundColor: vars.color.surfaceSubtle,
      fontSize: fontSize.xs,
      fontWeight: 500,
      lineHeight: 1.4,
      color: vars.color.textMuted,
      selectors: {
        '& + &::before': { content: 'none' },
      },
    },
  },
});

export const stats = style({
  gridArea: 'stats',
  alignSelf: 'end',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginTop: '4px',
  fontSize: fontSize.sm,
  lineHeight: 1.5,
  color: vars.color.textTertiary,
  '@media': {
    [mq.md]: {
      alignSelf: 'center',
      gap: '12px',
      marginTop: '6px',
    },
  },
});

export const stat = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '3px',
});

globalStyle(`${stat} svg`, {
  width: '14px',
  height: '14px',
  flexShrink: 0,
});

/** 모바일은 가격을 맨 앞, 데스크톱은 맨 뒤에 둬요. */
export const priceSlot = style({
  order: -1,
  display: 'inline-flex',
  alignItems: 'center',
  '@media': {
    [mq.md]: { order: 0, marginLeft: '2px' },
  },
});

export const priceText = style({
  fontSize: fontSize.base,
  fontWeight: 700,
  color: vars.color.text,
  whiteSpace: 'nowrap',
});

/** grid 칸을 기준으로 absolute 배치해요 (칸의 왼쪽 위). */
export const cover = style({
  gridArea: 'cover',
  position: 'absolute',
  top: 0,
  left: 0,
});

/** 불러오는 동안 같은 자리를 잡아 두는 줄 */
export const skeletonText = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  minWidth: 0,
});

/** 한 줄 부가 정보 (요약: 책 제목 · 저자) */
export const metaText = style({
  gridArea: 'meta',
  margin: 0,
  fontSize: fontSize.sm,
  lineHeight: 1.5,
  color: vars.color.textTertiary,
  overflowWrap: 'anywhere',
  '@media': {
    [mq.md]: { fontSize: fontSize.md, color: vars.color.textSecondary },
  },
});

globalStyle(`${priceText} svg`, {
  width: '14px',
  height: '14px',
  marginRight: '3px',
  verticalAlign: '-1px',
});
