import { style, type StyleRule } from '@vanilla-extract/css';
import { vars } from '../tokens/theme.css';

/**
 * 키보드 포커스 표시예요.
 * 기존 _reset.scss가 `button:focus { outline: none }`으로 포커스 표시를 지우고 있어서,
 * 클래스 + :focus-visible 조합(명시도 0,2,0)으로 다시 그려요.
 */
export const focusRing: StyleRule = {
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '2px',
    },
  },
};

/** 화면에는 안 보이고 스크린 리더만 읽는 텍스트 */
export const visuallyHidden = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
});
