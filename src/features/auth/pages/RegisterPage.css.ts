import { style } from '@vanilla-extract/css';
import { fontSize, fontWeight, space, vars } from '@/design-system/tokens';

export const socialTitle = style({
  margin: 0,
  fontSize: fontSize[14],
  fontWeight: fontWeight.semibold,
  color: vars.color.textBody,
});

export const social = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[12],
});

export const passwordGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[8],
});

export const rules = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: `${space[4]} ${space[14]}`,
  margin: 0,
  padding: 0,
  listStyle: 'none',
  fontSize: fontSize[13],
});

export const rule = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[4],
  color: vars.color.textTertiary,
  fontWeight: fontWeight.medium,
});

export const ruleMet = style({
  color: vars.color.info,
  fontWeight: fontWeight.semibold,
});

export const ruleIcon = style({
  width: '16px',
  height: '16px',
  flexShrink: 0,
});

export const agreements = style({
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
  padding: `${space[4]} ${space[16]}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.xl,
});

export const agreeAll = style({
  minHeight: '52px',
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
  fontSize: fontSize[16],
  fontWeight: fontWeight.bold,
});

export const agreement = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[10],
  minHeight: '44px',
});

export const agreementLabel = style({
  flex: '1 1 auto',
  fontSize: fontSize[14],
  color: vars.color.textBody,
});

export const requiredTag = style({
  fontWeight: fontWeight.semibold,
  color: vars.color.brand,
});

export const viewLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '44px',
  padding: `0 ${space[4]}`,
  fontSize: fontSize[13],
  fontWeight: fontWeight.semibold,
  color: vars.color.textSecondary,
  textDecoration: 'underline',
  textUnderlineOffset: '2px',
});

export const agreementError = style({
  margin: `${space[4]} 0 0`,
  fontSize: fontSize[13],
  color: vars.color.danger,
});
