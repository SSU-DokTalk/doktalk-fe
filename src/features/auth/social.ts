export type Provider = 'naver' | 'kakao' | 'google' | 'facebook';

const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI as string | undefined;

const CLIENT_IDS: Record<Provider, string | undefined> = {
  naver: import.meta.env.VITE_NAVER_CLIENT_ID,
  kakao: import.meta.env.VITE_KAKAO_CLIENT_ID,
  google: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  facebook: import.meta.env.VITE_FACEBOOK_CLIENT_ID,
};

const ORDER: Provider[] = ['naver', 'kakao', 'google', 'facebook'];

/** 클라이언트 id가 설정된 소셜 로그인만 보여줘요 (없으면 눌러도 오류라서). */
export const SOCIAL_PROVIDERS = ORDER.filter(
  (provider) => Boolean(CLIENT_IDS[provider]) && Boolean(REDIRECT_URI)
);

export const isProvider = (value: string | undefined): value is Provider =>
  ORDER.includes(value as Provider);

function authorizeUrl(provider: Provider, state: string) {
  const redirectUri = `${REDIRECT_URI}/${provider}`;
  const clientId = CLIENT_IDS[provider] ?? '';
  const query = (params: Record<string, string>) =>
    new URLSearchParams(params).toString();

  switch (provider) {
    case 'naver':
      return `https://nid.naver.com/oauth2.0/authorize?${query({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: 'code',
        state,
      })}`;
    case 'kakao':
      return `https://kauth.kakao.com/oauth/authorize?${query({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: 'profile_nickname,profile_image,account_email',
        state,
      })}`;
    case 'google':
      return `https://accounts.google.com/o/oauth2/auth?${query({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope:
          'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
        state,
      })}`;
    case 'facebook':
      return `https://www.facebook.com/v16.0/dialog/oauth?${query({
        client_id: clientId,
        redirect_uri: redirectUri,
        scope: 'public_profile,email',
        state,
      })}`;
  }
}

const STORAGE_KEY = 'doktalk:social-login';

type Pending = { provider: Provider; state: string; next: string };

const randomState = () =>
  Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) =>
    byte.toString(16).padStart(2, '0')
  ).join('');

/**
 * 소셜 로그인 창으로 보내요. state는 이 탭에만 남겨 두고, 돌아왔을 때 같은지 확인해요
 * (다른 사이트가 만든 로그인 요청을 막는 장치예요).
 */
export function startSocialLogin(provider: Provider, next: string) {
  const pending: Pending = { provider, state: randomState(), next };
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(pending));
  } catch {
    // 저장소를 못 쓰면 돌아왔을 때 state 확인에서 걸러져요.
  }
  window.location.assign(authorizeUrl(provider, pending.state));
}

/** 콜백에서 읽어요. 다 쓰면 clearPendingSocialLogin으로 지워요. */
export function readPendingSocialLogin(): Pending | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Pending) : null;
  } catch {
    return null;
  }
}

export function clearPendingSocialLogin() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // 지우지 못해도 다음 로그인에서 새 값으로 덮어써요.
  }
}
