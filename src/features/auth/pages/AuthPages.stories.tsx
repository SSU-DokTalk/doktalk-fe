import { configureStore } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios, { AxiosError, type AxiosAdapter } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { userKeys } from '@/features/user/api';
import type { User } from '@/shared/api/models';
import { StandaloneLayout } from '@/shell';
import userReducer from '@/stores/user';
import AgreementsPage from './AgreementsPage';
import RegisterPage from './RegisterPage';
import SocialSignupPage from './SocialSignupPage';

const VIEWER_ID = 7;

const member: User = {
  id: VIEWER_ID,
  email: 'reader@example.com',
  name: '김독서',
  follower_num: 3,
  following_num: 5,
  role: 'USER',
  created: '2025-03-01T09:00:00',
  updated: '2025-03-01T09:00:00',
  is_deleted: false,
  interests: 0,
  needs_agreements: true,
};

type Screen = 'register' | 'social' | 'socialMissing' | 'agreements';
type Outcome = 'ok' | 'expired' | 'emailTaken';

const ENTRIES: Record<Screen, { pathname: string; state?: unknown }> = {
  register: { pathname: '/register' },
  social: {
    pathname: '/register/social',
    state: {
      signup: {
        token: 'signup-token',
        email: 'reader@example.com',
        name: '김독서',
      },
      next: '/',
    },
  },
  socialMissing: { pathname: '/register/social' },
  agreements: { pathname: '/agreements' },
};

/** 스토리에는 서버가 없어서 가입·동의 요청에 정한 응답을 돌려줘요. */
const fakeServer =
  (outcome: Outcome): AxiosAdapter =>
  async (config) => {
    const fail = (status: number, detail: string) => {
      throw new AxiosError(
        `Request failed with status code ${status}`,
        AxiosError.ERR_BAD_REQUEST,
        config,
        null,
        { data: { detail }, status, statusText: '', headers: {}, config }
      );
    };
    if (config.url === '/api/oauth/register') {
      if (outcome === 'expired') fail(401, 'SIGNUP_TOKEN_INVALID');
      if (outcome === 'emailTaken') fail(409, 'EMAIL_TAKEN');
    }
    const data =
      config.url === '/api/user/register'
        ? VIEWER_ID
        : { ...member, needs_agreements: false };
    return {
      data,
      status: 201,
      statusText: 'Created',
      headers: { authorization: 'story-token' },
      config,
    };
  };

function Preview({ screen, outcome }: { screen: Screen; outcome: Outcome }) {
  const [ready, setReady] = useState(false);
  const loggedIn = screen === 'agreements';
  const { client, store } = useMemo(() => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false, staleTime: Infinity } },
    });
    if (loggedIn) queryClient.setQueryData(userKeys.me(VIEWER_ID), member);
    const reduxStore = configureStore({
      reducer: { user: userReducer },
      preloadedState: {
        user: loggedIn
          ? { id: VIEWER_ID, name: member.name!, role: 'USER' as const }
          : { id: 0, role: 'USER' as const },
      },
    });
    return { client: queryClient, store: reduxStore };
  }, [loggedIn]);

  useEffect(() => {
    const previous = axios.defaults.adapter;
    axios.defaults.adapter = fakeServer(outcome);
    setReady(true);
    return () => {
      axios.defaults.adapter = previous;
    };
  }, [outcome]);

  if (!ready) return null;
  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <MemoryRouter initialEntries={[ENTRIES[screen]]}>
          <Routes>
            <Route element={<StandaloneLayout />}>
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/register/social' element={<SocialSignupPage />} />
              <Route path='/agreements' element={<AgreementsPage />} />
            </Route>
            <Route
              path='*'
              element={<p style={{ padding: 24 }}>다음 화면</p>}
            />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </Provider>
  );
}

const meta = {
  title: 'Features/Auth/SignUp',
  component: Preview,
  parameters: { layout: 'fullscreen' },
  args: { screen: 'register', outcome: 'ok' },
  argTypes: {
    screen: { control: 'inline-radio', options: Object.keys(ENTRIES) },
    outcome: {
      control: 'inline-radio',
      options: ['ok', 'expired', 'emailTaken'],
    },
  },
} satisfies Meta<typeof Preview>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 이메일 가입: 추가 정보(선택)와 약관 동의(필수 셋, 마케팅 선택) */
export const Register: Story = {};

/** 소셜 로그인으로 처음 왔을 때: 동의하면 가입이 끝나요. */
export const SocialSignup: Story = { args: { screen: 'social' } };

/** 가입 토큰이 만료됐을 때 (가입하기를 누르면 보여요) */
export const SocialSignupExpired: Story = {
  args: { screen: 'social', outcome: 'expired' },
};

/** 콜백을 거치지 않고 들어왔을 때 */
export const SocialSignupMissing: Story = { args: { screen: 'socialMissing' } };

/** 동의 기록 없이 가입한 예전 회원: 로그인하면 이 화면부터 거쳐요. */
export const Agreements: Story = { args: { screen: 'agreements' } };

/** 모바일 */
export const RegisterMobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
