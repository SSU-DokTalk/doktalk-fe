import { style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

/** 모바일은 흰 화면, 데스크톱은 옅은 남색 배경 위 가운데 카드 */
export const page = style({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100dvh',
  backgroundColor: vars.color.surface,
  color: vars.color.text,
  fontFamily: vars.font.family,
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',
  '@media': {
    [mq.md]: {
      background: `linear-gradient(134deg, ${vars.color.brandSubtle} 0%, ${vars.color.canvas} 55%, ${vars.color.brandSubtle} 100%)`,
    },
  },
});

export const header = style({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: '1328px',
  height: '56px',
  padding: '0 6px 0 4px',
  '@media': {
    [mq.md]: { height: '72px', padding: '0 24px' },
  },
});

export const logoLink = style({
  display: 'flex',
  borderRadius: vars.radius.sm,
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '4px',
    },
  },
});

export const logo = style({
  display: 'block',
  width: 'auto',
  height: '38px',
  '@media': {
    [mq.md]: { height: '42px' },
  },
});

export const card = style({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: '100%',
  padding: '8px 24px 32px',
  '@media': {
    [mq.md]: {
      gap: '22px',
      marginTop: '32px',
      padding: '40px',
      borderRadius: vars.radius['3xl'],
      backgroundColor: vars.color.surface,
      boxShadow: '0 12px 40px rgba(17, 24, 39, 0.08)',
    },
  },
});

export const narrow = style({
  '@media': {
    [mq.md]: { width: '440px' },
  },
});

export const wide = style({
  '@media': {
    [mq.md]: { width: '560px' },
  },
});

export const cardLogo = style({
  alignSelf: 'flex-start',
  '@media': {
    [mq.md]: { display: 'none' },
  },
});

export const titles = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  '@media': {
    [mq.md]: { gap: '6px' },
  },
});

export const title = style({
  margin: 0,
  fontSize: '1.5rem',
  fontWeight: 700,
  lineHeight: 1.4,
  letterSpacing: '-0.6px',
  '@media': {
    [mq.md]: { fontSize: '1.625rem', letterSpacing: '-0.7px' },
  },
});

export const subtitle = style({
  margin: 0,
  fontSize: fontSize.base,
  lineHeight: 1.6,
  color: vars.color.textSecondary,
});

export const spacer = style({
  flexGrow: 1,
});

export const footer = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px 16px',
  minHeight: '64px',
  padding: '12px 16px',
  fontSize: fontSize.sm,
  color: vars.color.textSecondary,
});

export const footerLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '24px',
  color: vars.color.textSecondary,
  textDecoration: 'none',
  selectors: {
    '&:hover': { color: vars.color.text, textDecoration: 'underline' },
  },
});

export const footerEmphasis = style({
  fontWeight: 700,
});

/** 가운데 줄 + 글자 (소셜 로그인, 또는 이메일로 가입) */
export const divider = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontSize: fontSize.sm,
  lineHeight: 1.5,
  color: vars.color.textTertiary,
  selectors: {
    '&::before, &::after': {
      content: '""',
      flex: '1 1 0',
      height: '1px',
      backgroundColor: vars.color.border,
    },
  },
});

export const switchText = style({
  margin: 0,
  textAlign: 'center',
  fontSize: fontSize.base,
  lineHeight: 1.6,
  color: vars.color.textSecondary,
});

export const switchLink = style({
  fontWeight: 700,
  color: vars.color.brand,
  textDecoration: 'none',
  selectors: {
    '&:hover': { textDecoration: 'underline' },
  },
});
