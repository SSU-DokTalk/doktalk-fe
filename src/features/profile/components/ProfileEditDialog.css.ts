import { style } from '@vanilla-extract/css';
import {
  fontSize,
  fontWeight,
  mq,
  space,
  typeScale,
  vars,
} from '@/design-system/tokens';

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
  gap: space[22],
  overflowY: 'auto',
  padding: `${space[28]} ${space[20]}`,
  '@media': {
    [mq.md]: { padding: space[28] },
  },
});

/** 모바일: 사진 가운데 / 데스크톱: 사진 왼쪽, 버튼 오른쪽 */
export const photoRow = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: space[12],
  '@media': {
    [mq.md]: { flexDirection: 'row', gap: space[20] },
  },
});

export const photoControls = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: space[10],
  '@media': {
    [mq.md]: { alignItems: 'flex-start' },
  },
});

export const photoButtons = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: space[8],
});

export const hint = style({
  margin: 0,
  ...typeScale.caption,

  color: vars.color.textTertiary,
});

export const photoError = style({
  margin: 0,
  ...typeScale.caption,

  color: vars.color.danger,
});

export const required = style({
  fontSize: fontSize[12],
  fontWeight: fontWeight.bold,
  color: vars.color.brand,
});

export const alert = style({
  margin: 0,
  padding: `${space[12]} ${space[14]}`,
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.dangerSubtle,
  color: vars.color.danger,
  fontSize: fontSize[14],
  lineHeight: 1.5,
});
