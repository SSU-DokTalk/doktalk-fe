import { configureStore } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { debateKeys } from '@/features/debate/api';
import { libraryKeys } from '@/features/library/api';
import { postKeys, type PostFeedPage } from '@/features/post/api';
import {
  hostedDebates,
  joinedDebates,
  libraryBooks,
  me,
  mySummaries,
  purchasedSummaries,
  seedProfile,
  VIEWER_ID,
} from '@/features/profile/pages/profileFixtures';
import { summaryKeys } from '@/features/summary/api';
import type { Debate, Page, Post } from '@/shared/api/models';
import { AppShell, LandingLayout, SideColumnLayout } from '@/shell';
import userReducer from '@/stores/user';
import HomePage from './HomePage';

const DAY = 86_400_000;
const serverTime = (offsetMs: number, hour = 19) => {
  const date = new Date(Date.now() + offsetMs);
  date.setHours(hour, 30, 0, 0);
  return date.toISOString().replace('Z', '');
};

/** 모집 중(모임 전) 토론방 4개와 끝난 모임 1개 */
const openDebates: Debate[] = [
  ...joinedDebates,
  ...hostedDebates,
  {
    ...joinedDebates[0],
    id: 401,
    title: '정의란 무엇인가 — 공정에 대한 네 가지 질문',
    held_at: serverTime(18 * DAY),
    price: 8000,
    limit: 15,
    link: 'https://meet.example.com/justice',
    is_online: true,
    location: null,
  },
  {
    ...hostedDebates[0],
    id: 402,
    user_id: 21,
    user: { id: 21, name: '최민준', role: 'USER', is_deleted: false },
    title: '사피엔스, 세 번의 혁명으로 읽기',
    held_at: serverTime(25 * DAY, 14),
    price: 0,
  },
];

const photo = (seed: number) => ({
  name: `photo-${seed}.png`,
  url: `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect width='600' height='400' fill='${seed % 2 ? '#F2C94C' : '#A8D0E6'}'/></svg>`
  )}`,
});

const posts: Post[] = [
  {
    id: 51,
    user_id: 8,
    title: '채식주의자 1부를 다시 읽고',
    content:
      '처음 읽었을 때는 영혜의 선택이 이해되지 않았는데, 토론에서 거부도 하나의 언어라는 이야기를 듣고 나니 같은 장면이 전혀 다르게 읽혔어요.',
    files: [photo(1)],
    likes_num: 31,
    comments_num: 12,
    created: serverTime(-2 * 3_600_000),
    updated: serverTime(-2 * 3_600_000),
    user: { id: 8, name: '박서연', role: 'USER', is_deleted: false },
  },
  {
    id: 52,
    user_id: 11,
    title: '10월에 같이 읽을 과학책 추천해 주세요',
    content:
      '코스모스를 완독하고 나니 비슷한 결의 책을 더 읽고 싶어졌어요. 입문자도 읽기 좋은 과학 교양서가 있을까요?',
    files: [],
    likes_num: 18,
    comments_num: 23,
    created: serverTime(-5 * 3_600_000),
    updated: serverTime(-5 * 3_600_000),
    user: { id: 11, name: '이준서', role: 'USER', is_deleted: false },
  },
  {
    id: 53,
    user_id: VIEWER_ID,
    title: '넛지 요약을 읽고 바꾼 생활 습관 하나',
    content: '기본값을 바꾸면 행동이 바뀐다는 문장이 오래 남았어요.',
    files: [photo(2)],
    likes_num: 44,
    comments_num: 9,
    created: serverTime(-DAY),
    updated: serverTime(-DAY),
    user: { id: VIEWER_ID, name: me.name, role: 'USER', is_deleted: false },
  },
];

const page = <T,>(items: T[], size = 10): Page<T> => ({
  items,
  total: items.length,
  page: 1,
  size,
  pages: 1,
});
const infinite = <T,>(first: T) => ({ pages: [first], pageParams: [1] });

function seedHome(client: QueryClient, viewerId: number) {
  seedProfile(client, VIEWER_ID);
  client.setQueryData(debateKeys.popular(), openDebates.slice(0, 4));
  for (const sort of ['latest', 'popular'] as const) {
    client.setQueryData(
      debateKeys.list({ category: 0, search: '', searchBy: 'bt', sort }),
      infinite(page(openDebates))
    );
  }
  const summaries = [...purchasedSummaries, ...mySummaries];
  client.setQueryData(summaryKeys.popular('kr'), summaries);
  client.setQueryData(
    summaryKeys.list({
      category: 0,
      search: '',
      searchBy: 'bt',
      sort: 'latest',
      lang: 'kr',
    }),
    infinite(page(summaries))
  );
  const feed: PostFeedPage = { ...page(posts), likedIds: [53] };
  client.setQueryData(postKeys.feed(viewerId), infinite(feed));
  client.setQueryData(postKeys.recent(3), page(posts, 3));
  client.setQueryData([...libraryKeys.mine(VIEWER_ID), 4], {
    ...page(libraryBooks.slice(0, 4), 4),
    total: libraryBooks.length,
  });
}

function Preview({ loggedIn }: { loggedIn: boolean }) {
  const { client, store } = useMemo(() => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false, staleTime: Infinity } },
    });
    seedHome(queryClient, loggedIn ? VIEWER_ID : 0);
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
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route element={<AppShell />}>
              <Route
                element={loggedIn ? <SideColumnLayout /> : <LandingLayout />}
              >
                <Route path='/' element={<HomePage />} />
              </Route>
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </Provider>
  );
}

const meta = {
  title: 'Features/Home/HomePage',
  component: Preview,
  parameters: { layout: 'fullscreen' },
  args: { loggedIn: true },
} satisfies Meta<typeof Preview>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 로그인 홈 (F안): 인사·다가오는 모임, 글쓰기, 피드, 오른쪽 인기 요약·내 서재 */
export const LoggedIn: Story = {};

export const LoggedInMobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};

/** 로그아웃 랜딩 (E안) */
export const LoggedOut: Story = { args: { loggedIn: false } };

export const LoggedOutMobile: Story = {
  args: { loggedIn: false },
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
