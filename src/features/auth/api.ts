import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import cookie from 'react-cookies';
import { useCallback } from 'react';
import { userKeys } from '@/features/user/api';
import { api } from '@/shared/api/client';
import type { User } from '@/shared/api/models';
import { useAppDispatch } from '@/stores/hooks';
import { setUser } from '@/stores/user';
import type { Provider } from './social';

/**
 * 로그인하면 서버가 access token을 Authorization 헤더로, refresh token을 쿠키로 줘요.
 * access token은 axios 기본 헤더에 넣어 두고, 만료되면 TokenRefresher가 쿠키로 새로 받아요.
 */
export type Session = { token: string; user: User };

const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI as string | undefined;

export async function loginWithEmail(
  email: string,
  password: string
): Promise<Session> {
  const res = await axios.post<User>('/api/user/login', { email, password });
  return { token: String(res.headers.authorization ?? ''), user: res.data };
}

/** 소셜 로그인 콜백의 code로 로그인해요. 처음이면 서버가 회원도 만들어요. */
export async function loginWithProvider(
  provider: Provider,
  code: string,
  state: string
): Promise<Session> {
  const res = await axios.get<User>(`/api/oauth/${provider}`, {
    params: { code, state, redirect_uri: REDIRECT_URI },
  });
  return { token: String(res.headers.authorization ?? ''), user: res.data };
}

export function registerWithEmail(input: {
  email: string;
  password: string;
  name: string;
}) {
  return api.post('/user/register', { body: input });
}

/** 탈퇴한 계정 되살리기. 로그인으로 받은 토큰이 헤더에 있어야 해요. */
export function restoreAccount() {
  return api.post('/user/restore');
}

export function deleteAccount() {
  return api.delete('/user/me');
}

/** 로그인 토큰은 여기서만 넣고 빼요. 모든 요청이 axios 기본 헤더로 토큰을 보내요. */
export function setAccessToken(token: string) {
  axios.defaults.headers.common['Authorization'] = token;
}

/** 로그아웃: 요청 헤더의 access token과 refresh token 쿠키를 지워요. */
export function clearTokens() {
  axios.defaults.headers.common['Authorization'] = '';
  cookie.remove('Authorization', { path: '/' });
}

/** 받은 토큰으로 요청 헤더를 바꾸고 앱 전체의 로그인 정보(Redux·캐시)를 채워요. */
export function useStartSession() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useCallback(
    ({ token, user }: Session) => {
      setAccessToken(token);
      queryClient.setQueryData(userKeys.me(user.id), user);
      dispatch(
        setUser({
          id: user.id,
          name: user.name ?? undefined,
          profile: user.profile ?? undefined,
          role: user.role,
        })
      );
    },
    [dispatch, queryClient]
  );
}
