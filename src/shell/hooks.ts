import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useCallback, useEffect } from 'react';
import cookie from 'react-cookies';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useMe } from '@/features/user/api';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { selectUser, unsetUser } from '@/stores/user';

/** 로그인한 사용자와 로그아웃 동작 */
export function useAuth() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isLoggedIn = user.id !== undefined && user.id !== 0;

  const logout = useCallback(() => {
    dispatch(unsetUser());
    // 다음에 다른 계정으로 들어와도 이전 사람의 정보가 남지 않게 비워요.
    queryClient.clear();
    axios.defaults.headers.common['Authorization'] = '';
    cookie.remove('Authorization', { path: '/' });
    navigate('/login');
  }, [dispatch, navigate, queryClient]);

  return { user, isLoggedIn, logout };
}

export const LANGUAGES = [
  {
    value: 'mn',
    htmlLang: 'mn',
    labelKey: 'component.topnav.language.mongolian',
  },
  { value: 'kr', htmlLang: 'ko', labelKey: 'component.topnav.language.korean' },
  {
    value: 'us',
    htmlLang: 'en',
    labelKey: 'component.topnav.language.english',
  },
] as const;

export type LanguageValue = (typeof LANGUAGES)[number]['value'];

/** 화면 언어. 고른 값은 localStorage에 남겨 다음 방문에도 이어져요. */
export function useLanguage() {
  const { i18n, t } = useTranslation();
  const current =
    LANGUAGES.find((language) => language.value === i18n.language) ??
    LANGUAGES[0];

  const change = useCallback(
    (value: LanguageValue) => {
      localStorage.setItem('lang', value);
      void i18n.changeLanguage(value);
    },
    [i18n]
  );

  return {
    languages: LANGUAGES,
    current,
    currentLabel: t(current.labelKey),
    change,
  };
}

/** <html lang>을 화면 언어에 맞춰요. 스크린 리더 발음이 달라져요. */
export function useHtmlLang() {
  const { current } = useLanguage();
  useEffect(() => {
    document.documentElement.lang = current.htmlLang;
  }, [current.htmlLang]);
}

/**
 * 팔로워·팔로잉 수. 어디서든 팔로우를 바꾸면 useToggleFollow가 같은 캐시(userKeys.me)를 고쳐서
 * 왼쪽 칼럼 숫자도 바로 바뀌어요.
 */
export function useMyProfileCounts(viewerId: number) {
  const { data } = useMe(viewerId);
  return data
    ? { follower: data.follower_num, following: data.following_num }
    : null;
}
