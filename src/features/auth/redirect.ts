import { useLocation } from 'react-router-dom';

/**
 * 로그인 뒤 돌아갈 주소. 우리 사이트 안의 경로만 받아요.
 * ('//evil.com'처럼 다른 사이트로 보내는 주소와 로그인 화면 자신은 막아요.)
 */
export function safeNext(value: string | null | undefined): string {
  if (!value || !value.startsWith('/')) return '/';
  if (value.startsWith('//') || value.startsWith('/\\')) return '/';
  if (/^\/(login|register|auth)(\/|\?|#|$)/.test(value)) return '/';
  return value;
}

/** /login?next=… · next가 메인이면 붙이지 않아요. */
export function authPath(page: 'login' | 'register', next: string) {
  const target = safeNext(next);
  return target === '/'
    ? `/${page}`
    : `/${page}?next=${encodeURIComponent(target)}`;
}

/** 지금 보고 있는 화면으로 돌아오는 로그인·회원가입 주소 */
export function useAuthHref(page: 'login' | 'register' = 'login') {
  const { pathname, search, hash } = useLocation();
  return authPath(page, pathname + search + hash);
}
