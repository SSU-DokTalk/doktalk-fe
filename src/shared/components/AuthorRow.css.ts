import { globalStyle, style } from '@vanilla-extract/css';
import {
  fontSize,
  fontWeight,
  mq,
  space,
  typeScale,
  vars,
} from '@/design-system/tokens';

export const row = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[10],
  marginTop: space[2],
  '@media': {
    [mq.md]: { gap: space[12], marginTop: 0 },
  },
});

/** 모바일은 이름 칸이 늘어나서 팔로우 버튼이 오른쪽 끝에 붙어요. */
export const link = style({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 auto',
  minWidth: 0,
  color: vars.color.text,
  textDecoration: 'none',
  borderRadius: vars.radius.xs,
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: '2px',
    },
  },
  '@media': {
    [mq.md]: { flex: '0 1 auto' },
  },
});

export const name = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: fontSize[15],
  fontWeight: fontWeight.semibold,
  lineHeight: 1.5,
});

globalStyle(`${link}:hover ${name}`, {
  textDecoration: 'underline',
});

export const meta = style({
  ...typeScale.caption,
  color: vars.color.textTertiary,
});

export const spacer = style({
  display: 'none',
  '@media': {
    [mq.md]: { display: 'block', flex: '1 1 auto' },
  },
});

export const actions = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[2],
});
