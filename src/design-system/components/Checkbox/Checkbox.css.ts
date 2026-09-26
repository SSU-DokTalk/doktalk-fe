import { style } from '@vanilla-extract/css';
import { vars } from '../../tokens/theme.css';
import { fontSize } from '../../tokens/scale';

/** 라벨 전체를 눌러도 체크돼요. 누르는 영역은 44px 이상이에요. */
export const root = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  minHeight: '44px',
  fontFamily: vars.font.family,
  fontSize: fontSize.md,
  lineHeight: 1.5,
  color: vars.color.textMuted,
  cursor: 'pointer',
  selectors: {
    '&[data-disabled]': { cursor: 'not-allowed', opacity: 0.6 },
  },
});

export const input = style({
  width: '20px',
  height: '20px',
  flexShrink: 0,
  margin: 0,
  accentColor: vars.color.brand,
  cursor: 'inherit',
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '2px',
    },
  },
});
