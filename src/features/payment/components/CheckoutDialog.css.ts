import { style } from '@vanilla-extract/css';
import { fontSize, fontWeight, mq, space, vars } from '@/design-system/tokens';

export const body = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[20],
  padding: space[20],
  '@media': {
    [mq.md]: { padding: `${space[24]} ${space[28]}` },
  },
});

export const item = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[14],
  padding: space[16],
  borderRadius: vars.radius.xl,
  backgroundColor: vars.color.surfaceSubtle,
});

export const itemText = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[2],
  flex: '1 1 0',
  minWidth: 0,
});

export const itemType = style({
  fontSize: fontSize[13],
  fontWeight: fontWeight.semibold,
  color: vars.color.info,
});

export const itemTitle = style({
  fontSize: fontSize[16],
  fontWeight: fontWeight.bold,
  lineHeight: 1.4,
  letterSpacing: '-0.3px',
  color: vars.color.text,
});

export const itemMeta = style({
  fontSize: fontSize[13],
  color: vars.color.textTertiary,
});

export const itemPrice = style({
  flexShrink: 0,
  fontSize: fontSize[17],
  fontWeight: fontWeight.extrabold,
  color: vars.color.text,
});

export const methodTitle = style({
  margin: `0 0 ${space[10]}`,
  fontSize: fontSize[15],
  fontWeight: fontWeight.bold,
});

/** 토스 결제 위젯이 그려지는 자리. 불러오는 동안 자리를 잡아 둬요. */
export const widget = style({
  minHeight: '196px',
});

export const agreement = style({
  minHeight: '60px',
});

export const widgetState = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '196px',
  padding: `0 ${space[24]}`,
  borderRadius: vars.radius.xl,
  border: `1.5px dashed ${vars.color.borderInput}`,
  backgroundColor: vars.color.surfaceSubtle,
  fontSize: fontSize[14],
  textAlign: 'center',
  color: vars.color.textSecondary,
});

export const total = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: space[16],
  borderTop: `1px solid ${vars.color.borderSubtle}`,
});

export const totalLabel = style({
  fontSize: fontSize[15],
  fontWeight: fontWeight.semibold,
});

export const totalValue = style({
  fontSize: fontSize[24],
  fontWeight: fontWeight.extrabold,
  letterSpacing: '-0.5px',
});

export const footer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[10],
  padding: `0 ${space[20]} ${space[20]}`,
  '@media': {
    [mq.md]: { padding: `0 ${space[28]} ${space[24]}` },
  },
});

export const note = style({
  margin: 0,
  textAlign: 'center',
  fontSize: fontSize[13],
  color: vars.color.textTertiary,
});

export const error = style({
  margin: 0,
  fontSize: fontSize[14],
  color: vars.color.danger,
});
