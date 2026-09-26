import { style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

export const card = style({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  width: '100%',
  maxWidth: '520px',
  margin: '0 auto',
  padding: '32px 20px',
  backgroundColor: vars.color.surface,
  textAlign: 'center',
  '@media': {
    [mq.md]: {
      marginTop: '24px',
      padding: '40px',
      borderRadius: vars.radius['3xl'],
    },
  },
});

export const icon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '64px',
  height: '64px',
  borderRadius: vars.radius.pill,
});

export const iconSuccess = style({
  backgroundColor: vars.color.brand,
  color: vars.color.textOnBrand,
});

export const iconFail = style({
  backgroundColor: vars.color.dangerSubtle,
  color: vars.color.danger,
});

export const texts = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

export const title = style({
  margin: 0,
  fontSize: '1.5rem',
  fontWeight: 700,
  lineHeight: 1.4,
  letterSpacing: '-0.6px',
});

export const lead = style({
  margin: 0,
  fontSize: fontSize.base,
  lineHeight: 1.6,
  color: vars.color.textSecondary,
});

export const details = style({
  alignSelf: 'stretch',
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
  padding: '4px 20px',
  borderRadius: vars.radius.xl,
  backgroundColor: vars.color.surfaceSubtle,
  textAlign: 'left',
});

export const detail = style({
  display: 'grid',
  gridTemplateColumns: '96px minmax(0, 1fr)',
  gap: '12px',
  padding: '12px 0',
  fontSize: fontSize.md,
  selectors: {
    '&:not(:last-child)': { borderBottom: `1px solid ${vars.color.border}` },
  },
});

export const term = style({
  color: vars.color.textSecondary,
});

export const value = style({
  margin: 0,
  fontWeight: 600,
  color: vars.color.text,
  overflowWrap: 'anywhere',
});

export const actions = style({
  alignSelf: 'stretch',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});
