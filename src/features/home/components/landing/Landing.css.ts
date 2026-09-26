import { style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

export const page = style({
  backgroundColor: vars.color.surface,
  color: vars.color.text,
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',
});

/* ---------- 첫 화면 (히어로) ---------- */

export const hero = style({
  background: `linear-gradient(134deg, ${vars.color.brandSubtle} 0%, ${vars.color.canvas} 55%, ${vars.color.brandSubtle} 100%)`,
});

/** 모바일: 글 → 추천 카드 → 버튼 / 데스크톱: [글·버튼 | 카드] */
export const heroInner = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gridTemplateAreas: '"text" "card" "actions"',
  gap: '24px',
  paddingTop: '32px',
  paddingBottom: '32px',
  '@media': {
    [mq.lg]: {
      gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)',
      gridTemplateAreas: '"text card" "actions card"',
      alignItems: 'center',
      columnGap: '48px',
      rowGap: '28px',
      paddingTop: '72px',
      paddingBottom: '80px',
    },
    [mq.xl]: {
      gridTemplateColumns: 'minmax(0, 620px) minmax(0, 560px)',
      justifyContent: 'space-between',
    },
  },
});

/** 추천 카드가 없으면 글과 버튼만 한 칸으로 */
export const heroInnerSingle = style({
  '@media': {
    [mq.lg]: {
      gridTemplateColumns: 'minmax(0, 720px)',
      gridTemplateAreas: '"text" "actions"',
    },
    // 넓은 화면 규칙보다 뒤에 오도록 xl에도 같은 값을 둬요.
    [mq.xl]: {
      gridTemplateColumns: 'minmax(0, 720px)',
      gridTemplateAreas: '"text" "actions"',
    },
  },
});

export const heroText = style({
  gridArea: 'text',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '16px',
  '@media': {
    [mq.lg]: { gap: '20px', alignSelf: 'end' },
  },
});

export const badge = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  height: '32px',
  padding: '0 14px',
  border: `1px solid ${vars.color.brandMuted}`,
  borderRadius: vars.radius.pill,
  backgroundColor: vars.color.surface,
  color: vars.color.brand,
  fontSize: fontSize.sm,
  fontWeight: 600,
});

export const badgeIcon = style({ width: '16px', height: '16px' });

export const heroTitle = style({
  margin: 0,
  fontSize: '1.875rem',
  fontWeight: 700,
  lineHeight: 1.3,
  letterSpacing: '-0.9px',
  '@media': {
    [mq.md]: { fontSize: '2.5rem', letterSpacing: '-1.2px' },
    [mq.lg]: { fontSize: '3.25rem', lineHeight: 1.25, letterSpacing: '-1.6px' },
  },
});

export const heroAccent = style({
  color: vars.color.brand,
});

export const heroDescription = style({
  margin: 0,
  maxWidth: '480px',
  fontSize: fontSize.lg,
  lineHeight: 1.65,
  color: vars.color.textSecondary,
  '@media': {
    [mq.md]: { fontSize: '1.125rem' },
  },
});

export const heroActions = style({
  gridArea: 'actions',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  '@media': {
    [mq.sm]: { flexDirection: 'row' },
    [mq.lg]: { alignSelf: 'start' },
  },
});

export const heroCardArea = style({
  gridArea: 'card',
  position: 'relative',
  '@media': {
    [mq.lg]: {
      paddingTop: '24px',
      selectors: {
        // 뒤에 겹친 반투명 판 (장식)
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '30px',
          right: 0,
          bottom: '24px',
          borderRadius: vars.radius['3xl'],
          border: '1px solid rgba(255, 255, 255, 0.9)',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
        },
      },
    },
  },
});

export const featured = style({
  position: 'relative',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: vars.radius['2xl'],
  backgroundColor: vars.color.surface,
  boxShadow: vars.shadow.lg,
  color: vars.color.text,
  textDecoration: 'none',
  selectors: {
    '&:focus-visible': {
      outline: `3px solid ${vars.color.brand}`,
      outlineOffset: '3px',
    },
  },
  '@media': {
    [mq.lg]: {
      minHeight: '262px',
      borderRadius: vars.radius['3xl'],
      marginRight: '20px',
    },
  },
});

export const featuredStage = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '38%',
  maxWidth: '210px',
  padding: '20px 0',
  // 회색 판(bookCoverStage)을 카드 왼쪽에 꽉 채워요.
  borderRadius: 0,
});

export const featuredBody = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  flex: '1 1 0',
  minWidth: 0,
  padding: '18px',
  '@media': {
    [mq.md]: { gap: '10px', padding: '24px 26px' },
  },
});

export const featuredLabel = style({
  fontSize: fontSize.sm,
  fontWeight: 700,
  color: vars.color.info,
});

export const featuredTitle = style({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  fontSize: fontSize.xl,
  fontWeight: 700,
  lineHeight: 1.4,
  letterSpacing: '-0.5px',
  selectors: {
    [`${featured}:hover &`]: { color: vars.color.brand },
  },
  '@media': {
    [mq.md]: { fontSize: '1.375rem' },
  },
});

export const featuredMeta = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  fontSize: fontSize.md,
  color: vars.color.textSecondary,
});

export const metaLine = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const metaIcon = style({
  width: '16px',
  height: '16px',
  flexShrink: 0,
  color: vars.color.infoIcon,
});

export const featuredFoot = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  marginTop: 'auto',
  paddingTop: '8px',
});

export const featuredPrice = style({
  fontSize: fontSize.xl,
  fontWeight: 700,
  '@media': {
    [mq.md]: { fontSize: '1.25rem' },
  },
});

/** 카드 전체가 링크라서 버튼 모양만 흉내 내요 (링크 이름의 끝 말로 읽혀요) */
export const fakeButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  height: '40px',
  padding: '0 16px',
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.brand,
  color: vars.color.textOnBrand,
  fontSize: fontSize.md,
  fontWeight: 600,
  '@media': {
    [mq.md]: { height: '44px', padding: '0 18px', fontSize: fontSize.base },
  },
});

/* ---------- 구역 공통 ---------- */

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  paddingTop: '40px',
  paddingBottom: '40px',
  '@media': {
    [mq.md]: { gap: '28px', paddingTop: '56px', paddingBottom: '64px' },
  },
});

export const band = style({
  backgroundColor: vars.color.canvas,
});

export const sectionHead = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: '12px 24px',
});

export const sectionTitles = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export const sectionTitle = style({
  margin: 0,
  fontSize: '1.375rem',
  fontWeight: 700,
  lineHeight: 1.4,
  letterSpacing: '-0.6px',
  '@media': {
    [mq.md]: { fontSize: '1.75rem', letterSpacing: '-0.8px' },
  },
});

export const sectionDescription = style({
  margin: 0,
  fontSize: fontSize.md,
  lineHeight: 1.6,
  color: vars.color.textTertiary,
  '@media': {
    [mq.md]: { fontSize: fontSize.base },
  },
});

export const sectionTools = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '12px 20px',
});

export const seeAll = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '2px',
  minHeight: '44px',
  fontSize: fontSize.base,
  fontWeight: 600,
  color: vars.color.brand,
  textDecoration: 'none',
  selectors: {
    '&:hover': { textDecoration: 'underline' },
  },
});

export const seeAllIcon = style({ width: '18px', height: '18px' });

export const chips = style({
  paddingTop: '8px',
  '@media': {
    [mq.md]: { paddingTop: '28px' },
  },
});

export const state = style({
  borderRadius: vars.radius['2xl'],
  border: `1px solid ${vars.color.borderSubtle}`,
  backgroundColor: vars.color.surface,
});
