import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../../tokens/theme.css';
import { fontSize } from '../../tokens/scale';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  padding: '36px 24px',
  textAlign: 'center',
  fontFamily: vars.font.family,
});

export const icon = style({
  width: '64px',
  height: '64px',
  marginBottom: '6px',
  borderRadius: vars.radius.pill,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

globalStyle(`${icon} svg`, { width: '28px', height: '28px' });

export const iconTone = {
  brand: style({
    backgroundColor: vars.color.brandSubtle,
    color: vars.color.brand,
  }),
  danger: style({
    backgroundColor: vars.color.dangerSubtle,
    color: vars.color.danger,
  }),
};

export const title = style({
  margin: 0,
  fontSize: fontSize.xl,
  fontWeight: 700,
  lineHeight: 1.45,
  letterSpacing: '-0.4px',
  color: vars.color.text,
});

export const description = style({
  margin: 0,
  maxWidth: '320px',
  fontSize: fontSize.md,
  lineHeight: 1.6,
  color: vars.color.textSecondary,
});

export const actions = style({
  marginTop: '8px',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '8px',
});
