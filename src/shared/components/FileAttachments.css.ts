import { globalStyle, style } from '@vanilla-extract/css';
import {
  fontSize,
  fontWeight,
  mq,
  space,
  typeScale,
  vars,
} from '@/design-system/tokens';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[8],
  minWidth: 0,
});

export const label = style({
  ...typeScale.label,

  color: vars.color.text,
});

export const addRow = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[8],
  '@media': {
    [mq.md]: { flexDirection: 'row', alignItems: 'center', gap: space[12] },
  },
});

export const addButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: space[6],
  minHeight: '48px',
  padding: `0 ${space[18]}`,
  border: `1px dashed ${vars.color.borderInput}`,
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.surface,
  fontFamily: vars.font.family,
  fontSize: fontSize[14],
  fontWeight: fontWeight.semibold,
  color: vars.color.brand,
  cursor: 'pointer',
  selectors: {
    '&:hover:not(:disabled)': { backgroundColor: vars.color.brandSubtle },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '2px',
    },
    '&:disabled': {
      color: vars.color.textDisabled,
      cursor: 'not-allowed',
    },
  },
});

globalStyle(`${addButton} svg`, { width: '18px', height: '18px' });

export const count = style({
  fontWeight: fontWeight.medium,
  color: vars.color.textSecondary,
});

export const hint = style({
  ...typeScale.caption,

  color: vars.color.textSecondary,
});

export const error = style({
  margin: 0,
  ...typeScale.caption,

  color: vars.color.danger,
});

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[8],
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const row = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[10],
  minHeight: '48px',
  padding: `0 ${space[4]} 0 ${space[14]}`,
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.surfaceSubtle,
});

globalStyle(`${row} > svg`, {
  width: '20px',
  height: '20px',
  flexShrink: 0,
  color: vars.color.infoIcon,
});

export const name = style({
  flex: '1 1 auto',
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: fontSize[14],
  fontWeight: fontWeight.semibold,
  color: vars.color.text,
});

export const size = style({
  flexShrink: 0,
  fontSize: fontSize[13],
  color: vars.color.textSecondary,
});

/** 파일 선택 창은 버튼으로 열어요. */
export const input = style({
  display: 'none',
});
