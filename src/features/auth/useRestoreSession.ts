import axios from 'axios';
import cookie from 'react-cookies';
import { useEffect, useState } from 'react';
import { api } from '@/shared/api/client';
import { setAccessToken, useStartSession } from './api';

/**
 * 새로고침하면 쿠키의 refresh token으로 로그인 상태를 되살려요.
 * 확인이 끝나면(쿠키가 없거나 실패해도) true가 돼요.
 */
export function useRestoreSession() {
  const startSession = useStartSession();
  const [ready, setReady] = useState(
    () => cookie.load('Authorization') === undefined
  );

  useEffect(() => {
    const refreshToken = cookie.load('Authorization');
    if (refreshToken === undefined) return;
    let cancelled = false;

    (async () => {
      try {
        const res = await axios.post(
          '/api/user/access-token',
          {},
          { params: { refresh_token: refreshToken } }
        );
        const token = String(res.headers.authorization ?? '');
        setAccessToken(token);
        const user = await api.get('/user/me');
        if (!cancelled) startSession({ token, user });
      } catch {
        // 쿠키가 만료됐거나 탈퇴한 계정이면 로그아웃 상태로 시작해요.
      } finally {
        if (!cancelled) setReady(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [startSession]);

  return ready;
}
