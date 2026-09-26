import { configureStore } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Card, EmptyState, Text } from '@/design-system';
import globalStateReducer from '@/stores/globalStates';
import userReducer from '@/stores/user';
import { AppShell, PageLayout, SideColumnLayout } from './layouts';

function makeStore(loggedIn: boolean) {
  return configureStore({
    reducer: { user: userReducer, globalState: globalStateReducer },
    preloadedState: {
      user: loggedIn
        ? { id: 1, name: '김지현', profile: undefined, role: 'USER' as const }
        : { id: 0, name: undefined, profile: undefined, role: 'USER' as const },
      globalState: { isFollowerUpdated: false, isLibraryUpdated: false },
    },
  });
}

/** 기존 페이지 자리를 채우는 임시 본문 */
function PlaceholderPage({ title }: { title: string }) {
  return (
    <Card radius='xl' style={{ minHeight: 480 }}>
      <Text as='h1' variant='h2'>
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
  return (
    <Provider store={makeStore(loggedIn)}>
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
