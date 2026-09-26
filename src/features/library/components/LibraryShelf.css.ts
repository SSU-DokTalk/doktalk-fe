import { style } from '@vanilla-extract/css';
import {
  fontSize,
  fontWeight,
  mq,
  space,
  vars,
  zIndex,
} from '@/design-system/tokens';

export const head = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: space[12],
  minHeight: '44px',
  marginBottom: space[8],
  '@media': {
    [mq.md]: { marginBottom: space[12] },
  },
});

export const sortNote = style({
  fontSize: fontSize[14],
  color: vars.color.textSecondary,
});

/** 모바일 3칸, 태블릿 4~5칸, 넓은 화면 6칸 */
export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  columnGap: space[12],
  rowGap: space[20],
  margin: 0,
  padding: `0 0 ${space[20]}`,
  listStyle: 'none',
  '@media': {
    [mq.sm]: { gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' },
    [mq.md]: {
      gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
      columnGap: space[20],
      rowGap: space[28],
      paddingBottom: space[24],
    },
    [mq.lg]: { gridTemplateColumns: 'repeat(6, minmax(0, 1fr))' },
  },
});

export const book = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[8],
  minWidth: 0,
  '@media': {
    [mq.md]: { gap: space[10] },
  },
});

export const remove = style({
  position: 'absolute',
  top: space[6],
  right: space[6],
  zIndex: zIndex.raised,
});

export const bookText = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[2],
  minWidth: 0,
});

export const bookTitle = style({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  fontSize: fontSize[14],
  fontWeight: fontWeight.bold,
  lineHeight: 1.4,
  letterSpacing: '-0.3px',
  color: vars.color.text,
  '@media': {
    [mq.md]: { fontSize: fontSize[15] },
  },
});

export const bookAuthor = style({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  fontSize: fontSize[12],
  lineHeight: 1.5,
  color: vars.color.textTertiary,
  '@media': {
    [mq.md]: { fontSize: fontSize[13] },
  },
});

/** 모바일 첫 칸의 '책 담기' (도서 검색으로 가요) */
export const addTile = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[8],
  color: vars.color.brand,
  textDecoration: 'none',
  borderRadius: vars.radius.sm,
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '2px',
    },
  },
});

export const addBox = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: space[8],
  boxSizing: 'border-box',
  aspectRatio: '1 / 1.45',
  border: `1.5px dashed ${vars.color.brandBorder}`,
  borderRadius: vars.radius.xs,
  backgroundColor: vars.color.brandFaint,
  fontSize: fontSize[14],
  fontWeight: fontWeight.bold,
  selectors: {
    [`${addTile}:hover &`]: { backgroundColor: vars.color.brandSubtle },
  },
});

export const addIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  borderRadius: vars.radius.pill,
  backgroundColor: vars.color.brand,
  color: vars.color.textOnBrand,
});

export const addHint = style({
  fontSize: fontSize[12],
  lineHeight: 1.5,
  color: vars.color.textSecondary,
});

export const error = style({
  margin: `0 0 ${space[12]}`,
  padding: `${space[10]} ${space[14]}`,
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.dangerSubtle,
  color: vars.color.danger,
  fontSize: fontSize[14],
});

export const state = style({
  padding: `${space[8]} 0 ${space[24]}`,
});
