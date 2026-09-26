import { style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

export const head = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  minHeight: '44px',
  marginBottom: '8px',
  '@media': {
    [mq.md]: { marginBottom: '12px' },
  },
});

export const sortNote = style({
  fontSize: fontSize.md,
  color: vars.color.textSecondary,
});

/** 모바일 3칸, 태블릿 4~5칸, 넓은 화면 6칸 */
export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  columnGap: '12px',
  rowGap: '20px',
  margin: 0,
  padding: '0 0 20px',
  listStyle: 'none',
  '@media': {
    [mq.sm]: { gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' },
    [mq.md]: {
      gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
      columnGap: '20px',
      rowGap: '28px',
      paddingBottom: '24px',
    },
    [mq.lg]: { gridTemplateColumns: 'repeat(6, minmax(0, 1fr))' },
  },
});

export const book = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  minWidth: 0,
  '@media': {
    [mq.md]: { gap: '10px' },
  },
});

export const remove = style({
  position: 'absolute',
  top: '6px',
  right: '6px',
  zIndex: 1,
});

export const bookText = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  minWidth: 0,
});

export const bookTitle = style({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  fontSize: fontSize.md,
  fontWeight: 700,
  lineHeight: 1.4,
  letterSpacing: '-0.3px',
  color: vars.color.text,
  '@media': {
    [mq.md]: { fontSize: fontSize.base },
  },
});

export const bookAuthor = style({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  fontSize: fontSize.xs,
  lineHeight: 1.5,
  color: vars.color.textTertiary,
  '@media': {
    [mq.md]: { fontSize: fontSize.sm },
  },
});

/** 모바일 첫 칸의 '책 담기' (도서 검색으로 가요) */
export const addTile = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
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
  gap: '8px',
  boxSizing: 'border-box',
  aspectRatio: '1 / 1.45',
  border: `1.5px dashed ${vars.color.brandBorder}`,
  borderRadius: '6px',
  backgroundColor: '#F8F9FE',
  fontSize: fontSize.md,
  fontWeight: 700,
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
  fontSize: fontSize.xs,
  lineHeight: 1.5,
  color: vars.color.textSecondary,
});

export const error = style({
  margin: '0 0 12px',
  padding: '10px 14px',
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.dangerSubtle,
  color: vars.color.danger,
  fontSize: fontSize.md,
});

export const state = style({
  padding: '8px 0 24px',
});
