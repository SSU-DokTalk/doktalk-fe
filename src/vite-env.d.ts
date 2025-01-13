/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_API_SRC: string;
  readonly VITE_KAKAO_CLIENT_ID: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_NAVER_CLIENT_ID: string;
  readonly VITE_FACEBOOK_CLIENT_ID: string;
  readonly VITE_REDIRECT_URI: string;
}
