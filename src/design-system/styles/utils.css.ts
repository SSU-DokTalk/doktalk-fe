import { style, type StyleRule } from '@vanilla-extract/css';
import { vars } from '../tokens/theme.css';

/**
 * 키보드 포커스 표시예요. reset.css의 기본 링과 같은 모양이라,
 * 컴포넌트가 outline을 따로 바꾼 뒤에도 같은 링을 다시 쓰고 싶을 때 펼쳐 넣어요.
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
