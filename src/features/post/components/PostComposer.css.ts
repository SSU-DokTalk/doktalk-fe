import { style } from '@vanilla-extract/css';
import { fontSize, vars } from '@/design-system/tokens';

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
  gap: '16px',
  minHeight: 0,
  overflowY: 'auto',
});

export const notice = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px 12px',
  margin: 0,
  padding: '10px 14px',
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.infoSubtle,
  fontSize: fontSize.md,
  color: vars.color.info,
});

export const alert = style({
  margin: 0,
  fontSize: fontSize.sm,
  lineHeight: 1.5,
  color: vars.color.danger,
});

export const status = style({
  marginRight: 'auto',
  alignSelf: 'center',
  fontSize: fontSize.sm,
  color: vars.color.textSecondary,
});
