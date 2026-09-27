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
      /** 회색 페이지 위에 파인 영역 (SegmentedControl 트랙) */
      canvasInset: null,
      /** 사진·표지 위에 올리는 흰 바탕 (배지·버튼) */
      surfaceTranslucent: null,
      /** 그라디언트 위 반투명 판 (장식) */
      surfaceGlass: null,
      surfaceGlassBorder: null,

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
      /** 가장 옅은 남색 배경 (서재의 책 담기 칸) */
      brandFaint: null,

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
      /** 남색 위 보조 글자 (대비 7:1 이상) */
      textOnBrandMuted: null,
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
      /** 어두운 푸터의 보조 글자 */
      inverseTextMuted: null,
      /** 어두운 푸터의 옅은 글자 (저작권 줄) */
      inverseTextSubtle: null,
      /** 어두운 푸터의 구분선 */
      inverseBorder: null,

      /** 남색 위 옅은 흰 배경 (챗봇 머리 아이콘) */
      onBrandSubtle: null,
      /** 남색 위 버튼 hover·누름 */
      onBrandHover: null,
      onBrandActive: null,
      /** 남색 위 스피너 트랙 */
      onBrandTrack: null,

      /** 모달·시트 뒤 배경 */
      overlay: null,
      /** 사진 위에 글자를 올릴 때 덮는 어두운 막 (+3) */
      scrim: null,
      skeleton: null,

      /** 표지 가장자리 선 */
      coverEdge: null,
      /** 표지 뒤 회색 판 (위 → 아래 그라디언트) */
      coverStageTop: null,
      coverStageBottom: null,
    },
    font: {
      family: null,
    },
    radius: {
      xs: null,
      sm: null,
      md: null,
      lg: null,
      /** 정사각형 아이콘·날짜 타일 */
      tile: null,
      xl: null,
      '2xl': null,
      '3xl': null,
      pill: null,
    },
    shadow: {
      /** 탭·세그먼트에서 고른 알약 */
      xs: null,
      sm: null,
      md: null,
      lg: null,
      popover: null,
      dialog: null,
      fab: null,
      focus: null,
      /** 사진 위에 올린 버튼 */
      overlay: null,
      /** 화면 아래 붙은 버튼 줄 (모바일 작성 화면) */
      bottomBar: null,
      /** 회색 화면 가운데 떠 있는 판 (로그인·회원가입) */
      panel: null,
      /** 책 표지와 왼쪽 책등 */
      book: null,
      bookSpine: null,
      /** 큰 책 그림 (404) */
      bookLarge: null,
    },
  },
  (_value, path) => `dt-${path.map(toKebab).join('-')}`
);

createGlobalTheme(':root', vars, {
  color: {
    canvas: '#F3F4F7',
    surface: '#FFFFFF',
    surfaceSubtle: '#F3F4F7',
    canvasInset: '#E9EAF0',
    surfaceTranslucent: 'rgba(255, 255, 255, 0.94)',
    surfaceGlass: 'rgba(255, 255, 255, 0.6)',
    surfaceGlassBorder: 'rgba(255, 255, 255, 0.9)',

    brand: '#000080',
    brandHover: '#1C1CA8',
    brandActive: '#00006B',
    brandSubtle: '#EEF0FB',
    brandMuted: '#E0E3F7',
    brandBorder: '#B9BFE8',
    brandFaint: '#F8F9FE',

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
    textOnBrandMuted: 'rgba(255, 255, 255, 0.84)',
    textDisabled: '#666565',

    border: '#E5E7EB',
    borderSubtle: '#F0F1F4',
    borderInput: '#D9D9D9',

    disabled: '#E5E7EB',
    inverse: '#1F2937',
    inverseText: '#FFFFFF',
    inverseTextMuted: 'rgba(255, 255, 255, 0.8)',
    inverseTextSubtle: 'rgba(255, 255, 255, 0.64)',
    inverseBorder: 'rgba(255, 255, 255, 0.14)',

    onBrandSubtle: 'rgba(255, 255, 255, 0.16)',
    onBrandHover: 'rgba(255, 255, 255, 0.12)',
    onBrandActive: 'rgba(255, 255, 255, 0.2)',
    onBrandTrack: 'rgba(255, 255, 255, 0.35)',

    overlay: 'rgba(17, 24, 39, 0.48)',
    scrim: 'rgba(17, 24, 39, 0.55)',
    skeleton: '#EEF0F3',

    coverEdge: 'rgba(0, 0, 0, 0.06)',
    coverStageTop: '#F5F4F3',
    coverStageBottom: '#E9E9E9',
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
    tile: '14px',
    xl: '16px',
    '2xl': '20px',
    '3xl': '24px',
    pill: '9999px',
  },
  shadow: {
    xs: '0 1px 3px rgba(17, 24, 39, 0.1)',
    sm: '0 1px 2px rgba(17, 24, 39, 0.06)',
    md: '0 1px 2px rgba(17, 24, 39, 0.06), 0 6px 16px rgba(17, 24, 39, 0.08)',
    lg: '0 2px 6px rgba(17, 24, 39, 0.06), 0 24px 48px rgba(0, 0, 128, 0.12)',
    popover: '0 16px 40px rgba(17, 24, 39, 0.16)',
    dialog: '0 24px 64px rgba(0, 0, 0, 0.24)',
    fab: '0 10px 24px rgba(0, 0, 128, 0.3)',
    focus: '0 0 0 4px rgba(0, 0, 128, 0.1)',
    overlay: '0 2px 8px rgba(17, 24, 39, 0.18)',
    bottomBar: '0 -6px 16px rgba(17, 24, 39, 0.05)',
    panel: '0 12px 40px rgba(17, 24, 39, 0.08)',
    book: '0 6px 14px rgba(0, 0, 0, 0.16)',
    bookSpine: 'inset 3px 0 0 rgba(0, 0, 0, 0.12)',
    bookLarge:
      'inset 4px 0 0 rgba(0, 0, 0, 0.12), 0 10px 24px rgba(0, 0, 0, 0.16)',
  },
});
