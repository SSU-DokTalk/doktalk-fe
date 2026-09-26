import { style } from '@vanilla-extract/css';
import { fontSize, fontWeight, mq, space, vars } from '@/design-system/tokens';

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
  gap: space[32],
  paddingTop: space[40],
  paddingBottom: space[32],
  '@media': {
    [mq.md]: { paddingTop: space[48] },
  },
});

export const columns = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: `${space[28]} ${space[24]}`,
  '@media': {
    [mq.lg]: { gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: space[32] },
  },
});

export const brand = style({
  gridColumn: '1 / -1',
  display: 'flex',
  flexDirection: 'column',
  gap: space[12],
  '@media': {
    [mq.lg]: { gridColumn: 'auto' },
  },
});

export const brandName = style({
  margin: 0,
  fontSize: fontSize[20],
  fontWeight: fontWeight.bold,
});

export const description = style({
  margin: 0,
  fontSize: fontSize[14],
  lineHeight: 1.7,
  color: soft,
});

export const contact = style({
  margin: 0,
  fontSize: fontSize[13],
  lineHeight: 1.6,
  color: faint,
});

export const group = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[6],
});

export const groupTitle = style({
  margin: `0 0 ${space[4]}`,
  fontSize: fontSize[15],
  fontWeight: fontWeight.bold,
});

export const link = style({
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '28px',
  fontSize: fontSize[14],
  color: soft,
  textDecoration: 'none',
  selectors: {
    '&:hover': { color: vars.color.inverseText, textDecoration: 'underline' },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.inverseText}`,
      outlineOffset: '2px',
      // 글자 링크의 포커스 링은 작게 둥글려요.
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
        fontWeight: fontWeight.bold,
        color: vars.color.inverseText,
      },
    },
  },
]);

export const bottom = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  gap: `${space[8]} ${space[16]}`,
  paddingTop: space[20],
  borderTop: '1px solid rgba(255, 255, 255, 0.14)',
  fontSize: fontSize[13],
  color: faint,
});
