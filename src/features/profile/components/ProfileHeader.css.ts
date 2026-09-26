import { style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

/** 모바일은 흰 띠, 데스크톱은 둥근 흰 카드 (탭까지 한 카드) */
export const header = style({
  overflow: 'hidden',
  backgroundColor: vars.color.surface,
  '@media': {
    [mq.md]: { borderRadius: vars.radius['2xl'] },
  },
});

/**
 * 모바일: [사진 이름·숫자] / 소개 / 버튼
 * 데스크톱: [사진 | 이름·숫자·소개 | 버튼]
 */
export const top = style({
  display: 'grid',
  gridTemplateColumns: '72px minmax(0, 1fr)',
  gridTemplateAreas: '"avatar info" "intro intro" "actions actions"',
  alignItems: 'center',
  columnGap: '16px',
  rowGap: '12px',
  padding: '20px',
  '@media': {
    [mq.md]: {
      gridTemplateColumns: '96px minmax(0, 1fr) auto',
      gridTemplateAreas: '"avatar info actions" "avatar intro actions"',
      alignItems: 'start',
      columnGap: '24px',
      rowGap: '4px',
      padding: '32px 32px 24px',
    },
  },
});

export const avatar = style({ gridArea: 'avatar' });

export const info = style({
  gridArea: 'info',
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
  '@media': {
    [mq.md]: { gap: '6px' },
  },
});

export const name = style({
  margin: 0,
  fontSize: '1.25rem',
  fontWeight: 700,
  lineHeight: 1.4,
  letterSpacing: '-0.5px',
  color: vars.color.text,
  overflowWrap: 'anywhere',
  '@media': {
    [mq.md]: { fontSize: '1.5rem', letterSpacing: '-0.6px' },
  },
});

export const counts = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4px',
  marginLeft: '-8px',
});

/** 팔로워·팔로잉 숫자. 누르면 목록이 떠요 (로그아웃이면 글자만). */
export const count = style({
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '44px',
  padding: '0 8px',
  border: 0,
  borderRadius: vars.radius.sm,
  background: 'transparent',
  color: vars.color.textSecondary,
  fontFamily: vars.font.family,
  fontSize: fontSize.md,
  whiteSpace: 'nowrap',
  '@media': {
    [mq.md]: { minHeight: '36px', fontSize: fontSize.base },
  },
});

export const countButton = style({
  cursor: 'pointer',
  selectors: {
    '&:hover': { backgroundColor: vars.color.surfaceSubtle },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '-2px',
    },
  },
});

export const countNumber = style({
  fontWeight: 700,
  color: vars.color.text,
});

export const intro = style({
  gridArea: 'intro',
  margin: 0,
  maxWidth: '520px',
  fontSize: fontSize.base,
  lineHeight: 1.65,
  color: vars.color.textBody,
  whiteSpace: 'pre-wrap',
  overflowWrap: 'anywhere',
});

export const introEmpty = style({
  color: vars.color.textTertiary,
});

export const actions = style({
  gridArea: 'actions',
  display: 'flex',
  gap: '8px',
  '@media': {
    [mq.md]: { flexShrink: 0 },
  },
});

/** 모바일에서 프로필 편집·팔로우 버튼이 한 줄을 채워요. */
export const mainAction = style({
  flex: '1 1 0',
  '@media': {
    [mq.md]: { flex: '0 0 auto' },
  },
});

export const tabs = style({
  padding: '0 8px',
  borderTop: `1px solid ${vars.color.borderSubtle}`,
  '@media': {
    [mq.belowMd]: { borderBottom: `1px solid ${vars.color.border}` },
    [mq.md]: { padding: '0 20px' },
  },
});
