import {
  assignVars,
  createGlobalTheme,
  createGlobalThemeContract,
  style,
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
      /** 카드 안의 옅은 영역 */
      surfaceSubtle: null,
      /** 페이지 배경 위에 파인 영역 (SegmentedControl 트랙) */
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
      /** 활성 메뉴·날짜 블록 배경 (Cream) */
      brandSubtle: null,
      /** 아바타·선택 칩 배경 (짙은 Cream) */
      brandMuted: null,
      /** 연한 강조 테두리 */
      brandBorder: null,
      /** 가장 옅은 배경 (서재의 책 담기 칸) */
      brandFaint: null,

      /** 카테고리·보조 강조 텍스트 (짙은 Gold) */
      info: null,
      /** 아이콘·장식 전용, 텍스트에 쓰지 않아요 (Gold) */
      infoIcon: null,
      /** 무료·카테고리 배지 배경 (Gold 50) */
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
      /** 표지 뒤 판 (위 → 아래 그라디언트) */
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
  // 색은 리디자인 목업(남색 #0D1B3E · 금색 #C8A84B · 크림 #F8F5EE)을 따라요.
  // 밝은 바탕에서 대비가 모자란 목업 색만 진하게 바꿨어요. 옅은 글자 #9090AA → #66667F(4.5:1 이상),
  // 금색 글자 → #7A5C0F(4.5:1 이상), 금색 아이콘 → #A3842A(3:1 이상). 밝은 금색은 남색 바탕(inverseTheme)에서 써요.
  color: {
    canvas: '#F8F5EE',
    surface: '#FFFFFF',
    surfaceSubtle: '#F8F5EE',
    canvasInset: '#EFEADF',
    surfaceTranslucent: 'rgba(255, 255, 255, 0.94)',
    surfaceGlass: 'rgba(255, 255, 255, 0.6)',
    surfaceGlassBorder: 'rgba(255, 255, 255, 0.9)',

    brand: '#0D1B3E',
    brandHover: '#1A2F5E',
    brandActive: '#081330',
    brandSubtle: '#F2EDE3',
    brandMuted: '#E8E1D1',
    brandBorder: '#E2D3A6',
    brandFaint: '#FBF9F4',

    info: '#7A5C0F',
    infoIcon: '#A3842A',
    infoSubtle: '#F6EED6',

    danger: '#C92A2A',
    dangerSubtle: '#FFF1F1',
    dangerBorder: '#F1C4C4',

    text: '#1A1A2E',
    textBody: '#26263C',
    textMuted: '#36364F',
    textSecondary: '#4A4A6A',
    textTertiary: '#66667F',
    textOnBrand: '#FFFFFF',
    textOnBrandMuted: 'rgba(255, 255, 255, 0.84)',
    textDisabled: '#66667F',

    border: 'rgba(13, 27, 62, 0.1)',
    borderSubtle: 'rgba(13, 27, 62, 0.06)',
    borderInput: 'rgba(13, 27, 62, 0.2)',

    disabled: '#ECE8DF',
    inverse: '#080F24',
    inverseText: '#FFFFFF',
    inverseTextMuted: 'rgba(255, 255, 255, 0.8)',
    inverseTextSubtle: 'rgba(255, 255, 255, 0.64)',
    inverseBorder: 'rgba(255, 255, 255, 0.1)',

    onBrandSubtle: 'rgba(255, 255, 255, 0.16)',
    onBrandHover: 'rgba(255, 255, 255, 0.12)',
    onBrandActive: 'rgba(255, 255, 255, 0.2)',
    onBrandTrack: 'rgba(255, 255, 255, 0.35)',

    overlay: 'rgba(8, 15, 36, 0.5)',
    scrim: 'rgba(8, 15, 36, 0.55)',
    skeleton: '#EFEBE2',

    coverEdge: 'rgba(0, 0, 0, 0.06)',
    coverStageTop: '#F6F2E9',
    coverStageBottom: '#EAE3D3',
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
    xs: '0 1px 3px rgba(13, 27, 62, 0.1)',
    sm: '0 1px 2px rgba(13, 27, 62, 0.06)',
    md: '0 1px 2px rgba(13, 27, 62, 0.06), 0 6px 16px rgba(13, 27, 62, 0.08)',
    lg: '0 2px 6px rgba(13, 27, 62, 0.06), 0 24px 48px rgba(13, 27, 62, 0.12)',
    popover: '0 16px 40px rgba(13, 27, 62, 0.16)',
    dialog: '0 24px 64px rgba(0, 0, 0, 0.24)',
    fab: '0 10px 24px rgba(13, 27, 62, 0.3)',
    focus: '0 0 0 4px rgba(13, 27, 62, 0.1)',
    overlay: '0 2px 8px rgba(13, 27, 62, 0.18)',
    bottomBar: '0 -6px 16px rgba(13, 27, 62, 0.05)',
    panel: '0 12px 40px rgba(13, 27, 62, 0.08)',
    book: '0 6px 14px rgba(0, 0, 0, 0.16)',
    bookSpine: 'inset 3px 0 0 rgba(0, 0, 0, 0.12)',
    bookLarge:
      'inset 4px 0 0 rgba(0, 0, 0, 0.12), 0 10px 24px rgba(0, 0, 0, 0.16)',
  },
});

