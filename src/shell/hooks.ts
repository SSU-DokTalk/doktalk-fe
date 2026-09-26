import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import cookie from 'react-cookies';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { selectGlobalState, updateGlobalState } from '@/stores/globalStates';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { selectUser, unsetUser } from '@/stores/user';

/** 로그인한 사용자와 로그아웃 동작 */
export function useAuth() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = user.id !== undefined && user.id !== 0;

  const logout = useCallback(() => {
    dispatch(unsetUser());
    axios.defaults.headers.common['Authorization'] = '';
    cookie.remove('Authorization', { path: '/' });
    navigate('/login');
  }, [dispatch, navigate]);

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

type ProfileCounts = { follower: number; following: number };

/**
 * 팔로워·팔로잉 수. 다른 화면에서 팔로우를 바꾸면 isFollowerUpdated가 켜지고,
 * 그때 다시 불러온 뒤 끕니다(기존 FloatingUserProfile과 같은 약속).
 */
export function useMyProfileCounts(enabled: boolean) {
  const dispatch = useAppDispatch();
  const { isFollowerUpdated } = useAppSelector(selectGlobalState);
  const [counts, setCounts] = useState<ProfileCounts | null>(null);
  const needsFetch = enabled && (Boolean(isFollowerUpdated) || counts === null);

  useEffect(() => {
    if (!enabled) setCounts(null);
  }, [enabled]);

  useEffect(() => {
    if (!needsFetch) return;
    let cancelled = false;
    axios
      .get('/api/user/me')
      .then((res) => {
        if (cancelled) return;
        setCounts({
          follower: res.data.follower_num ?? 0,
          following: res.data.following_num ?? 0,
        });
        dispatch(updateGlobalState({ isFollowerUpdated: false }));
      })
      .catch(() => {
        // 숫자를 못 불러와도 칼럼은 그대로 보여줘요.
      });
    return () => {
      cancelled = true;
    };
  }, [needsFetch, dispatch]);

  return counts;
}
