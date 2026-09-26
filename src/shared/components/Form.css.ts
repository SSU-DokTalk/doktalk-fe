import { globalStyle, style } from '@vanilla-extract/css';
import { fontSize, mq, vars } from '@/design-system/tokens';

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  margin: 0,
  padding: '20px 20px 0',
  backgroundColor: vars.color.surface,
  '@media': {
    [mq.md]: {
      padding: '32px',
      borderRadius: vars.radius['3xl'],
    },
  },
});

export const fieldset = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  minWidth: 0,
  margin: 0,
  padding: 0,
  border: 0,
  '@media': {
    [mq.md]: { gap: '20px' },
  },
});

export const legend = style({
  padding: 0,
  marginBottom: '14px',
  fontSize: fontSize.lg,
  fontWeight: 700,
  lineHeight: 1.5,
  color: vars.color.text,
  '@media': {
    [mq.md]: { marginBottom: '16px', fontSize: fontSize.xl },
  },
});

/** 모바일은 회색 띠, 데스크톱은 가는 선으로 구역을 나눠요. */
export const divider = style({
  height: '8px',
  margin: '12px -20px',
  border: 0,
  backgroundColor: vars.color.canvas,
  '@media': {
    [mq.md]: {
      height: '1px',
      margin: '16px 0',
      backgroundColor: vars.color.borderSubtle,
    },
  },
});

export const group = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  minWidth: 0,
});

export const label = style({
  fontSize: fontSize.md,
  fontWeight: 600,
  lineHeight: 1.5,
  color: vars.color.text,
});

export const hint = style({
  margin: 0,
  fontSize: fontSize.sm,
  lineHeight: 1.5,
  color: vars.color.textTertiary,
});

export const error = style({
  margin: 0,
  fontSize: fontSize.sm,
  lineHeight: 1.5,
  color: vars.color.danger,
});

export const twoColumns = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gap: '18px',
  '@media': {
    [mq.sm]: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' },
  },
});

/** 모임 방식 버튼은 글자 폭만큼만 */
export const modeControl = style({
  alignSelf: 'flex-start',
});

export const modeOption = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
});

globalStyle(`${modeOption} svg`, { width: '16px', height: '16px' });

export const stepper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const stepperInput = style({
  width: '72px',
  height: '48px',
  boxSizing: 'border-box',
  padding: '0 8px',
  border: `1px solid ${vars.color.borderInput}`,
  borderRadius: vars.radius.lg,
  fontFamily: vars.font.family,
  fontSize: '16px',
  fontWeight: 600,
  textAlign: 'center',
  color: vars.color.text,
  outline: 'none',
  selectors: {
    '&:focus-visible': {
      borderColor: vars.color.brand,
      boxShadow: `0 0 0 1px ${vars.color.brand}, ${vars.shadow.focus}`,
    },
    '&[aria-invalid="true"]': {
      borderColor: vars.color.danger,
    },
  },
});

export const unit = style({
  paddingRight: '10px',
  fontSize: fontSize.base,
  color: vars.color.textSecondary,
  whiteSpace: 'nowrap',
});

export const priceGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  minWidth: 0,
});

export const notice = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px 12px',
  margin: 0,
  padding: '10px 14px',
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.infoSubtle,
  fontSize: fontSize.md,
  color: vars.color.info,
});

export const alert = style({
  margin: 0,
  padding: '12px 14px',
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.dangerSubtle,
  fontSize: fontSize.md,
  lineHeight: 1.5,
  color: vars.color.danger,
  outline: 'none',
});

/**
 * 저장 버튼 줄. 모바일에서는 화면 아래(하단 탭 위)에 붙어 있어요.
 */
export const actions = style({
  position: 'sticky',
  bottom: 'calc(64px + env(safe-area-inset-bottom))',
  zIndex: 1,
  display: 'flex',
  gap: '8px',
  margin: '8px -20px 0',
  padding: '12px 16px',
  borderTop: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surface,
  boxShadow: '0 -6px 16px rgba(17, 24, 39, 0.05)',
  '@media': {
    [mq.md]: {
      position: 'static',
      justifyContent: 'flex-end',
      margin: '8px 0 0',
      padding: 0,
      border: 0,
      boxShadow: 'none',
    },
  },
});

globalStyle(`${actions} > *`, {
  flex: '1 1 0',
});

globalStyle(`${actions} > *`, {
  '@media': {
    [mq.md]: { flex: '0 0 auto', minWidth: '120px' },
  },
});

/** 무료 미리보기와 유료 내용 사이 구분선 (여기부터 결제 후 공개) */
export const paywallDivider = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: fontSize.sm,
  fontWeight: 600,
  color: vars.color.brand,
  selectors: {
    '&::before, &::after': {
      content: '""',
      flex: '1 1 0',
      height: '1px',
      backgroundColor: vars.color.brandMuted,
    },
  },
});

export const paywallDividerLabel = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  whiteSpace: 'nowrap',
});

globalStyle(`${paywallDividerLabel} svg`, { width: '14px', height: '14px' });
