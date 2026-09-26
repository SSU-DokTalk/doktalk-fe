import { configureStore } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppShell, PageLayout, SideColumnLayout } from '@/shell';
import userReducer from '@/stores/user';
import MyLibraryPage from '@/features/library/pages/MyLibraryPage';
import MyPage from './MyPage';
import { me, seedProfile, VIEWER_ID } from './profileFixtures';
import UserProfilePage from './UserProfilePage';

type Props = { path: string; loggedIn: boolean };

function Preview({ path, loggedIn }: Props) {
  const { client, store } = useMemo(() => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false, staleTime: Infinity } },
    });
    seedProfile(queryClient, loggedIn ? VIEWER_ID : 0);
    const reduxStore = configureStore({
      reducer: { user: userReducer },
      preloadedState: {
        user: loggedIn
          ? { id: VIEWER_ID, name: me.name!, role: 'USER' as const }
          : { id: 0, role: 'USER' as const },
      },
    });
    return { client: queryClient, store: reduxStore };
  }, [loggedIn]);

  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route element={<AppShell />}>
              <Route element={<SideColumnLayout />}>
                <Route path='/mypage/library' element={<MyLibraryPage />} />
              </Route>
              <Route element={<PageLayout />}>
                <Route path='/mypage' element={<MyPage />} />
                <Route path='/user/:user_id' element={<UserProfilePage />} />
              </Route>
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </Provider>
  );
}

const meta = {
  title: 'Features/Profile/ProfilePages',
  component: Preview,
  parameters: { layout: 'fullscreen' },
  args: { path: '/mypage?tab=post', loggedIn: true },
  argTypes: {
    path: {
      control: 'select',
      options: [
        '/mypage?tab=post',
        '/mypage?tab=summary',
        '/mypage?tab=library',
        '/mypage?tab=debate',
        '/mypage?tab=payment',
        '/mypage/library',
        '/user/8',
        '/user/8?tab=library',
      ],
    },
  },
} satisfies Meta<typeof Preview>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 게시글 탭: 맨 위에서 바로 글을 써요. */
export const Posts: Story = {};

export const Summaries: Story = { args: { path: '/mypage?tab=summary' } };

/** 내 서재 탭. 편집을 누르면 표지 위에 빼기 버튼이 떠요. */
export const Library: Story = { args: { path: '/mypage?tab=library' } };

/** 토론방 탭: 내가 연 모임과 참여한 모임을 날짜로 나눠요. */
export const Meetings: Story = { args: { path: '/mypage?tab=debate' } };

/** 결제 내역: 취소한 결제는 합계에서 빠져요. */
export const Payments: Story = { args: { path: '/mypage?tab=payment' } };

export const MobileMeetings: Story = {
  args: { path: '/mypage?tab=debate' },
  globals: { viewport: { value: 'mobile', isRotated: false } },
};

export const MobilePayments: Story = {
  args: { path: '/mypage?tab=payment' },
  globals: { viewport: { value: 'mobile', isRotated: false } },
};

/** 내 서재 페이지 (/mypage/library) */
export const LibraryPage: Story = { args: { path: '/mypage/library' } };

/** 모바일 내 서재: 책·요약을 알약 탭으로 나누고 첫 칸에 '책 담기' */
export const MobileLibraryPage: Story = {
  args: { path: '/mypage/library' },
  globals: { viewport: { value: 'mobile', isRotated: false } },
};

/** 다른 사람 프로필: 팔로우 버튼, 게시글·서재 탭 */
export const OtherUser: Story = { args: { path: '/user/8' } };

export const OtherUserMobile: Story = {
  args: { path: '/user/8?tab=library' },
  globals: { viewport: { value: 'mobile', isRotated: false } },
};

/** 로그아웃: 마이페이지는 로그인 안내 */
export const LoggedOut: Story = {
  args: { path: '/mypage', loggedIn: false },
};
