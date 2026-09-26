import { configureStore } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { me, VIEWER_ID } from '@/features/profile/pages/profileFixtures';
import { userKeys } from '@/features/user/api';
import { AppShell, PageLayout } from '@/shell';
import userReducer from '@/stores/user';
import SettingsPage from './SettingsPage';

function Preview({ loggedIn }: { loggedIn: boolean }) {
  const { client, store } = useMemo(() => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false, staleTime: Infinity } },
    });
    queryClient.setQueryData(userKeys.me(VIEWER_ID), me);
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
        <MemoryRouter initialEntries={['/settings']}>
          <Routes>
            <Route element={<AppShell />}>
              <Route element={<PageLayout />}>
                <Route path='/settings' element={<SettingsPage />} />
              </Route>
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </Provider>
  );
}

const meta = {
  title: 'Features/Settings/SettingsPage',
  component: Preview,
  parameters: { layout: 'fullscreen' },
  args: { loggedIn: true },
} satisfies Meta<typeof Preview>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 계정·언어·고객 지원·계정 관리 */
export const LoggedIn: Story = {};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};

/** 로그아웃: 언어와 고객 지원만, 계정 자리에 로그인 안내 */
export const LoggedOut: Story = { args: { loggedIn: false } };
