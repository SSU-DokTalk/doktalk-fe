import { style } from '@vanilla-extract/css';
import {
  fontSize,
  fontWeight,
  inverseTheme,
  mq,
  space,
  typeScale,
  vars,
} from '@/design-system/tokens';

export const page = style({
  backgroundColor: vars.color.surface,
  color: vars.color.text,
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',
});

/* ---------- 첫 화면 (히어로) ---------- */

/** 남색 바탕에 오른쪽 위로 옅은 금빛이 번져요. 안의 버튼·카드는 금색으로 강조돼요. */
export const hero = style([
  inverseTheme,
  {
    background: `radial-gradient(circle at 88% 0%, ${vars.color.brandFaint} 0%, transparent 45%), ${vars.color.surface}`,
  },
]);

/** 모바일: 글 → 추천 카드 → 버튼 / 데스크톱: [글·버튼 | 카드] */
export const heroInner = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gridTemplateAreas: '"text" "card" "actions"',
  gap: space[24],
  paddingTop: space[32],
  paddingBottom: space[32],
  '@media': {
    [mq.lg]: {
      gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)',
      gridTemplateAreas: '"text card" "actions card"',
      alignItems: 'center',
      columnGap: space[48],
      rowGap: space[28],
      paddingTop: space[72],
      paddingBottom: space[80],
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
  gap: space[16],
  '@media': {
    [mq.lg]: { gap: space[20], alignSelf: 'end' },
  },
});

export const badge = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: space[6],
  height: '32px',
  padding: `0 ${space[14]}`,
  border: `1px solid ${vars.color.brandBorder}`,
  borderRadius: vars.radius.pill,
  backgroundColor: vars.color.brandSubtle,
  color: vars.color.brand,
  fontSize: fontSize[13],
  fontWeight: fontWeight.semibold,
});

export const badgeIcon = style({ width: '16px', height: '16px' });

export const heroTitle = style({
  margin: 0,
  fontSize: fontSize[30],
  fontWeight: fontWeight.bold,
  lineHeight: 1.3,
  letterSpacing: '-0.9px',
  '@media': {
    [mq.md]: { fontSize: fontSize[40], letterSpacing: '-1.2px' },
    [mq.lg]: {
      fontSize: fontSize[52],
      lineHeight: 1.25,
      letterSpacing: '-1.6px',
    },
  },
});

export const heroAccent = style({
  color: vars.color.brand,
});

export const heroDescription = style({
  margin: 0,
  maxWidth: '480px',
  fontSize: fontSize[16],
  lineHeight: 1.65,
  color: vars.color.textSecondary,
  '@media': {
    [mq.md]: { fontSize: fontSize[18] },
  },
});

export const heroActions = style({
  gridArea: 'actions',
  display: 'flex',
  flexDirection: 'column',
  gap: space[10],
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
      paddingTop: space[24],
      selectors: {
        // 뒤에 겹친 반투명 판 (장식)
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '30px',
          right: 0,
          bottom: space[24],
          borderRadius: vars.radius['3xl'],
          border: `1px solid ${vars.color.surfaceGlassBorder}`,
          backgroundColor: vars.color.surfaceGlass,
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
  // 바탕보다 살짝 밝은 판. 뒤에 겹친 장식 판이 비치지 않게 불투명하게 깔아요.
  background: `linear-gradient(${vars.color.surfaceGlass}, ${vars.color.surfaceGlass}), ${vars.color.surface}`,
  border: `1px solid ${vars.color.surfaceGlassBorder}`,
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
      marginRight: space[20],
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
  padding: `${space[20]} 0`,
  // 회색 판(bookCoverStage)을 카드 왼쪽에 꽉 채워요.
  borderRadius: 0,
});

export const featuredBody = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[8],
  flex: '1 1 0',
  minWidth: 0,
  padding: space[18],
  '@media': {
    // 표지 판 옆 글 영역은 좌우를 토큰 사이 값(26px)으로 조금 더 넓혀요.
    [mq.md]: { gap: space[10], padding: `${space[24]} 26px` },
  },
});

export const featuredLabel = style({
  fontSize: fontSize[13],
  fontWeight: fontWeight.bold,
  color: vars.color.info,
});

export const featuredTitle = style({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  fontSize: fontSize[17],
  fontWeight: fontWeight.bold,
  lineHeight: 1.4,
  letterSpacing: '-0.5px',
  selectors: {
    [`${featured}:hover &`]: { color: vars.color.brand },
  },
  '@media': {
    [mq.md]: { fontSize: fontSize[22] },
  },
});

export const featuredMeta = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[4],
  fontSize: fontSize[14],
  color: vars.color.textSecondary,
});

export const metaLine = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[8],
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
  gap: space[12],
  marginTop: 'auto',
  paddingTop: space[8],
});

export const featuredPrice = style({
  fontSize: fontSize[17],
  fontWeight: fontWeight.bold,
  '@media': {
    [mq.md]: { fontSize: fontSize[20] },
  },
});

/** 카드 전체가 링크라서 버튼 모양만 흉내 내요 (링크 이름의 끝 말로 읽혀요) */
export const fakeButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  height: '40px',
  padding: `0 ${space[16]}`,
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.brand,
  color: vars.color.textOnBrand,
  fontSize: fontSize[14],
  fontWeight: fontWeight.semibold,
  '@media': {
    [mq.md]: {
      height: '44px',
      padding: `0 ${space[18]}`,
      fontSize: fontSize[15],
    },
  },
});

/* ---------- 구역 공통 ---------- */

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[20],
  paddingTop: space[40],
  paddingBottom: space[40],
  '@media': {
    [mq.md]: {
      gap: space[28],
      paddingTop: space[56],
      paddingBottom: space[64],
    },
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
  gap: `${space[12]} ${space[24]}`,
});

export const sectionTitles = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[4],
});

export const sectionTitle = style({
  margin: 0,
  ...typeScale.heading,
  '@media': {
    [mq.md]: { fontSize: fontSize[28], letterSpacing: '-0.8px' },
  },
});

export const sectionDescription = style({
  margin: 0,
  ...typeScale.bodySm,
  color: vars.color.textTertiary,
  '@media': {
    [mq.md]: { fontSize: fontSize[15] },
  },
});

export const sectionTools = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: `${space[12]} ${space[20]}`,
});

export const seeAll = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: space[2],
  minHeight: '44px',
  fontSize: fontSize[15],
  fontWeight: fontWeight.semibold,
  color: vars.color.brand,
  textDecoration: 'none',
  selectors: {
    '&:hover': { textDecoration: 'underline' },
  },
});

export const seeAllIcon = style({ width: '18px', height: '18px' });

export const chips = style({
  paddingTop: space[8],
  '@media': {
    [mq.md]: { paddingTop: space[28] },
  },
});

export const state = style({
  borderRadius: vars.radius['2xl'],
  border: `1px solid ${vars.color.borderSubtle}`,
  backgroundColor: vars.color.surface,
});
