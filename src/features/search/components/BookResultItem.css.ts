import { globalStyle, style } from '@vanilla-extract/css';
import {
  fontSize,
  layout,
  mq,
  space,
  typeScale,
  vars,
} from '@/design-system/tokens';

export const item = style({
  display: 'grid',
  gridTemplateColumns: '72px minmax(0, 1fr)',
  gridTemplateAreas: `
    "cover text"
    "actions actions"`,
  gap: `${space[12]} ${space[16]}`,
  padding: `${space[18]} ${layout.gutter}`,
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
  backgroundColor: vars.color.surface,
  '@media': {
    [mq.md]: {
      gridTemplateColumns: '96px minmax(0, 1fr) auto',
      gridTemplateAreas: '"cover text actions"',
      gap: space[20],
      padding: `${space[22]} ${space[24]}`,
    },
  },
});

export const cover = style({ gridArea: 'cover' });

export const text = style({
  gridArea: 'text',
  display: 'flex',
  flexDirection: 'column',
  gap: space[6],
  minWidth: 0,
});

export const title = style({
  margin: 0,
  ...typeScale.cardTitle,

  color: vars.color.text,
  overflowWrap: 'anywhere',
  '@media': {
    [mq.md]: { fontSize: fontSize[19] },
  },
});

export const meta = style({
  fontSize: fontSize[14],
  lineHeight: 1.5,
  color: vars.color.textSecondary,
  overflowWrap: 'anywhere',
});

export const description = style({
  margin: `${space[4]} 0 0`,
  fontSize: fontSize[15],
  lineHeight: 1.65,
  color: vars.color.textMuted,
  overflowWrap: 'anywhere',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 3,
  overflow: 'hidden',
});

export const count = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: space[6],
  marginTop: space[4],
  fontSize: fontSize[13],
  color: vars.color.textTertiary,
});

globalStyle(`${count} svg`, { width: '14px', height: '14px' });

export const actions = style({
  gridArea: 'actions',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: space[8],
  '@media': {
    [mq.md]: {
      flexDirection: 'column',
      alignItems: 'stretch',
      width: '148px',
    },
  },
});
