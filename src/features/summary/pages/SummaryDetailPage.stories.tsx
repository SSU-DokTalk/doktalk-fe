import { configureStore } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { userKeys } from '@/features/user/api';
import type { Purchase, Summary } from '@/shared/api/models';
import { AppShell, SideColumnLayout } from '@/shell';
import globalStateReducer from '@/stores/globalStates';
import userReducer from '@/stores/user';
import { libraryKeys } from '@/features/library/api';
import { summaryKeys } from '../api';
import SummaryDetailPage from './SummaryDetailPage';

const AUTHOR_ID = 5;
const VIEWER_ID = 1;

const summary: Summary = {
  id: 31,
  user_id: AUTHOR_ID,
  isbn: 9788901234567,
  title: '선택을 설계하는 법: 넛지 핵심 정리',
  free_content:
    '사람들은 생각보다 합리적이지 않습니다. 급식 줄에서 과일을 눈높이에 두기만 해도 학생들이 과일을 더 많이 고르고, 연금 가입을 기본값으로 바꾸기만 해도 가입률이 크게 달라집니다.\n\n이 요약은 넛지의 개념, 선택 설계자가 기억해야 할 원칙, 그리고 건강·재정·환경 분야의 사례를 장별로 정리했습니다.',
  charged_content:
    '가나다 라마바사 아자차카 타파하 가나다라 마바사아 자차카타 파하가나 다라마바 사아자차 카타파하 가나다 라마바사 아자차카 타파하 가나다라 마바사아.',
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

const fullText =
  '1장. 편향과 실수 — 사람의 판단에는 두 가지 시스템이 있습니다. 직관적이고 빠른 자동 시스템과, 느리지만 신중한 숙고 시스템입니다.\n\n2장. 선택 설계 — 선택지를 어떤 순서로, 어떤 기본값으로 보여 주느냐가 결과를 바꿉니다.';

const purchase = {
  id: 9,
  user_id: VIEWER_ID,
  product_type: 'S',
  product_id: summary.id,
  price: summary.price,
  quantity: 1,
  created: '2026-09-18T05:00:00',
  updated: '2026-09-18T05:00:00',
  is_deleted: false,
} as Purchase;

type Scenario = 'locked' | 'purchased' | 'owner' | 'free' | 'loggedOut';

function setup(scenario: Scenario) {
  const viewerId =
    scenario === 'owner' ? AUTHOR_ID : scenario === 'loggedOut' ? 0 : VIEWER_ID;
  const data: Summary = {
    ...summary,
    price: scenario === 'free' ? 0 : summary.price,
  };
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  });
  client.setQueryData(summaryKeys.detail(data.id, 'kr'), data);
  client.setQueryData(summaryKeys.comments(data.id), []);
  client.setQueryData(summaryKeys.popular('kr'), [
    data,
    {
      ...data,
      id: 32,
      title: '사피엔스, 세 번의 혁명으로 읽기',
      price: 3900,
      book: { ...data.book, title: '사피엔스' },
    },
    {
      ...data,
      id: 33,
      title: '어린왕자, 다시 읽는 어른의 동화',
      price: 0,
      book: { ...data.book, title: '어린왕자' },
    },
  ]);
  if (viewerId > 0) {
    client.setQueryData(summaryKeys.liked(data.id, viewerId), false);
    client.setQueryData(
      summaryKeys.purchase(data.id, viewerId),
      scenario === 'purchased' ? purchase : null
    );
    client.setQueryData(
      summaryKeys.charged(data.id, viewerId),
      scenario === 'purchased' ? fullText : null
    );
    client.setQueryData(libraryKeys.contains(data.book.isbn, viewerId), false);
    client.setQueryData(userKeys.following(AUTHOR_ID, viewerId), false);
  }
  const store = configureStore({
    reducer: { user: userReducer, globalState: globalStateReducer },
    preloadedState: {
      user: viewerId
        ? {
            id: viewerId,
            name: '최민준',
            profile: undefined,
            role: 'USER' as const,
          }
        : { id: 0, name: undefined, profile: undefined, role: 'USER' as const },
      globalState: { isFollowerUpdated: false, isLibraryUpdated: false },
    },
  });
  return { client, store };
}

function Preview({ scenario }: { scenario: Scenario }) {
  const { client, store } = useMemo(() => setup(scenario), [scenario]);
  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <MemoryRouter initialEntries={[`/summary/${summary.id}`]}>
          <Routes>
            <Route element={<AppShell />}>
              <Route element={<SideColumnLayout />}>
                <Route
                  path='/summary/:summary_id'
                  element={<SummaryDetailPage />}
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
  title: 'Features/Summary/SummaryDetailPage',
  component: Preview,
  parameters: { layout: 'fullscreen' },
  args: { scenario: 'locked' },
  argTypes: {
    scenario: {
      control: 'inline-radio',
      options: ['locked', 'purchased', 'owner', 'free', 'loggedOut'],
    },
  },
} satisfies Meta<typeof Preview>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 유료 · 구매 전: 흐린 미리보기와 결제 안내 */
export const Locked: Story = {};

/** 구매함: 전체 내용과 구매 완료 카드 */
export const Purchased: Story = { args: { scenario: 'purchased' } };

/** 작성자: 수정·삭제 메뉴, 유료 내용 안내 */
export const Owner: Story = { args: { scenario: 'owner' } };

/** 무료 · 아직 열지 않음 */
export const Free: Story = { args: { scenario: 'free' } };

/** 로그아웃 */
export const LoggedOut: Story = { args: { scenario: 'loggedOut' } };

/** 모바일 */
export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
