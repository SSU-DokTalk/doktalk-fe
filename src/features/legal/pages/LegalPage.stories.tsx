import { configureStore } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppShell, PageLayout } from '@/shell';
import userReducer from '@/stores/user';
import type { LegalKind } from '../types';
import LegalPage from './LegalPage';

function Preview({ kind, hash = '' }: { kind: LegalKind; hash?: string }) {
  const { client, store } = useMemo(
    () => ({
      client: new QueryClient({
        defaultOptions: { queries: { retry: false } },
      }),
      store: configureStore({
        reducer: { user: userReducer },
        preloadedState: { user: { id: 0, role: 'USER' as const } },
      }),
    }),
    []
  );
  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <MemoryRouter initialEntries={[`/${kind}${hash}`]}>
          <Routes>
            <Route element={<AppShell />}>
              <Route element={<PageLayout />}>
                <Route path='/terms' element={<LegalPage kind='terms' />} />
                <Route path='/privacy' element={<LegalPage kind='privacy' />} />
              </Route>
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </Provider>
  );
}

const meta = {
  title: 'Features/Legal/LegalPage',
  component: Preview,
  parameters: { layout: 'fullscreen' },
  args: { kind: 'terms' },
  argTypes: {
    kind: { control: 'inline-radio', options: ['terms', 'privacy'] },
  },
} satisfies Meta<typeof Preview>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 이용약관 (초안). [대괄호]는 운영하는 쪽이 채울 자리예요. */
export const Terms: Story = {};

/** 개인정보처리방침 (초안) */
export const Privacy: Story = { args: { kind: 'privacy' } };

/** 가입 화면의 마케팅 '보기'가 여는 곳 (/privacy#marketing) */
export const PrivacyMarketing: Story = {
  args: { kind: 'privacy', hash: '#marketing' },
};

/** 모바일 */
export const TermsMobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
