import { style } from '@vanilla-extract/css';
import { vars } from '../../tokens/theme.css';

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
  // 오른쪽 화살표(18px) + 여백
  padding: '0 38px 0 0',
  border: 0,
  outline: 'none',
  background: 'transparent',
  appearance: 'none',
  fontFamily: vars.font.family,
  // iOS Safari는 16px보다 작은 선택 상자에 포커스하면 화면을 확대해요.
  fontSize: '16px',
  fontWeight: 500,
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
  right: '12px',
  top: '50%',
  width: '18px',
  height: '18px',
  marginTop: '-9px',
  color: vars.color.textTertiary,
  pointerEvents: 'none',
});
