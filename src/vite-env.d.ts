/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_SRC: string;
  readonly VITE_KAKAO_CLIENT_ID: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_NAVER_CLIENT_ID: string;
  readonly VITE_FACEBOOK_CLIENT_ID: string;
  readonly VITE_REDIRECT_URI: string;
  /** 토스 결제 위젯 클라이언트 키. 백엔드 TOSS_SECRET_KEY와 같은 상점의 키예요. */
  readonly VITE_TOSS_CLIENT_KEY?: string;
}
