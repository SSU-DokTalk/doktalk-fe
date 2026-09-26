import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { SOCIAL_PROVIDERS, startSocialLogin, type Provider } from '../social';
import * as s from './SocialButtons.css';

/** 카카오 말풍선 (로그인 버튼 안 장식) */
function KakaoMark() {
  return (
    <svg
      viewBox='0 0 24 24'
      aria-hidden='true'
      focusable='false'
      className={s.kakaoIcon}
    >
      <path
        fill='currentColor'
        d='M12 3.5c-5.25 0-9.5 3.33-9.5 7.44 0 2.66 1.78 5 4.46 6.32-.2.72-.72 2.62-.83 3.03-.13.5.19.5.39.36.16-.1 2.52-1.71 3.54-2.4.63.09 1.28.14 1.94.14 5.25 0 9.5-3.33 9.5-7.45S17.25 3.5 12 3.5Z'
      />
    </svg>
  );
}

const MARKS: Record<Provider, ReactNode> = {
  naver: <span aria-hidden='true'>N</span>,
  kakao: <KakaoMark />,
  google: <span aria-hidden='true'>G</span>,
  facebook: <span aria-hidden='true'>f</span>,
};

/**
 * 소셜 로그인 버튼. 설정된 회사만 보여요.
 * login은 "카카오로 로그인", start는 회원가입 화면의 "카카오로 시작하기"예요.
 */
export function SocialButtons({
  mode,
  next,
  centered = false,
}: {
  mode: 'login' | 'start';
  next: string;
  centered?: boolean;
}) {
  const { t } = useTranslation();
  if (SOCIAL_PROVIDERS.length === 0) return null;

  return (
    <ul className={clsx(s.list, centered && s.centered)}>
      {SOCIAL_PROVIDERS.map((provider) => (
        <li key={provider}>
          <button
            type='button'
            aria-label={t(`page.auth.social.${mode}.${provider}`)}
            className={s.provider[provider]}
            onClick={() => startSocialLogin(provider, next)}
          >
            {MARKS[provider]}
          </button>
        </li>
      ))}
    </ul>
  );
}

export const hasSocialLogin = SOCIAL_PROVIDERS.length > 0;
