import { style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

export const body = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  padding: '20px',
  '@media': {
    [mq.md]: { padding: '24px 28px' },
  },
});

export const item = style({
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  padding: '16px',
  borderRadius: vars.radius.xl,
  backgroundColor: vars.color.surfaceSubtle,
});

export const itemText = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  flex: '1 1 0',
  minWidth: 0,
});

export const itemType = style({
  fontSize: fontSize.sm,
  fontWeight: 600,
  color: vars.color.info,
});

export const itemTitle = style({
  fontSize: fontSize.lg,
  fontWeight: 700,
  lineHeight: 1.4,
  letterSpacing: '-0.3px',
  color: vars.color.text,
});

export const itemMeta = style({
  fontSize: fontSize.sm,
  color: vars.color.textTertiary,
});

export const itemPrice = style({
  flexShrink: 0,
  fontSize: fontSize.xl,
  fontWeight: 800,
  color: vars.color.text,
});

export const methodTitle = style({
  margin: '0 0 10px',
  fontSize: fontSize.base,
  fontWeight: 700,
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
  padding: '0 24px',
  borderRadius: vars.radius.xl,
  border: `1.5px dashed ${vars.color.borderInput}`,
  backgroundColor: vars.color.surfaceSubtle,
  fontSize: fontSize.md,
  textAlign: 'center',
  color: vars.color.textSecondary,
});

export const total = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: '16px',
  borderTop: `1px solid ${vars.color.borderSubtle}`,
});

export const totalLabel = style({
  fontSize: fontSize.base,
  fontWeight: 600,
});

export const totalValue = style({
  fontSize: '1.5rem',
  fontWeight: 800,
  letterSpacing: '-0.5px',
});

export const footer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  padding: '0 20px 20px',
  '@media': {
    [mq.md]: { padding: '0 28px 24px' },
  },
});

export const note = style({
  margin: 0,
  textAlign: 'center',
  fontSize: fontSize.sm,
  color: vars.color.textTertiary,
});

export const error = style({
  margin: 0,
  fontSize: fontSize.md,
  color: vars.color.danger,
});
