import { configureStore } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Card, EmptyState, Text } from '@/design-system';
import { userKeys } from '@/features/user/api';
import userReducer from '@/stores/user';
import { AppShell, PageLayout, SideColumnLayout } from './layouts';

/** 왼쪽 칼럼의 팔로워·팔로잉 수 (요청 없이 캐시에서 읽어요) */
function makeQueryClient() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  });
  client.setQueryData(userKeys.me(1), {
    id: 1,
    email: 'reader@example.com',
    name: '김지현',
    follower_num: 128,
    following_num: 64,
    role: 'USER',
    created: '2025-01-01T00:00:00',
    updated: '2025-01-01T00:00:00',
    is_deleted: false,
  });
  return client;
}

function makeStore(loggedIn: boolean) {
  return configureStore({
    reducer: { user: userReducer },
    preloadedState: {
      user: loggedIn
        ? { id: 1, name: '김지현', profile: undefined, role: 'USER' as const }
        : { id: 0, name: undefined, profile: undefined, role: 'USER' as const },
    },
  });
}

/** 기존 페이지 자리를 채우는 임시 본문 */
function PlaceholderPage({ title }: { title: string }) {
  return (
    <Card radius='xl' style={{ minHeight: 480 }}>
      <Text as='h1' variant='heading'>
        {title}
      </Text>
      <EmptyState
        title='여기에 기존 페이지가 들어가요'
        description='셸(상단 내비·왼쪽 칼럼·하단 탭)만 새로 바뀌었어요.'
      />
    </Card>
  );
}

type ShellArgs = { loggedIn: boolean; path: string };

function ShellPreview({ loggedIn, path }: ShellArgs) {
  const client = useMemo(makeQueryClient, []);
  return (
    <Provider store={makeStore(loggedIn)}>
      <QueryClientProvider client={client}>
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route element={<AppShell />}>
              <Route element={<SideColumnLayout />}>
                <Route
                  path='/debate'
                  element={<PlaceholderPage title='독서 토론' />}
                />
                <Route
                  path='/post'
                  element={<PlaceholderPage title='게시글' />}
                />
              </Route>
              <Route element={<PageLayout />}>
                <Route
                  path='/mypage'
                  element={<PlaceholderPage title='마이페이지' />}
                />
              </Route>
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </Provider>
  );
}

const meta = {
  title: 'Shell/AppShell',
  component: ShellPreview,
  parameters: { layout: 'fullscreen' },
  args: { loggedIn: true, path: '/debate' },
  argTypes: {
    path: { control: 'inline-radio', options: ['/debate', '/post', '/mypage'] },
  },
} satisfies Meta<typeof ShellPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 로그인한 데스크톱: 만들기·프로필 메뉴, 왼쪽 칼럼에 내 프로필과 내 활동 */
export const LoggedIn: Story = {};

/** 로그아웃: 로그인·회원가입 버튼, 왼쪽 칼럼에 로그인 안내 */
export const LoggedOut: Story = {
  args: { loggedIn: false },
};

/** 모바일(로그인): 상단 바 + 하단 탭 */
export const MobileLoggedIn: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};

/** 모바일(로그아웃): 하단 탭 없이 메뉴 버튼으로 서랍을 열어요 */
export const MobileLoggedOut: Story = {
  args: { loggedIn: false },
  globals: { viewport: { value: 'mobile', isRotated: false } },
};

/** 왼쪽 칼럼이 없는 화면 (마이페이지·프로필·설정) */
export const WithoutSideColumn: Story = {
  args: { path: '/mypage' },
};
