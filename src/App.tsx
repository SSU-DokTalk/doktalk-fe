import { Route, Routes } from 'react-router-dom';

import ScrollToTop from '@/shell/ScrollToTop';
import AuthCallbackPage from '@/features/auth/pages/AuthCallbackPage';
import LoginPage from '@/features/auth/pages/LoginPage';
import RegisterPage from '@/features/auth/pages/RegisterPage';
import { useRestoreSession } from '@/features/auth/useRestoreSession';
import DebateCreatePage from '@/features/debate/pages/DebateCreatePage';
import DebateDetailPage from '@/features/debate/pages/DebateDetailPage';
import DebateEditPage from '@/features/debate/pages/DebateEditPage';
import DebateListPage from '@/features/debate/pages/DebateListPage';
import HomePage from '@/features/home/pages/HomePage';
import MyLibraryPage from '@/features/library/pages/MyLibraryPage';
import CheckoutResultPage from '@/features/payment/pages/CheckoutResultPage';
import PostDetailPage from '@/features/post/pages/PostDetailPage';
import PostFeedPage from '@/features/post/pages/PostFeedPage';
import MyPage from '@/features/profile/pages/MyPage';
import UserProfilePage from '@/features/profile/pages/UserProfilePage';
import BookSearchPage from '@/features/search/pages/BookSearchPage';
import IntegratedSearchPage from '@/features/search/pages/IntegratedSearchPage';
import SettingsPage from '@/features/settings/pages/SettingsPage';
import SummaryCreatePage from '@/features/summary/pages/SummaryCreatePage';
import SummaryDetailPage from '@/features/summary/pages/SummaryDetailPage';
import SummaryEditPage from '@/features/summary/pages/SummaryEditPage';
import SummaryListPage from '@/features/summary/pages/SummaryListPage';
import { FullPageSpinner } from '@/shared/components/FullPageSpinner';
import { AppShell, LandingLayout, PageLayout, SideColumnLayout } from '@/shell';
import { useAuth } from '@/shell/hooks';
import NotFoundPage from '@/shell/NotFoundPage';

function App() {
  const { isLoggedIn } = useAuth();
  // 새로고침하면 로그인 상태를 먼저 되살린 뒤 화면을 그려요.
  const ready = useRestoreSession();
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

        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/auth/:provider' element={<AuthCallbackPage />} />
      </Routes>
    </>
  );
}

export default App;
