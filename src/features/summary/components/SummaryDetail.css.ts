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

/** 제목 묶음 (카테고리, 제목, 작성자) */

/* ---------- 요약한 책 ---------- */

export const book = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: `${space[12]} ${space[16]}`,
  margin: `${space[16]} ${layout.gutter} 0`,
  padding: space[16],
  borderRadius: vars.radius.xl,
  backgroundColor: vars.color.surfaceSubtle,
  '@media': {
    [mq.md]: { margin: 0 },
  },
});

export const bookText = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[2],
  flex: '1 1 160px',
  minWidth: 0,
});

export const bookLabel = style({
  ...typeScale.caption,

  color: vars.color.textSecondary,
});

export const bookTitle = style({
  ...typeScale.cardTitle,

  color: vars.color.text,
  overflowWrap: 'anywhere',
  '@media': {
    [mq.md]: { fontSize: fontSize[18] },
  },
});

export const bookAuthor = style({
  fontSize: fontSize[14],
  lineHeight: 1.5,
  color: vars.color.textSecondary,
});

export const inLibrary = style({
  color: vars.color.brand,
});

export const alert = style({
  flexBasis: '100%',
  margin: 0,
  ...typeScale.caption,

  color: vars.color.danger,
});

/* ---------- 본문 ---------- */

/** 결제 전 유료 내용 자리. 서버가 준 가짜 문장을 흐리게 보여줘요. */
export const teaser = style({
  position: 'relative',
  maxHeight: '7.5em',
  overflow: 'hidden',
  userSelect: 'none',
  filter: 'blur(3px)',
  selectors: {
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      background: `linear-gradient(180deg, transparent 0%, ${vars.color.surface} 90%)`,
    },
  },
});

export const ownerNote = style({
  margin: 0,
  padding: `${space[14]} ${space[16]}`,
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.infoSubtle,
  ...typeScale.bodySm,

  color: vars.color.info,
});

/* ---------- 결제 안내 (본문 안) ---------- */

export const paywall = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: space[8],
  margin: `${space[4]} ${layout.gutter} ${space[8]}`,
  padding: `${space[24]} ${space[20]}`,
  border: `1px solid ${vars.color.brandMuted}`,
  borderRadius: vars.radius['2xl'],
  backgroundColor: `color-mix(in srgb, ${vars.color.brandSubtle} 50%, ${vars.color.surface})`,
  textAlign: 'center',
  '@media': {
    [mq.md]: { margin: 0, padding: space[28] },
  },
});

export const paywallIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '48px',
  height: '48px',
  marginBottom: space[4],
  borderRadius: vars.radius.pill,
  backgroundColor: vars.color.brand,
  color: vars.color.textOnBrand,
});

globalStyle(`${paywallIcon} svg`, { width: '22px', height: '22px' });

export const paywallTitle = style({
  margin: 0,
  fontSize: fontSize[19],
  fontWeight: fontWeight.bold,
  lineHeight: 1.45,
  letterSpacing: '-0.5px',
  color: vars.color.text,
});

export const paywallNote = style({
  margin: 0,
  ...typeScale.bodySm,

  color: vars.color.textSecondary,
});

export const paywallPrice = style({
  margin: `${space[6]} 0 0`,
  fontSize: fontSize[26],
  fontWeight: fontWeight.extrabold,
  letterSpacing: '-0.6px',
  color: vars.color.text,
});

export const paywallActions = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: space[8],
  marginTop: space[4],
});

/* ---------- 오른쪽 구매 카드 ---------- */

export const purchaseCard = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[12],
  padding: space[20],
  borderRadius: vars.radius['2xl'],
  backgroundColor: vars.color.surface,
});

export const purchaseLabel = style({
  margin: 0,
  ...typeScale.captionStrong,

  color: vars.color.textTertiary,
});

export const purchasePrice = style({
  margin: 0,
  fontSize: fontSize[24],
  fontWeight: fontWeight.extrabold,
  lineHeight: 1.3,
  letterSpacing: '-0.6px',
  color: vars.color.text,
});

export const purchaseNote = style({
  margin: 0,
  fontSize: fontSize[13],
  lineHeight: 1.6,
  color: vars.color.textSecondary,
});
