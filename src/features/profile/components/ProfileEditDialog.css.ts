import { style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

/** 모바일은 화면 전체라 본문만 스크롤하고 저장 버튼 줄은 아래에 붙여 둬요. */
export const popup = style({
  overflow: 'hidden',
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 auto',
  minHeight: 0,
});

export const body = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '22px',
  overflowY: 'auto',
  padding: '28px 20px',
  '@media': {
    [mq.md]: { padding: '28px' },
  },
});

/** 모바일: 사진 가운데 / 데스크톱: 사진 왼쪽, 버튼 오른쪽 */
export const photoRow = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
  '@media': {
    [mq.md]: { flexDirection: 'row', gap: '20px' },
  },
});

export const photoControls = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  '@media': {
    [mq.md]: { alignItems: 'flex-start' },
  },
});

export const photoButtons = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '8px',
});

export const hint = style({
  margin: 0,
  fontSize: fontSize.sm,
  lineHeight: 1.5,
  color: vars.color.textTertiary,
});

export const photoError = style({
  margin: 0,
  fontSize: fontSize.sm,
  lineHeight: 1.5,
  color: vars.color.danger,
});

export const required = style({
  fontSize: fontSize.xs,
  fontWeight: 700,
  color: vars.color.brand,
});

export const alert = style({
  margin: 0,
  padding: '12px 14px',
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.dangerSubtle,
  color: vars.color.danger,
  fontSize: fontSize.md,
  lineHeight: 1.5,
});
