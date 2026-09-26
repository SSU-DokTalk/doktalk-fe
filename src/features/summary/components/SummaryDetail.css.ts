import { globalStyle, style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

/** 제목 묶음 (카테고리, 제목, 작성자) */

/* ---------- 요약한 책 ---------- */

export const book = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '12px 16px',
  margin: '16px 20px 0',
  padding: '16px',
  borderRadius: vars.radius.xl,
  backgroundColor: vars.color.surfaceSubtle,
  '@media': {
    [mq.md]: { margin: 0 },
  },
});

export const bookText = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  flex: '1 1 160px',
  minWidth: 0,
});

export const bookLabel = style({
  fontSize: fontSize.sm,
  lineHeight: 1.5,
  color: vars.color.textSecondary,
});

export const bookTitle = style({
  fontSize: fontSize.xl,
  fontWeight: 700,
  lineHeight: 1.4,
  letterSpacing: '-0.4px',
  color: vars.color.text,
  overflowWrap: 'anywhere',
  '@media': {
    [mq.md]: { fontSize: '1.125rem' },
  },
});

export const bookAuthor = style({
  fontSize: fontSize.md,
  lineHeight: 1.5,
  color: vars.color.textSecondary,
});

export const inLibrary = style({
  color: vars.color.brand,
});

export const alert = style({
  flexBasis: '100%',
  margin: 0,
  fontSize: fontSize.sm,
  lineHeight: 1.5,
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
  padding: '14px 16px',
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.infoSubtle,
  fontSize: fontSize.md,
  lineHeight: 1.6,
  color: vars.color.info,
});

/* ---------- 결제 안내 (본문 안) ---------- */

export const paywall = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  margin: '4px 20px 8px',
  padding: '24px 20px',
  border: `1px solid ${vars.color.brandMuted}`,
  borderRadius: vars.radius['2xl'],
  backgroundColor: `color-mix(in srgb, ${vars.color.brandSubtle} 50%, ${vars.color.surface})`,
  textAlign: 'center',
  '@media': {
    [mq.md]: { margin: 0, padding: '28px' },
  },
});

export const paywallIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '48px',
  height: '48px',
  marginBottom: '4px',
  borderRadius: vars.radius.pill,
  backgroundColor: vars.color.brand,
  color: vars.color.textOnBrand,
});

globalStyle(`${paywallIcon} svg`, { width: '22px', height: '22px' });

export const paywallTitle = style({
  margin: 0,
  fontSize: '1.1875rem',
  fontWeight: 700,
  lineHeight: 1.45,
  letterSpacing: '-0.5px',
  color: vars.color.text,
});

export const paywallNote = style({
  margin: 0,
  fontSize: fontSize.md,
  lineHeight: 1.6,
  color: vars.color.textSecondary,
});

export const paywallPrice = style({
  margin: '6px 0 0',
  fontSize: '1.625rem',
  fontWeight: 800,
  letterSpacing: '-0.6px',
  color: vars.color.text,
});

export const paywallActions = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '8px',
  marginTop: '4px',
});

/* ---------- 오른쪽 구매 카드 ---------- */

export const purchaseCard = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '20px',
  borderRadius: vars.radius['2xl'],
  backgroundColor: vars.color.surface,
});

export const purchaseLabel = style({
  margin: 0,
  fontSize: fontSize.sm,
  fontWeight: 600,
  lineHeight: 1.5,
  color: vars.color.textTertiary,
});

export const purchasePrice = style({
  margin: 0,
  fontSize: '1.5rem',
  fontWeight: 800,
  lineHeight: 1.3,
  letterSpacing: '-0.6px',
  color: vars.color.text,
});

export const purchaseNote = style({
  margin: 0,
  fontSize: fontSize.sm,
  lineHeight: 1.6,
  color: vars.color.textSecondary,
});
