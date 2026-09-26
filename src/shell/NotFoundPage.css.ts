import { style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

export const page = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '28px',
  padding: '48px 20px 32px',
  textAlign: 'center',
  '@media': {
    [mq.md]: { padding: '80px 0 40px' },
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
    left: '24px',
    width: '104px',
    height: '148px',
    backgroundColor: vars.color.infoSubtle,
    transform: 'rotate(-8deg)',
  },
]);

export const frontBook = style([
  book,
  {
    right: '24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '112px',
    height: '160px',
    padding: '16px 12px',
    backgroundColor: vars.color.brand,
    color: vars.color.textOnBrand,
    textAlign: 'left',
  },
]);

export const code = style({
  fontSize: '2.125rem',
  fontWeight: 900,
  lineHeight: 1,
  letterSpacing: '-1px',
});

export const brand = style({
  fontSize: fontSize.xs,
  fontWeight: 600,
  opacity: 0.85,
});

export const text = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  maxWidth: '420px',
});

export const title = style({
  margin: 0,
  fontSize: '1.5rem',
  fontWeight: 700,
  lineHeight: 1.4,
  letterSpacing: '-0.7px',
  '@media': {
    [mq.md]: { fontSize: '1.75rem' },
  },
});

export const description = style({
  margin: 0,
  fontSize: fontSize.lg,
  lineHeight: 1.65,
  color: vars.color.textSecondary,
});

export const actions = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '8px',
});
