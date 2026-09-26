import axios from 'axios';
import { Route, Routes } from 'react-router-dom';

import '@/assets/css/main.scss';
import '@/assets/css/pages/_settings.scss';
import '@/assets/css/components/_sidebar.scss';
import '@/assets/css/tailwind.css';

import { AppShell, LandingLayout, PageLayout, SideColumnLayout } from '@/shell';

import Landing from '@/pages/Landing';
import PostFeedPage from '@/features/post/pages/PostFeedPage';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Register from '@/pages/Register';
import Auth from '@/pages/Auth';
import MyPage from '@/pages/MyPage';
import UserProfile from '@/pages/UserProfile';
import SummaryListPage from '@/features/summary/pages/SummaryListPage';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './stores/hooks';
import { selectUser, setUser } from './stores/user';
import cookie from 'react-cookies';
import DebateListPage from './features/debate/pages/DebateListPage';
import BookSearchPage from './features/search/pages/BookSearchPage';
import CircularProgress from '@mui/material/CircularProgress';
import i18n from './locales/i18n';
import DebateCreatePage from './features/debate/pages/DebateCreatePage';
import SummaryCreatePage from './features/summary/pages/SummaryCreatePage';
import Settings from './pages/Settings';
import DebateDetailPage from './features/debate/pages/DebateDetailPage';
import SummaryDetailPage from './features/summary/pages/SummaryDetailPage';
import PostDetailPage from './features/post/pages/PostDetailPage';
import SummaryEditPage from './features/summary/pages/SummaryEditPage';
import DebateEditPage from './features/debate/pages/DebateEditPage';
import { CheckoutSuccess } from './components/Payments/CheckoutSuccess';
import { CheckoutFail } from './components/Payments/CheckoutFail';
import IntegratedSearchPage from './features/search/pages/IntegratedSearchPage';
import MyLibrary from './pages/MyLibrary';
import ScrollToTop from './components/utils/ScrollToTop';

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('lang') == null) {
      localStorage.setItem('lang', 'mn');
    }
    i18n.changeLanguage(localStorage.getItem('lang') as string);

    if (cookie.load('Authorization') != undefined) {
      axios
        .post(
          `/api/user/access-token`,
          {},
          {
            params: {
              refresh_token: cookie.load('Authorization'),
            },
          }
        )
        .then(async (res) => {
          // 새 토큰 저장
          let token = res.headers.authorization;
          axios.defaults.headers.common['Authorization'] = token;

          // 유저 정보가 없는 경우 다시 요청
          if (user.id == 0) {
            axios.get('/api/user/me').then(async (res) => {
              let {
                id,
                name,
                role,
                profile,
              }: {
                id: number;
                name: string;
                role: 'USER' | 'ADMIN';
                profile: string;
              } = res.data;
              if (id != 0) {
                await dispatch(
                  setUser({
                    id: id,
                    name: name,
                    profile: profile,
                    role: role,
                  })
                );
              }
            });
          }
        })
        .finally(() => {
          setIsAuthChecked(true);
        });
    } else {
      setIsAuthChecked(true);
    }
  }, []);

  if (!isAuthChecked) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress className='loading-spinner' />
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path='/checkout'>
          <Route path='/checkout/success' element={<CheckoutSuccess />}></Route>
          <Route path='/checkout/fail' element={<CheckoutFail />}></Route>
        </Route>
        <Route element={<AppShell />}>
          <Route element={<LandingLayout />}>
            <Route path='/' element={<Landing />}></Route>
          </Route>

          <Route element={<SideColumnLayout />}>
            <Route path='/post' element={<PostFeedPage />}></Route>

            <Route path='/search' element={<BookSearchPage />}></Route>
            <Route
              path='/integrated-search'
              element={<IntegratedSearchPage />}
            ></Route>

            <Route path='/debate' element={<DebateListPage />}></Route>
            <Route path='/debate/create' element={<DebateCreatePage />}></Route>
            <Route
              path='/debate/:debate_id'
              element={<DebateDetailPage />}
            ></Route>
            <Route
              path='/debate/:debate_id/update'
              element={<DebateEditPage />}
            ></Route>

            <Route path='/summary' element={<SummaryListPage />}></Route>
            <Route
              path='/summary/create'
              element={<SummaryCreatePage />}
            ></Route>
            <Route
              path='/summary/:summary_id'
              element={<SummaryDetailPage />}
            ></Route>
            <Route
              path='/summary/:summary_id/update'
              element={<SummaryEditPage />}
            ></Route>

            <Route path='/post/:post_id' element={<PostDetailPage />}></Route>
            <Route path='/mypage/library' element={<MyLibrary />}></Route>
          </Route>

          <Route element={<PageLayout />}>
            <Route path='/mypage' element={<MyPage />}></Route>
            <Route path='/user/:user_id' element={<UserProfile />}></Route>
            <Route path='settings' element={<Settings />}></Route>
          </Route>
        </Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/auth/:provider' element={<Auth />}></Route>

        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
