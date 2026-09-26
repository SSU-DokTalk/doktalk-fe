import { style } from '@vanilla-extract/css';
import { vars } from '../../tokens/theme.css';
import { fontWeight, inputFontSize } from '../../tokens/scale';

/** 오른쪽 화살표 크기와 자리 (px) */
const arrow = { size: 18, right: 12, gap: 8 };

/** 화살표 자리를 남겨 두려고 control(TextField와 같은 테두리)에 덧붙여요. */
export const control = style({
  position: 'relative',
  paddingRight: 0,
});

export const select = style({
  flex: '1 1 0',
  minWidth: 0,
  height: '100%',
  margin: 0,
  // 오른쪽 화살표 자리 + 글자와의 간격
  padding: `0 ${arrow.right + arrow.size + arrow.gap}px 0 0`,
  border: 0,
  outline: 'none',
  background: 'transparent',
  appearance: 'none',
  fontFamily: vars.font.family,
  fontSize: inputFontSize,
  fontWeight: fontWeight.medium,
  lineHeight: 1.5,
  color: vars.color.text,
  textOverflow: 'ellipsis',
  cursor: 'pointer',
  selectors: {
    '&:disabled': { cursor: 'not-allowed', color: vars.color.textSecondary },
  },
});

export const chevron = style({
  position: 'absolute',
  right: `${arrow.right}px`,
  top: '50%',
  width: `${arrow.size}px`,
  height: `${arrow.size}px`,
  marginTop: `-${arrow.size / 2}px`,
  color: vars.color.textTertiary,
  pointerEvents: 'none',
});
