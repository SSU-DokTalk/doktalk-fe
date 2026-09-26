import { style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

export const searchForm = style({
  display: 'flex',
  gap: '8px',
  margin: 0,
  padding: '12px 20px 0',
  '@media': {
    [mq.md]: { padding: 0 },
  },
});

export const searchField = style({ flex: '1 1 0' });

export const resultBar = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px 12px',
  padding: '12px 20px',
  '@media': {
    [mq.md]: { padding: 0 },
  },
});

export const resultCount = style({
  margin: 0,
  fontSize: fontSize.base,
  color: vars.color.textSecondary,
});

export const query = style({
  fontWeight: 700,
  color: vars.color.text,
});
