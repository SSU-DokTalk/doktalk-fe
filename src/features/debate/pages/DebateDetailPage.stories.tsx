import { configureStore } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { userKeys } from '@/features/user/api';
import type { Comment, Debate, Purchase } from '@/shared/api/models';
import { AppShell, SideColumnLayout } from '@/shell';
import globalStateReducer from '@/stores/globalStates';
import userReducer from '@/stores/user';
import { debateKeys } from '../api';
import DebateDetailPage from './DebateDetailPage';

const HOST_ID = 7;
const VIEWER_ID = 1;

const iso = (offsetHours: number) =>
  new Date(Date.now() + offsetHours * 3_600_000).toISOString().replace('Z', '');

const debate: Debate = {
  id: 15,
  user_id: HOST_ID,
  isbn: 9788936434120,
  title: '채식주의자로 읽는 거부와 존재',
  content:
    '‘채식주의자’의 영혜는 왜 먹기를 거부했을까요? 이번 모임에서는 1부 ‘채식주의자’를 중심으로, 거부라는 행동이 어떻게 한 사람의 존재 선언이 되는지 이야기합니다.\n\n1부만 읽고 오셔도 충분히 참여할 수 있어요. 발제문은 아래 첨부파일로 미리 확인해 주세요.',
  location: null,
  link: 'https://meet.google.com/xyz-abcd-efg',
  held_at: iso(24 * 9),
  price: 10000,
  limit: 12,
  category: (1 << 1) | (1 << 5),
  likes_num: 42,
  comments_num: 3,
  created: iso(-50),
  updated: iso(-50),
  files: [
    { name: '발제문_채식주의자_1부.pdf', url: 'https://example.com/a.pdf' },
  ],
  user: { id: HOST_ID, name: '김지현', role: 'USER', is_deleted: false },
  book: {
    isbn: 9788936434120,
    title: '채식주의자',
    author: '한강',
    in_library_num: 3,
  },
};

const comments: Comment[] = [
  {
    id: 1,
    user_id: 2,
    upper_comment_id: null,
    content: '1부만 읽고 가도 괜찮을까요? 이번 주에 시간이 많지 않아서요.',
    comments_num: 1,
    likes_num: 0,
    created: iso(-3),
    updated: iso(-3),
    user: { id: 2, name: '이준서', role: 'USER', is_deleted: false },
  },
  {
    id: 2,
    user_id: HOST_ID,
    upper_comment_id: 1,
    content: '네, 1부만 읽고 오셔도 충분해요!',
    comments_num: 0,
    likes_num: 0,
    created: iso(-2),
    updated: iso(-2),
    user: { id: HOST_ID, name: '김지현', role: 'USER', is_deleted: false },
  },
  {
    id: 3,
    user_id: 3,
    upper_comment_id: null,
    content:
      '발제문 질문이 좋네요. 영혜의 가족 입장에서도 이야기해 보고 싶어요.',
    comments_num: 0,
    likes_num: 0,
    created: iso(-1),
    updated: iso(-1),
    user: { id: 3, name: '박서연', role: 'USER', is_deleted: false },
  },
];

const related: Debate[] = [
  {
    ...debate,
    id: 21,
    title: '넛지로 보는 선택의 설계',
    price: 0,
    link: null,
    location: '서울 마포구',
    book: { ...debate.book, title: '넛지', author: '리처드 탈러' },
  },
  {
    ...debate,
    id: 22,
    title: '코스모스 함께 완독하기',
    price: 0,
    book: { ...debate.book, title: '코스모스', author: '칼 세이건' },
  },
  {
    ...debate,
    id: 23,
    title: '정의란 무엇인가 — 공정에 대한 네 가지 질문',
    price: 8000,
    book: { ...debate.book, title: '정의란 무엇인가', author: '마이클 샌델' },
  },
];

const purchase: Purchase = {
  id: 99,
  user_id: VIEWER_ID,
  product_type: 'D',
  product_id: debate.id,
  price: debate.price,
  quantity: 1,
} as Purchase;

type Scenario = 'paid' | 'free' | 'joined' | 'host' | 'ended';

function setup(scenario: Scenario) {
  const viewerId = scenario === 'host' ? HOST_ID : VIEWER_ID;
  const data: Debate = {
    ...debate,
    price: scenario === 'free' ? 0 : debate.price,
    held_at: scenario === 'ended' ? iso(-48) : debate.held_at,
  };

  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  });
  queryClient.setQueryData(debateKeys.detail(data.id), data);
  queryClient.setQueryData(debateKeys.comments(data.id), comments);
  queryClient.setQueryData(debateKeys.liked(data.id, viewerId), false);
  queryClient.setQueryData(
    debateKeys.purchase(data.id, viewerId),
    scenario === 'joined' ? purchase : null
  );
  queryClient.setQueryData(debateKeys.popular(), [data, ...related]);
  queryClient.setQueryData(userKeys.following(HOST_ID, viewerId), false);

  const store = configureStore({
    reducer: { user: userReducer, globalState: globalStateReducer },
    preloadedState: {
      user: {
        id: viewerId,
        name: scenario === 'host' ? '김지현' : '최민준',
        profile: undefined,
        role: 'USER' as const,
      },
      globalState: { isFollowerUpdated: false, isLibraryUpdated: false },
    },
  });

  return { queryClient, store };
}

function Preview({ scenario }: { scenario: Scenario }) {
  const { queryClient, store } = useMemo(() => setup(scenario), [scenario]);
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[`/debate/${debate.id}`]}>
          <Routes>
            <Route element={<AppShell />}>
              <Route element={<SideColumnLayout />}>
                <Route
                  path='/debate/:debate_id'
                  element={<DebateDetailPage />}
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
  title: 'Features/Debate/DebateDetailPage',
  component: Preview,
  parameters: { layout: 'fullscreen' },
  args: { scenario: 'paid' },
  argTypes: {
    scenario: {
      control: 'inline-radio',
      options: ['paid', 'free', 'joined', 'host', 'ended'],
    },
  },
} satisfies Meta<typeof Preview>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 유료 · 참여 전: 온라인 링크는 숨기고 결제 버튼을 보여줘요. */
export const Paid: Story = {};

/** 무료 · 참여 전: 결제 없이 바로 참여해요. */
export const Free: Story = { args: { scenario: 'free' } };

/** 참여 중: 온라인 링크가 보여요. */
export const Joined: Story = { args: { scenario: 'joined' } };

/** 개설자: 수정·삭제 메뉴가 생겨요. */
export const Host: Story = { args: { scenario: 'host' } };

/** 모임 시간이 지났어요. */
export const Ended: Story = { args: { scenario: 'ended' } };

/** 모바일 */
export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
