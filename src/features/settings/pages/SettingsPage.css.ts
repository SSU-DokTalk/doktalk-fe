import { globalStyle, style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';
import { card } from '@/shared/components/Section.css';

export const page = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  '@media': {
    [mq.md]: { gap: '16px' },
  },
});

export const title = style({
  margin: 0,
  padding: '16px 20px 8px',
  fontSize: '1.375rem',
  fontWeight: 700,
  lineHeight: 1.4,
  letterSpacing: '-0.6px',
  '@media': {
    [mq.md]: { padding: 0, fontSize: '1.625rem', letterSpacing: '-0.7px' },
  },
});

export const section = style([
  card,
  {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 20px 4px',
    '@media': {
      [mq.md]: { padding: '24px 28px 8px' },
    },
  },
]);

export const sectionTitle = style({
  margin: '0 0 8px',
  fontSize: fontSize.xl,
  fontWeight: 700,
  lineHeight: 1.5,
});

export const description = style({
  margin: '0 0 14px',
  fontSize: fontSize.md,
  lineHeight: 1.6,
  color: vars.color.textTertiary,
});

export const list = style({
  margin: 0,
  padding: 0,
});

/** 계정 정보 한 줄: 모바일은 이름 위·값 아래, 데스크톱은 이름 | 값 */
export const row = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  alignItems: 'center',
  columnGap: '16px',
  rowGap: '4px',
  minHeight: '64px',
  padding: '12px 0',
  borderTop: `1px solid ${vars.color.borderSubtle}`,
  '@media': {
    [mq.md]: { gridTemplateColumns: '180px minmax(0, 1fr)' },
  },
});

export const term = style({
  fontSize: fontSize.md,
  fontWeight: 600,
  color: vars.color.textBody,
  '@media': {
    [mq.md]: { fontSize: fontSize.base },
  },
});

export const value = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  minWidth: 0,
  margin: 0,
  fontSize: fontSize.base,
  color: vars.color.text,
  overflowWrap: 'anywhere',
});

/** 값 줄 오른쪽 끝 버튼 (프로필 편집) */
export const valueAction = style({
  marginLeft: 'auto',
  flexShrink: 0,
});

export const profileText = style({
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
});

export const profileName = style({
  fontWeight: 600,
});

export const profileHint = style({
  fontSize: fontSize.sm,
  color: vars.color.textTertiary,
});

/** 언어 고르기: 카드 모양 라디오 3개 */
export const languages = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gap: '10px',
  margin: 0,
  padding: '0 0 16px',
  border: 0,
  '@media': {
    [mq.sm]: { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' },
  },
});

export const language = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  boxSizing: 'border-box',
  minHeight: '56px',
  padding: '0 16px',
  border: `1px solid ${vars.color.borderInput}`,
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.surface,
  fontSize: fontSize.base,
  fontWeight: 600,
  cursor: 'pointer',
  selectors: {
    '&:has(input:checked)': {
      borderColor: vars.color.brand,
      boxShadow: `inset 0 0 0 1px ${vars.color.brand}`,
      backgroundColor: vars.color.brandSubtle,
      color: vars.color.brand,
    },
    '&:has(input:focus-visible)': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '2px',
    },
  },
});

globalStyle(`${language} input`, {
  width: '18px',
  height: '18px',
  margin: 0,
  accentColor: vars.color.brand,
});

export const linkRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: '56px',
  borderTop: `1px solid ${vars.color.borderSubtle}`,
  fontSize: fontSize.base,
  color: vars.color.text,
  textDecoration: 'none',
  selectors: {
    '&:hover': { color: vars.color.brand },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '-2px',
      borderRadius: vars.radius.sm,
    },
  },
});

export const linkEmphasis = style({
  fontWeight: 700,
});

export const chevron = style({
  width: '20px',
  height: '20px',
  color: vars.color.textDisabled,
});

export const manageRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '16px',
  minHeight: '72px',
  padding: '12px 0',
  borderTop: `1px solid ${vars.color.borderSubtle}`,
});

export const manageText = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  minWidth: 0,
});

export const manageTitle = style({
  fontSize: fontSize.base,
  fontWeight: 600,
});

export const manageHint = style({
  fontSize: fontSize.sm,
  lineHeight: 1.5,
  color: vars.color.textTertiary,
});

export const footer = style({
  display: 'flex',
  gap: '12px',
  padding: '12px 20px 8px',
  fontSize: fontSize.sm,
  color: vars.color.textTertiary,
  '@media': {
    [mq.md]: { padding: '12px 4px 0' },
  },
});

export const dialogText = style({
  margin: 0,
  fontSize: fontSize.base,
  lineHeight: 1.6,
  color: vars.color.textBody,
});

export const dialogError = style({
  margin: '12px 0 0',
  fontSize: fontSize.md,
  color: vars.color.danger,
});

export const loginPrompt = style([
  card,
  {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    padding: '20px',
    '@media': {
      [mq.md]: { padding: '24px 28px' },
    },
  },
]);
