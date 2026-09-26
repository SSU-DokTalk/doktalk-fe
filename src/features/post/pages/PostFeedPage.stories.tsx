import { configureStore } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import type { Post } from '@/shared/api/models';
import { AppShell, SideColumnLayout } from '@/shell';
import globalStateReducer from '@/stores/globalStates';
import userReducer from '@/stores/user';
import { postKeys, type PostFeedPage } from '../api';
import PostFeedPageView from './PostFeedPage';

const VIEWER_ID = 3;

const photo = (seed: number) => ({
  name: `photo-${seed}.png`,
  url: `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect width='600' height='400' fill='${seed % 2 ? '#F2C94C' : '#A8D0E6'}'/></svg>`
  )}`,
});

const posts: Post[] = [
  {
    id: 1,
    user_id: VIEWER_ID,
    title: '넛지 모임 전에 읽어 두면 좋은 부분',
    content:
      '이번 목요일 합정 모임 준비하면서 표시해 둔 부분을 사진으로 공유해요.\n3장 기본값 이야기와 7장 선택 설계 사례를 먼저 읽고 오시면 이야기가 훨씬 잘 통할 것 같아요.',
    files: [photo(1), photo(2), photo(3)],
    likes_num: 21,
    comments_num: 6,
    created: new Date(Date.now() - 3_600_000).toISOString().replace('Z', ''),
    updated: new Date(Date.now() - 3_600_000).toISOString().replace('Z', ''),
    user: { id: VIEWER_ID, name: '박서연', role: 'USER', is_deleted: false },
  },
  {
    id: 2,
    user_id: 9,
    title: '코스모스 완독했어요',
    content: '두 달 걸렸지만 끝까지 읽었습니다. 7장이 제일 좋았어요.',
    files: [],
    likes_num: 8,
    comments_num: 2,
    created: new Date(Date.now() - 86_400_000).toISOString().replace('Z', ''),
    updated: new Date(Date.now() - 86_400_000).toISOString().replace('Z', ''),
    user: { id: 9, name: '이준서', role: 'USER', is_deleted: false },
  },
];

function Preview({ write }: { write: boolean }) {
  const { client, store } = useMemo(() => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false, staleTime: Infinity } },
    });
    const page: PostFeedPage = {
      items: posts,
      total: 2,
      page: 1,
      size: 10,
      pages: 1,
      likedIds: [1],
    };
    queryClient.setQueryData(postKeys.feed(VIEWER_ID), {
      pages: [page],
      pageParams: [1],
    });
    queryClient.setQueryData(['summaries', 'popular', 'kr'], []);
    const reduxStore = configureStore({
      reducer: { user: userReducer, globalState: globalStateReducer },
      preloadedState: {
        user: {
          id: VIEWER_ID,
          name: '박서연',
          profile: undefined,
          role: 'USER' as const,
        },
        globalState: { isFollowerUpdated: false, isLibraryUpdated: false },
      },
    });
    return { client: queryClient, store: reduxStore };
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <MemoryRouter initialEntries={[write ? '/post?write=1' : '/post']}>
          <Routes>
            <Route element={<AppShell />}>
              <Route element={<SideColumnLayout />}>
                <Route path='/post' element={<PostFeedPageView />} />
              </Route>
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </Provider>
  );
}

const meta = {
  title: 'Features/Post/PostFeedPage',
  component: Preview,
  parameters: { layout: 'fullscreen' },
  args: { write: false },
} satisfies Meta<typeof Preview>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 로그인한 피드: 내 글에는 옵션 메뉴, 좋아요한 글은 채운 하트 */
export const Feed: Story = {};

/** 쓰기 창이 열린 상태 (?write=1) */
export const Composer: Story = { args: { write: true } };

/** 모바일 쓰기 시트 */
export const MobileComposer: Story = {
  args: { write: true },
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