/**
 * 남색 바탕 영역 (상단 내비, 첫 화면 히어로, 푸터)
 *
 * 이 클래스를 붙인 요소 안에서는 같은 토큰이 남색 바탕에 맞는 값으로 바뀌어요.
 * 바탕(surface)은 남색, 글자는 흰색 계열, 강조(brand)는 금색, 금색 버튼 위 글자는 남색이에요.
 * 그래서 안에 둔 Button·IconButton·TextField는 따로 고치지 않아도 남색 바탕에 맞게 보여요.
 * 메뉴·대화상자처럼 body에 띄우는 판은 이 요소 밖에 그려져서 밝은 색 그대로예요.
 * 색 토큰을 새로 만들면 여기에도 값을 넣어야 해요 (빠뜨리면 타입 오류가 나요).
 */
export const inverseTheme = style({
  vars: {
    ...assignVars(vars.color, {
      canvas: '#0D1B3E',
      surface: '#0D1B3E',
      surfaceSubtle: 'rgba(255, 255, 255, 0.08)',
      canvasInset: 'rgba(0, 0, 0, 0.24)',
      surfaceTranslucent: 'rgba(13, 27, 62, 0.9)',
      surfaceGlass: 'rgba(255, 255, 255, 0.05)',
      surfaceGlassBorder: 'rgba(200, 168, 75, 0.18)',

      brand: '#C8A84B',
      brandHover: '#E8C96A',
      brandActive: '#B39543',
      brandSubtle: 'rgba(200, 168, 75, 0.12)',
      brandMuted: 'rgba(200, 168, 75, 0.2)',
      brandBorder: 'rgba(200, 168, 75, 0.35)',
      brandFaint: 'rgba(200, 168, 75, 0.07)',

      info: '#E8C96A',
      infoIcon: '#C8A84B',
      infoSubtle: 'rgba(200, 168, 75, 0.12)',

      danger: '#FF8F8F',
      dangerSubtle: 'rgba(255, 143, 143, 0.12)',
      dangerBorder: 'rgba(255, 143, 143, 0.4)',

      text: '#FFFFFF',
      textBody: 'rgba(255, 255, 255, 0.9)',
      textMuted: 'rgba(255, 255, 255, 0.72)',
      textSecondary: 'rgba(255, 255, 255, 0.64)',
      textTertiary: 'rgba(255, 255, 255, 0.56)',
      textOnBrand: '#0D1B3E',
      textOnBrandMuted: 'rgba(13, 27, 62, 0.8)',
      textDisabled: 'rgba(255, 255, 255, 0.4)',

      border: 'rgba(255, 255, 255, 0.14)',
      borderSubtle: 'rgba(200, 168, 75, 0.25)',
      borderInput: 'rgba(255, 255, 255, 0.24)',

      disabled: 'rgba(255, 255, 255, 0.1)',
      inverse: '#080F24',
      inverseText: '#FFFFFF',
      inverseTextMuted: 'rgba(255, 255, 255, 0.8)',
      inverseTextSubtle: 'rgba(255, 255, 255, 0.64)',
      inverseBorder: 'rgba(255, 255, 255, 0.1)',

      // 금색 버튼 위
      onBrandSubtle: 'rgba(13, 27, 62, 0.12)',
      onBrandHover: 'rgba(13, 27, 62, 0.1)',
      onBrandActive: 'rgba(13, 27, 62, 0.16)',
      onBrandTrack: 'rgba(13, 27, 62, 0.3)',

      overlay: 'rgba(8, 15, 36, 0.5)',
      scrim: 'rgba(8, 15, 36, 0.55)',
      skeleton: 'rgba(255, 255, 255, 0.1)',

      coverEdge: 'rgba(255, 255, 255, 0.12)',
      coverStageTop: 'rgba(255, 255, 255, 0.08)',
      coverStageBottom: 'rgba(255, 255, 255, 0.03)',
    }),
    [vars.shadow.focus]: '0 0 0 4px rgba(200, 168, 75, 0.24)',
  },
  color: vars.color.text,
});
