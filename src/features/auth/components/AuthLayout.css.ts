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
  maxWidth: layout.maxWidth,
  height: layout.mobileBarHeight,
  padding: `0 ${space[6]} 0 ${space[4]}`,
  '@media': {
    [mq.md]: {
      height: layout.topNavHeight,
      padding: `0 ${layout.gutterDesktop}`,
    },
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
  gap: space[20],
  width: '100%',
  padding: `${space[8]} ${space[24]} ${space[32]}`,
  '@media': {
    [mq.md]: {
      gap: space[22],
      marginTop: space[32],
      padding: space[40],
      borderRadius: vars.radius['3xl'],
      backgroundColor: vars.color.surface,
      boxShadow: vars.shadow.panel,
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
  gap: space[4],
  '@media': {
    [mq.md]: { gap: space[6] },
  },
});

export const title = style({
  margin: 0,
  fontSize: fontSize[24],
  fontWeight: fontWeight.bold,
  lineHeight: 1.4,
  letterSpacing: '-0.6px',
  '@media': {
    [mq.md]: { fontSize: fontSize[26], letterSpacing: '-0.7px' },
  },
});

export const subtitle = style({
  margin: 0,
  ...typeScale.body,

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
  gap: `${space[4]} ${space[16]}`,
  minHeight: '64px',
  padding: `${space[12]} ${space[16]}`,
  fontSize: fontSize[13],
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
  fontWeight: fontWeight.bold,
});

/** 가운데 줄 + 글자 (소셜 로그인, 또는 이메일로 가입) */
export const divider = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[12],
  ...typeScale.caption,

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
  ...typeScale.body,

  color: vars.color.textSecondary,
});

export const switchLink = style({
  fontWeight: fontWeight.bold,
  color: vars.color.brand,
  textDecoration: 'none',
  selectors: {
    '&:hover': { textDecoration: 'underline' },
  },
});
