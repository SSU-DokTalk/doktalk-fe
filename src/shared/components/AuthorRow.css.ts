import { globalStyle, style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

export const row = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginTop: '2px',
  '@media': {
    [mq.md]: { gap: '12px', marginTop: 0 },
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
  fontSize: fontSize.base,
  fontWeight: 600,
  lineHeight: 1.5,
});

globalStyle(`${link}:hover ${name}`, {
  textDecoration: 'underline',
});

export const meta = style({
  fontSize: fontSize.sm,
  lineHeight: 1.5,
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
  gap: '2px',
});
