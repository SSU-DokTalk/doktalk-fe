import { style } from '@vanilla-extract/css';
import { fontSize, vars } from '@/design-system/tokens';

export const socialTitle = style({
  margin: 0,
  fontSize: fontSize.md,
  fontWeight: 600,
  color: vars.color.textBody,
});

export const social = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const passwordGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const rules = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4px 14px',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  fontSize: fontSize.sm,
});

export const rule = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  color: vars.color.textTertiary,
  fontWeight: 500,
});

export const ruleMet = style({
  color: vars.color.info,
  fontWeight: 600,
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
  padding: '4px 16px',
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.xl,
});

export const agreeAll = style({
  minHeight: '52px',
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
  fontSize: fontSize.lg,
  fontWeight: 700,
});

export const agreement = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  minHeight: '44px',
});

export const agreementLabel = style({
  flex: '1 1 auto',
  fontSize: fontSize.md,
  color: vars.color.textBody,
});

export const requiredTag = style({
  fontWeight: 600,
  color: vars.color.brand,
});

export const viewLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '44px',
  padding: '0 4px',
  fontSize: fontSize.sm,
  fontWeight: 600,
  color: vars.color.textSecondary,
  textDecoration: 'underline',
  textUnderlineOffset: '2px',
});

export const agreementError = style({
  margin: '4px 0 0',
  fontSize: fontSize.sm,
  color: vars.color.danger,
});
