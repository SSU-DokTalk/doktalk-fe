import { style } from '@vanilla-extract/css';
import {
  fontSize,
  fontWeight,
  layout,
  mq,
  space,
  typeScale,
  vars,
} from '@/design-system/tokens';

export const card = style({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: space[20],
  width: '100%',
  maxWidth: '520px',
  margin: '0 auto',
  padding: `${space[32]} ${layout.gutter}`,
  backgroundColor: vars.color.surface,
  textAlign: 'center',
  '@media': {
    [mq.md]: {
      marginTop: space[24],
      padding: space[40],
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
  gap: space[6],
});

export const title = style({
  margin: 0,
  fontSize: fontSize[24],
  fontWeight: fontWeight.bold,
  lineHeight: 1.4,
  letterSpacing: '-0.6px',
});

export const lead = style({
  margin: 0,
  ...typeScale.body,
  color: vars.color.textSecondary,
});

export const details = style({
  alignSelf: 'stretch',
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
  padding: `${space[4]} ${space[20]}`,
  borderRadius: vars.radius.xl,
  backgroundColor: vars.color.surfaceSubtle,
  textAlign: 'left',
});

export const detail = style({
  display: 'grid',
  gridTemplateColumns: '96px minmax(0, 1fr)',
  gap: space[12],
  padding: `${space[12]} 0`,
  fontSize: fontSize[14],
  selectors: {
    '&:not(:last-child)': { borderBottom: `1px solid ${vars.color.border}` },
  },
});

export const term = style({
  color: vars.color.textSecondary,
});

export const value = style({
  margin: 0,
  fontWeight: fontWeight.semibold,
  color: vars.color.text,
  overflowWrap: 'anywhere',
});

export const actions = style({
  alignSelf: 'stretch',
  display: 'flex',
  flexDirection: 'column',
  gap: space[8],
});
