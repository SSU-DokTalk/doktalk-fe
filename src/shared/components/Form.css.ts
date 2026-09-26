import { globalStyle, style } from '@vanilla-extract/css';
import {
  fontSize,
  fontWeight,
  inputFontSize,
  layout,
  mq,
  space,
  vars,
  zIndex,
} from '@/design-system/tokens';

/** 모바일 폼 좌우 안쪽 여백. 구분 띠와 저장 버튼 줄은 이만큼 밖으로 늘려 화면 끝까지 채워요. */
const inset = layout.gutter;

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[16],
  margin: 0,
  padding: `${space[20]} ${inset} 0`,
  backgroundColor: vars.color.surface,
  '@media': {
    [mq.md]: {
      padding: space[32],
      borderRadius: vars.radius['3xl'],
    },
  },
});

export const fieldset = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[18],
  minWidth: 0,
  margin: 0,
  padding: 0,
  border: 0,
  '@media': {
    [mq.md]: { gap: space[20] },
  },
});

export const legend = style({
  padding: 0,
  marginBottom: space[14],
  fontSize: fontSize[16],
  fontWeight: fontWeight.bold,
  lineHeight: 1.5,
  color: vars.color.text,
  '@media': {
    [mq.md]: { marginBottom: space[16], fontSize: fontSize[17] },
  },
});

/** 모바일은 회색 띠, 데스크톱은 가는 선으로 구역을 나눠요. */
export const divider = style({
  height: '8px',
  margin: `${space[12]} -${inset}`,
  border: 0,
  backgroundColor: vars.color.canvas,
  '@media': {
    [mq.md]: {
      height: '1px',
      margin: `${space[16]} 0`,
      backgroundColor: vars.color.borderSubtle,
    },
  },
});

export const group = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[8],
  minWidth: 0,
});

export const label = style({
  fontSize: fontSize[14],
  fontWeight: fontWeight.semibold,
  lineHeight: 1.5,
  color: vars.color.text,
});

export const hint = style({
  margin: 0,
  fontSize: fontSize[13],
  lineHeight: 1.5,
  color: vars.color.textTertiary,
});

export const error = style({
  margin: 0,
  fontSize: fontSize[13],
  lineHeight: 1.5,
  color: vars.color.danger,
});

export const twoColumns = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gap: space[18],
  '@media': {
    [mq.sm]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: space[12],
    },
  },
});

/** 모임 방식 버튼은 글자 폭만큼만 */
export const modeControl = style({
  alignSelf: 'flex-start',
});

export const modeOption = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: space[6],
});

globalStyle(`${modeOption} svg`, { width: '16px', height: '16px' });

export const stepper = style({
  display: 'flex',
  alignItems: 'center',
  gap: space[8],
});

export const stepperInput = style({
  width: '72px',
  height: '48px',
  boxSizing: 'border-box',
  padding: `0 ${space[8]}`,
  border: `1px solid ${vars.color.borderInput}`,
  borderRadius: vars.radius.lg,
  fontFamily: vars.font.family,
  fontSize: inputFontSize,
  fontWeight: fontWeight.semibold,
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
  paddingRight: space[10],
  fontSize: fontSize[15],
  color: vars.color.textSecondary,
  whiteSpace: 'nowrap',
});

export const priceGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space[2],
  minWidth: 0,
});

export const notice = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: `${space[8]} ${space[12]}`,
  margin: 0,
  padding: `${space[10]} ${space[14]}`,
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.infoSubtle,
  fontSize: fontSize[14],
  color: vars.color.info,
});

export const alert = style({
  margin: 0,
  padding: `${space[12]} ${space[14]}`,
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.dangerSubtle,
  fontSize: fontSize[14],
  lineHeight: 1.5,
  color: vars.color.danger,
  outline: 'none',
});

/**
 * 저장 버튼 줄. 모바일에서는 화면 아래(하단 탭 위)에 붙어 있어요.
 * 버튼 글자가 길어 한 줄에 안 들어가면(좁은 화면의 몽골어) 다음 줄로 내려가요.
 */
export const actions = style({
  position: 'sticky',
  bottom: `calc(${layout.bottomTabsHeight} + env(safe-area-inset-bottom))`,
  zIndex: zIndex.raised,
  display: 'flex',
  flexWrap: 'wrap',
  gap: space[8],
  margin: `${space[8]} -${inset} 0`,
  padding: `${space[12]} ${space[16]}`,
  borderTop: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surface,
  boxShadow: vars.shadow.bottomBar,
  '@media': {
    [mq.md]: {
      position: 'static',
      justifyContent: 'flex-end',
      margin: `${space[8]} 0 0`,
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
  gap: space[10],
  fontSize: fontSize[13],
  fontWeight: fontWeight.semibold,
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
  gap: space[4],
  whiteSpace: 'nowrap',
});

globalStyle(`${paywallDividerLabel} svg`, { width: '14px', height: '14px' });
