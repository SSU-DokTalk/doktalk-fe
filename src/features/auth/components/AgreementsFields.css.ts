import { style } from '@vanilla-extract/css';
import { fontSize, fontWeight, space, vars } from '@/design-system/tokens';

export const agreements = style({
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
  padding: `${space[4]} ${space[16]}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.xl,
});

/** '전체 동의' 줄. 체크박스는 줄 가운데에 오고 줄 전체를 차지해요. */
export const agreeAll = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: '52px',
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
});

export const agreeAllLabel = style({
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

export const optionalTag = style({
  fontWeight: fontWeight.semibold,
  color: vars.color.textTertiary,
});
