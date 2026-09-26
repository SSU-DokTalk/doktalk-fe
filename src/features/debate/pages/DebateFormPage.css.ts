import { globalStyle, style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

export const page = style({
  maxWidth: '880px',
  backgroundColor: vars.color.surface,
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',
  '@media': {
    [mq.md]: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      backgroundColor: 'transparent',
    },
  },
});

export const header = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  padding: '12px 20px 0',
  '@media': {
    [mq.md]: { padding: 0 },
  },
});

export const backLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  alignSelf: 'flex-start',
  gap: '4px',
  minHeight: '36px',
  paddingRight: '6px',
  borderRadius: vars.radius.md,
  fontSize: fontSize.md,
  fontWeight: 600,
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
  fontSize: '1.375rem',
  fontWeight: 700,
  lineHeight: 1.4,
  letterSpacing: '-0.6px',
  color: vars.color.text,
  '@media': {
    [mq.md]: { fontSize: '1.625rem', letterSpacing: '-0.7px' },
  },
});
