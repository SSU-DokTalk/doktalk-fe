import { style } from '@vanilla-extract/css';
import { fontSize, space, typeScale, vars } from '@/design-system/tokens';

/** 머리글·버튼 줄은 고정하고 입력 칸만 스크롤해요. */
export const popup = style({
  overflow: 'hidden',
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 auto',
  minHeight: 0,
  margin: 0,
});

export const body = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[16],
  minHeight: 0,
  overflowY: 'auto',
});

export const notice = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: `${space[8]} ${space[12]}`,
  margin: 0,
  padding: `${space[10]} ${space[14]}`,
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.infoSubtle,
  fontSize: fontSize[14],
  color: vars.color.info,
});

export const alert = style({
  margin: 0,
  ...typeScale.caption,

  color: vars.color.danger,
});

export const status = style({
  marginRight: 'auto',
  alignSelf: 'center',
  fontSize: fontSize[13],
  color: vars.color.textSecondary,
});
