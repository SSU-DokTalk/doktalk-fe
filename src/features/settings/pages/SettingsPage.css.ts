import { globalStyle, style } from '@vanilla-extract/css';
import {
  fontSize,
  fontWeight,
  layout,
  mq,
  space,
  typeScale,
  vars,
} from '@/design-system/tokens';
import { card } from '@/shared/components/Section.css';

export const page = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[8],
  '@media': {
    [mq.md]: { gap: space[16] },
  },
});

export const title = style([
  typeScale.pageTitle,
  {
    margin: 0,
    padding: `${space[16]} ${layout.gutter} ${space[8]}`,
    '@media': {
      [mq.md]: { padding: 0 },
    },
  },
]);

export const section = style([
  card,
  {
    display: 'flex',
    flexDirection: 'column',
    padding: `${space[20]} ${layout.gutter} ${space[4]}`,
    '@media': {
      [mq.md]: { padding: `${space[24]} ${space[28]} ${space[8]}` },
    },
  },
]);

export const sectionTitle = style({
  margin: `0 0 ${space[8]}`,
  ...typeScale.sectionTitle,
});

export const description = style({
  margin: `0 0 ${space[14]}`,
  ...typeScale.bodySm,

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
  columnGap: space[16],
  rowGap: space[4],
  minHeight: '64px',
  padding: `${space[12]} 0`,
  borderTop: `1px solid ${vars.color.borderSubtle}`,
  '@media': {
    [mq.md]: { gridTemplateColumns: '180px minmax(0, 1fr)' },
  },
});

export const term = style({
  fontSize: fontSize[14],
  fontWeight: fontWeight.semibold,
  color: vars.color.textBody,
  '@media': {
    [mq.md]: { fontSize: fontSize[15] },
  },
});

export const value = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[12],
  minWidth: 0,
  margin: 0,
  fontSize: fontSize[15],
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
  fontWeight: fontWeight.semibold,
});

export const profileHint = style({
  fontSize: fontSize[13],
  color: vars.color.textTertiary,
});

/** 언어 고르기: 카드 모양 라디오 3개 */
export const languages = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gap: space[10],
  margin: 0,
  padding: `0 0 ${space[16]}`,
  border: 0,
  '@media': {
    [mq.sm]: { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' },
  },
});

export const language = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[10],
  boxSizing: 'border-box',
  minHeight: '56px',
  padding: `0 ${space[16]}`,
  border: `1px solid ${vars.color.borderInput}`,
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.surface,
  fontSize: fontSize[15],
  fontWeight: fontWeight.semibold,
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
  fontSize: fontSize[15],
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
  fontWeight: fontWeight.bold,
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
  gap: space[16],
  minHeight: '72px',
  padding: `${space[12]} 0`,
  borderTop: `1px solid ${vars.color.borderSubtle}`,
});

export const manageText = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[2],
  minWidth: 0,
});

export const manageTitle = style({
  fontSize: fontSize[15],
  fontWeight: fontWeight.semibold,
});

export const manageHint = style({
  ...typeScale.caption,

  color: vars.color.textTertiary,
});

export const footer = style({
  display: 'flex',
  gap: space[12],
  padding: `${space[12]} ${layout.gutter} ${space[8]}`,
  fontSize: fontSize[13],
  color: vars.color.textTertiary,
  '@media': {
    [mq.md]: { padding: `${space[12]} ${space[4]} 0` },
  },
});

export const dialogText = style({
  margin: 0,
  ...typeScale.body,

  color: vars.color.textBody,
});

export const dialogError = style({
  margin: `${space[12]} 0 0`,
  fontSize: fontSize[14],
  color: vars.color.danger,
});

export const loginPrompt = style([
  card,
  {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space[12],
    padding: space[20],
    '@media': {
      [mq.md]: { padding: `${space[24]} ${space[28]}` },
    },
  },
]);
