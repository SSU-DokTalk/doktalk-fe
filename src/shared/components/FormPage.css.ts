import { globalStyle, style } from '@vanilla-extract/css';
import {
  fontSize,
  fontWeight,
  layout,
  mq,
  space,
  vars,
} from '@/design-system/tokens';

export const page = style({
  maxWidth: layout.centeredWidth,
  backgroundColor: vars.color.surface,
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',
  '@media': {
    [mq.md]: {
      display: 'flex',
      flexDirection: 'column',
      gap: space[20],
      backgroundColor: 'transparent',
    },
  },
});

export const header = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[2],
  padding: `${space[12]} ${layout.gutter} 0`,
  '@media': {
    [mq.md]: { padding: 0 },
  },
});

export const backLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  alignSelf: 'flex-start',
  gap: space[4],
  minHeight: '36px',
  paddingRight: space[6],
  borderRadius: vars.radius.md,
  fontSize: fontSize[14],
  fontWeight: fontWeight.semibold,
  color: vars.color.textSecondary,
  textDecoration: 'none',
  selectors: {
    '&:hover': { color: vars.color.text },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '2px',
    },
  },
});

globalStyle(`${backLink} svg`, { width: '18px', height: '18px' });

export const title = style({
  margin: 0,
  fontSize: fontSize[22],
  fontWeight: fontWeight.bold,
  lineHeight: 1.4,
  letterSpacing: '-0.6px',
  color: vars.color.text,
  '@media': {
    [mq.md]: { fontSize: fontSize[26], letterSpacing: '-0.7px' },
  },
});
