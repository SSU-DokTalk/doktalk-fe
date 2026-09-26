import { configureStore } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import type { Summary } from '@/shared/api/models';
import { AppShell, SideColumnLayout } from '@/shell';
import userReducer from '@/stores/user';
import { summaryKeys } from '../api';
import SummaryCreatePage from './SummaryCreatePage';
import SummaryEditPage from './SummaryEditPage';

const AUTHOR_ID = 5;

const summary: Summary = {
  id: 31,
  user_id: AUTHOR_ID,
  isbn: 9788901234567,
  title: '선택을 설계하는 법: 넛지 핵심 정리',
  free_content: '사람들은 생각보다 합리적이지 않습니다.',
  charged_content: '가나다 라마바사 (서버가 가린 가짜 문장)',
  price: 4900,
  category: 1 << 2,
  likes_num: 128,
  comments_num: 0,
  created: '2026-09-24T03:00:00',
  updated: '2026-09-24T03:00:00',
  user: { id: AUTHOR_ID, name: '박서연', role: 'USER', is_deleted: false },
  book: {
    isbn: 9788901234567,
    title: '넛지',
    author: '리처드 탈러^캐스 선스타인',
    publisher: '리더스북',
    in_library_num: 12,
  },
};

type Scenario = 'create' | 'edit' | 'editMissingCharged';

function Preview({ scenario }: { scenario: Scenario }) {
  const { client, store } = useMemo(() => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false, staleTime: Infinity } },
    });
    queryClient.setQueryData(summaryKeys.detail(summary.id, 'kr'), summary);
    queryClient.setQueryData(
      summaryKeys.charged(summary.id, AUTHOR_ID),
      scenario === 'edit' ? '1장. 편향과 실수 — 진짜 유료 내용' : null
    );
    const reduxStore = configureStore({
      reducer: { user: userReducer },
      preloadedState: {
        user: {
          id: AUTHOR_ID,
          name: '박서연',
          profile: undefined,
          role: 'USER' as const,
        },
      },
    });
    return { client: queryClient, store: reduxStore };
  }, [scenario]);

  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <MemoryRouter
          initialEntries={[
            scenario === 'create'
              ? '/summary/create'
              : `/summary/${summary.id}/update`,
          ]}
        >
          <Routes>
            <Route element={<AppShell />}>
              <Route element={<SideColumnLayout />}>
                <Route path='/summary/create' element={<SummaryCreatePage />} />
                <Route
                  path='/summary/:summary_id/update'
                  element={<SummaryEditPage />}
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
  title: 'Features/Summary/SummaryForm',
  component: Preview,
  parameters: { layout: 'fullscreen' },
  args: { scenario: 'create' },
  argTypes: {
    scenario: {
      control: 'inline-radio',
      options: ['create', 'edit', 'editMissingCharged'],
    },
  },
} satisfies Meta<typeof Preview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Create: Story = {};

/** 수정: 유료 내용을 불러온 경우 */
export const Edit: Story = { args: { scenario: 'edit' } };

/** 수정: 서버가 작성자에게 유료 내용을 주지 않아 다시 입력해야 하는 경우 */
export const EditMissingCharged: Story = {
  args: { scenario: 'editMissingCharged' },
};
