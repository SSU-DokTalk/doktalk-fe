import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useRestoreSession } from '@/features/auth/useRestoreSession';
import {
  AuthCallbackPage,
  BookSearchPage,
  CheckoutResultPage,
  DebateCreatePage,
  DebateDetailPage,
  DebateEditPage,
  DebateListPage,
  HomePage,
  IntegratedSearchPage,
  LoginPage,
  MyLibraryPage,
  MyPage,
  PostDetailPage,
  PostFeedPage,
  preloadPagesWhenIdle,
  RegisterPage,
  SettingsPage,
  SummaryCreatePage,
  SummaryDetailPage,
  SummaryEditPage,
  SummaryListPage,
  UserProfilePage,
} from '@/pages';
import { FullPageSpinner } from '@/shared/components/FullPageSpinner';
import {
  AppShell,
  LandingLayout,
  PageLayout,
  SideColumnLayout,
  StandaloneLayout,
} from '@/shell';
import { useAuth } from '@/shell/hooks';
import NotFoundPage from '@/shell/NotFoundPage';
import ScrollToTop from '@/shell/ScrollToTop';

function App() {
  const { isLoggedIn } = useAuth();
  // 새로고침하면 로그인 상태를 먼저 되살린 뒤 화면을 그려요.
  const ready = useRestoreSession();

  // 첫 화면을 그린 뒤 나머지 페이지 조각을 미리 받아 둬요.
  useEffect(() => {
    if (ready) preloadPagesWhenIdle();
  }, [ready]);

  if (!ready) return <FullPageSpinner />;

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<AppShell />}>
          {/* 첫 화면: 로그아웃이면 넓은 랜딩, 로그인하면 왼쪽 칼럼이 있는 앱 틀 */}
          <Route
            element={isLoggedIn ? <SideColumnLayout /> : <LandingLayout />}
          >
            <Route path='/' element={<HomePage />} />
          </Route>

          <Route element={<SideColumnLayout />}>
            <Route path='/post' element={<PostFeedPage />} />
            <Route path='/post/:post_id' element={<PostDetailPage />} />

            <Route path='/search' element={<BookSearchPage />} />
            <Route
              path='/integrated-search'
              element={<IntegratedSearchPage />}
            />

            <Route path='/debate' element={<DebateListPage />} />
            <Route path='/debate/create' element={<DebateCreatePage />} />
            <Route path='/debate/:debate_id' element={<DebateDetailPage />} />
            <Route
              path='/debate/:debate_id/update'
              element={<DebateEditPage />}
            />

            <Route path='/summary' element={<SummaryListPage />} />
            <Route path='/summary/create' element={<SummaryCreatePage />} />
            <Route
              path='/summary/:summary_id'
              element={<SummaryDetailPage />}
            />
            <Route
              path='/summary/:summary_id/update'
              element={<SummaryEditPage />}
            />

            <Route path='/mypage/library' element={<MyLibraryPage />} />
          </Route>

          <Route element={<PageLayout />}>
            <Route path='/mypage' element={<MyPage />} />
            <Route path='/user/:user_id' element={<UserProfilePage />} />
            <Route path='/settings' element={<SettingsPage />} />
            <Route
              path='/checkout/success'
              element={<CheckoutResultPage result='success' />}
            />
            <Route
              path='/checkout/fail'
              element={<CheckoutResultPage result='fail' />}
            />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Route>

        <Route element={<StandaloneLayout />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/auth/:provider' element={<AuthCallbackPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
