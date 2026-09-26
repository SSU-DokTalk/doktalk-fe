import { style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

/** 어두운 바탕 위 보조 글자 (대비 7:1 이상) */
const soft = 'rgba(255, 255, 255, 0.8)';
/** 어두운 바탕 위 옅은 글자 (대비 4.5:1 이상) */
const faint = 'rgba(255, 255, 255, 0.64)';

export const footer = style({
  backgroundColor: vars.color.inverse,
  color: vars.color.inverseText,
  fontFamily: vars.font.family,
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',
});

export const inner = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  paddingTop: '40px',
  paddingBottom: '32px',
  '@media': {
    [mq.md]: { paddingTop: '48px' },
  },
});

export const columns = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '28px 24px',
  '@media': {
    [mq.lg]: { gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '32px' },
  },
});

export const brand = style({
  gridColumn: '1 / -1',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  '@media': {
    [mq.lg]: { gridColumn: 'auto' },
  },
});

export const brandName = style({
  margin: 0,
  fontSize: '1.25rem',
  fontWeight: 700,
});

export const description = style({
  margin: 0,
  fontSize: fontSize.md,
  lineHeight: 1.7,
  color: soft,
});

export const contact = style({
  margin: 0,
  fontSize: fontSize.sm,
  lineHeight: 1.6,
  color: faint,
});

export const group = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

export const groupTitle = style({
  margin: '0 0 4px',
  fontSize: fontSize.base,
  fontWeight: 700,
});

export const link = style({
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '28px',
  fontSize: fontSize.md,
  color: soft,
  textDecoration: 'none',
  selectors: {
    '&:hover': { color: vars.color.inverseText, textDecoration: 'underline' },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.inverseText}`,
      outlineOffset: '2px',
      borderRadius: '4px',
    },
  },
});

export const languageButton = style([
  link,
  {
    padding: 0,
    border: 0,
    background: 'transparent',
    fontFamily: vars.font.family,
    cursor: 'pointer',
    textAlign: 'left',
    selectors: {
      '&[aria-pressed="true"]': {
        fontWeight: 700,
        color: vars.color.inverseText,
      },
    },
  },
]);

export const bottom = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  gap: '8px 16px',
  paddingTop: '20px',
  borderTop: '1px solid rgba(255, 255, 255, 0.14)',
  fontSize: fontSize.sm,
  color: faint,
});
