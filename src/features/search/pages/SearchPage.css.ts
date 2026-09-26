import { style } from '@vanilla-extract/css';
import {
  fontSize,
  fontWeight,
  layout,
  mq,
  space,
  vars,
} from '@/design-system/tokens';

export const searchForm = style({
  display: 'flex',
  gap: space[8],
  margin: 0,
  padding: `${space[12]} ${layout.gutter} 0`,
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
  gap: `${space[8]} ${space[12]}`,
  padding: `${space[12]} ${layout.gutter}`,
  '@media': {
    [mq.md]: { padding: 0 },
  },
});

export const resultCount = style({
  margin: 0,
  fontSize: fontSize[15],
  color: vars.color.textSecondary,
});

export const query = style({
  fontWeight: fontWeight.bold,
  color: vars.color.text,
});
