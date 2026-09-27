import { configureStore } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { bookKeys } from '@/features/book/api';
import type { Debate } from '@/shared/api/models';
import { AppShell, SideColumnLayout } from '@/shell';
import userReducer from '@/stores/user';
import { debateKeys } from '../api';
import DebateCreatePage from './DebateCreatePage';
import DebateEditPage from './DebateEditPage';

const HOST_ID = 7;

const debate: Debate = {
  id: 15,
  user_id: HOST_ID,
  isbn: 9788936434120,
  title: '채식주의자로 읽는 거부와 존재',
  content: '1부만 읽고 오셔도 충분히 참여할 수 있어요.',
  location: null,
  link: 'https://meet.google.com/xyz-abcd-efg',
  is_online: true,
  held_at: '2026-10-06T10:30:00',
  price: 10000,
  limit: 12,
  category: (1 << 1) | (1 << 5),
  likes_num: 42,
  comments_num: 3,
  created: '2026-09-25T01:00:00',
  updated: '2026-09-25T01:00:00',
  files: [
    { name: '발제문_채식주의자_1부.pdf', url: 'https://example.com/a.pdf' },
  ],
  user: { id: HOST_ID, name: '김지현', role: 'USER', is_deleted: false },
  book: {
    isbn: 9788936434120,
    title: '채식주의자',
    author: '한강',
    publisher: '창비',
    in_library_num: 3,
  },
};

const searchResults = {
  pages: [
    {
      total: 3,
      page: 1,
      pages: 1,
      items: [
        {
          isbn: 9788936434120,
          title: '채식주의자',
          author: '한강',
          publisher: '창비',
        },
        {
          isbn: 9788936434595,
          title: '소년이 온다',
          author: '한강',
          publisher: '창비',
        },
        {
          isbn: 9788954682152,
          title: '작별하지 않는다',
          author: '한강',
          publisher: '문학동네',
        },
      ],
    },
  ],
  pageParams: [1],
};

type Args = { page: 'create' | 'edit' };

function Preview({ page }: Args) {
  const { queryClient, store } = useMemo(() => {
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false, staleTime: Infinity } },
    });
    client.setQueryData(debateKeys.detail(debate.id), debate);
    client.setQueryData(bookKeys.search('한강', 'naver', 5), searchResults);
    const reduxStore = configureStore({
      reducer: { user: userReducer },
      preloadedState: {
        user: {
          id: HOST_ID,
          name: '김지현',
          profile: undefined,
          role: 'USER' as const,
        },
      },
    });
    return { queryClient: client, store: reduxStore };
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter
          initialEntries={[
            page === 'create'
              ? '/debate/create'
              : `/debate/${debate.id}/update`,
          ]}
        >
          <Routes>
            <Route element={<AppShell />}>
              <Route element={<SideColumnLayout />}>
                <Route path='/debate/create' element={<DebateCreatePage />} />
                <Route
                  path='/debate/:debate_id/update'
                  element={<DebateEditPage />}
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
  title: 'Features/Debate/DebateForm',
  component: Preview,
  parameters: { layout: 'fullscreen' },
  args: { page: 'create' },
  argTypes: { page: { control: 'inline-radio', options: ['create', 'edit'] } },
} satisfies Meta<typeof Preview>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 새로 만들기. 도서 검색창에 "한강"을 입력하면 예시 결과가 나와요. */
export const Create: Story = {};

/** 수정: 기존 값과 첨부 파일이 채워져 있어요. */
export const Edit: Story = { args: { page: 'edit' } };

/** 모바일: 저장 버튼 줄이 하단 탭 위에 붙어요. */
export const MobileCreate: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
