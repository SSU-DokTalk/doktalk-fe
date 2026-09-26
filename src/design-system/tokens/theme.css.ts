import {
  createGlobalTheme,
  createGlobalThemeContract,
} from '@vanilla-extract/css';

const toKebab = (key: string) =>
  key.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);

/**
 * 디자인 토큰 계약
 *
 * CSS 변수 이름을 `--dt-*`로 고정해 두었어요. 그래서 일반 CSS(styles/reset.css 등)에서도
 * `var(--dt-color-brand)`처럼 같은 값을 그대로 참조할 수 있어요.
 */
export const vars = createGlobalThemeContract(
  {
    color: {
      /** 페이지 배경 */
      canvas: null,
      /** 카드·시트·내비 배경 */
      surface: null,
      /** 카드 안의 회색 영역 */
      surfaceSubtle: null,

      /** 주요 버튼·활성 상태 (Navy) */
      brand: null,
      brandHover: null,
      brandActive: null,
      /** 활성 메뉴·날짜 블록 배경 (Navy 50) */
      brandSubtle: null,
      /** 아바타·선택 칩 배경 (Navy 100) */
      brandMuted: null,
      /** 연한 강조 테두리 */
      brandBorder: null,

      /** 카테고리·보조 강조 텍스트 (Steel Text) */
      info: null,
      /** 아이콘·장식 전용, 텍스트에 쓰지 않아요 (Steel) */
      infoIcon: null,
      /** 무료·카테고리 배지 배경 (Steel 50) */
      infoSubtle: null,

      danger: null,
      dangerSubtle: null,
      dangerBorder: null,

      /** 제목·기본 텍스트 */
      text: null,
      /** 긴 본문 */
      textBody: null,
      /** 카드 설명·칩 라벨 */
      textMuted: null,
      /** 보조 본문 */
      textSecondary: null,
      /** 메타 정보·캡션 */
      textTertiary: null,
      textOnBrand: null,
      textDisabled: null,

      /** 구분선·카드 테두리 */
      border: null,
      /** 목록 안의 옅은 구분선 */
      borderSubtle: null,
      /** 입력 테두리 */
      borderInput: null,

      /** 비활성 버튼 배경 */
      disabled: null,
      /** 토스트·푸터 배경 */
      inverse: null,
      inverseText: null,
      /** 모달·시트 뒤 배경 */
      overlay: null,
      skeleton: null,
    },
    font: {
      family: null,
    },
    radius: {
      xs: null,
      sm: null,
      md: null,
      lg: null,
      xl: null,
      '2xl': null,
      '3xl': null,
      pill: null,
    },
    shadow: {
      sm: null,
      md: null,
      lg: null,
      popover: null,
      dialog: null,
      fab: null,
      focus: null,
    },
  },
  (_value, path) => `dt-${path.map(toKebab).join('-')}`
);

createGlobalTheme(':root', vars, {
  color: {
    canvas: '#F3F4F7',
    surface: '#FFFFFF',
    surfaceSubtle: '#F3F4F7',

    brand: '#000080',
    brandHover: '#1C1CA8',
    brandActive: '#00006B',
    brandSubtle: '#EEF0FB',
    brandMuted: '#E0E3F7',
    brandBorder: '#B9BFE8',

    info: '#2B6C8C',
    infoIcon: '#539AB9',
    infoSubtle: '#E8F2F7',

    danger: '#C92A2A',
    dangerSubtle: '#FFF1F1',
    dangerBorder: '#F1C4C4',

    text: '#111827',
    textBody: '#1F2937',
    textMuted: '#374151',
    textSecondary: '#4B5563',
    textTertiary: '#666565',
    textOnBrand: '#FFFFFF',
    textDisabled: '#666565',

    border: '#E5E7EB',
    borderSubtle: '#F0F1F4',
    borderInput: '#D9D9D9',

    disabled: '#E5E7EB',
    inverse: '#1F2937',
    inverseText: '#FFFFFF',
    overlay: 'rgba(17, 24, 39, 0.48)',
    skeleton: '#EEF0F3',
  },
  font: {
    family:
      "'Pretendard-Variable', 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif",
  },
  radius: {
    xs: '6px',
    sm: '8px',
    md: '10px',
    lg: '12px',
    xl: '16px',
    '2xl': '20px',
    '3xl': '24px',
    pill: '9999px',
  },
  shadow: {
    sm: '0 1px 2px rgba(17, 24, 39, 0.06)',
    md: '0 1px 2px rgba(17, 24, 39, 0.06), 0 6px 16px rgba(17, 24, 39, 0.08)',
    lg: '0 2px 6px rgba(17, 24, 39, 0.06), 0 24px 48px rgba(0, 0, 128, 0.12)',
    popover: '0 16px 40px rgba(17, 24, 39, 0.16)',
    dialog: '0 24px 64px rgba(0, 0, 0, 0.24)',
    fab: '0 10px 24px rgba(0, 0, 128, 0.3)',
    focus: '0 0 0 4px rgba(0, 0, 128, 0.1)',
  },
});
