import { style } from '@vanilla-extract/css';
import {
  fontSize,
  fontWeight,
  layout,
  mq,
  space,
  vars,
} from '@/design-system/tokens';

export const page = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: space[28],
  padding: `${space[48]} ${layout.gutter} ${space[32]}`,
  textAlign: 'center',
  '@media': {
    [mq.md]: { padding: `${space[80]} 0 ${space[40]}` },
  },
});

/** 겹쳐 세운 책 두 권 (404 표지) */
export const art = style({
  position: 'relative',
  width: '220px',
  height: '176px',
});

const book = style({
  position: 'absolute',
  bottom: 0,
  boxSizing: 'border-box',
  borderRadius: '3px 6px 6px 3px',
  boxShadow:
    'inset 4px 0 0 rgba(0, 0, 0, 0.12), 0 10px 24px rgba(0, 0, 0, 0.16)',
});

export const backBook = style([
  book,
  {
    left: space[24],
    width: '104px',
    height: '148px',
    backgroundColor: vars.color.infoSubtle,
    transform: 'rotate(-8deg)',
  },
]);

export const frontBook = style([
  book,
  {
    right: space[24],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '112px',
    height: '160px',
    padding: `${space[16]} ${space[12]}`,
    backgroundColor: vars.color.brand,
    color: vars.color.textOnBrand,
    textAlign: 'left',
  },
]);

export const code = style({
  fontSize: fontSize[34],
  fontWeight: fontWeight.black,
  lineHeight: 1,
  letterSpacing: '-1px',
});

export const brand = style({
  fontSize: fontSize[12],
  fontWeight: fontWeight.semibold,
  opacity: 0.85,
});

export const text = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[8],
  maxWidth: '420px',
});

export const title = style({
  margin: 0,
  fontSize: fontSize[24],
  fontWeight: fontWeight.bold,
  lineHeight: 1.4,
  letterSpacing: '-0.7px',
  '@media': {
    [mq.md]: { fontSize: fontSize[28] },
  },
});

export const description = style({
  margin: 0,
  fontSize: fontSize[16],
  lineHeight: 1.65,
  color: vars.color.textSecondary,
});

export const actions = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: space[8],
});
