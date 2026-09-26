import { globalStyle, style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

export const item = style({
  display: 'grid',
  gridTemplateColumns: '72px minmax(0, 1fr)',
  gridTemplateAreas: `
    "cover text"
    "actions actions"`,
  gap: '12px 16px',
  padding: '18px 20px',
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
  backgroundColor: vars.color.surface,
  '@media': {
    [mq.md]: {
      gridTemplateColumns: '96px minmax(0, 1fr) auto',
      gridTemplateAreas: '"cover text actions"',
      gap: '20px',
      padding: '22px 24px',
    },
  },
});

export const cover = style({ gridArea: 'cover' });

export const text = style({
  gridArea: 'text',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  minWidth: 0,
});

export const title = style({
  margin: 0,
  fontSize: fontSize.xl,
  fontWeight: 700,
  lineHeight: 1.4,
  letterSpacing: '-0.4px',
  color: vars.color.text,
  overflowWrap: 'anywhere',
  '@media': {
    [mq.md]: { fontSize: '1.1875rem' },
  },
});

export const meta = style({
  fontSize: fontSize.md,
  lineHeight: 1.5,
  color: vars.color.textSecondary,
  overflowWrap: 'anywhere',
});

export const description = style({
  margin: '4px 0 0',
  fontSize: fontSize.base,
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
  gap: '6px',
  marginTop: '4px',
  fontSize: fontSize.sm,
  color: vars.color.textTertiary,
});

globalStyle(`${count} svg`, { width: '14px', height: '14px' });

export const actions = style({
  gridArea: 'actions',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '8px',
  '@media': {
    [mq.md]: {
      flexDirection: 'column',
      alignItems: 'stretch',
      width: '148px',
    },
  },
});
