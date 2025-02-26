import axios from "axios";
import { Route, Routes } from "react-router-dom";

import "@/assets/css/main.scss";
import "@/assets/css/pages/_settings.scss";
import "@/assets/css/components/_sidebar.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "@/assets/css/tailwind.css";

import BasicLayout from "@/layouts/BasicLayout";

import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/Register";
import Auth from "@/pages/Auth";
import MyPage from "@/pages/MyPage";
import UserProfile from "@/pages/UserProfile";
import Summary from "@/pages/Summary";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./stores/hooks";
import { selectUser, setUser } from "./stores/user";
import cookie from "react-cookies";
import ContentMainLayout from "./layouts/ContentMainLayout";
import LandingUpper from "./components/section/LandingUpper";
import Debate from "./pages/Debate";
import Search from "./pages/Search";
import CircularProgress from "@mui/material/CircularProgress";
import i18n from "./locales/i18n";
import CreateDebate from "./pages/CreateDebate";
import CreateSummary from "./pages/CreateSummary";
import Settings from "./pages/Settings";
import DebateDetail from "./pages/DebateDetail";
import SummaryDetail from "./pages/SummaryDetail";
import PostDetail from "./pages/PostDetail";

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("lang") == null) {
      localStorage.setItem("lang", "kr");
    }
    i18n.changeLanguage(localStorage.getItem("lang") as string);

    if (cookie.load("Authorization") != undefined) {
      axios
        .post(
          `/api/user/access-token`,
          {},
          {
            params: {
              refresh_token: cookie.load("Authorization"),
            },
          }
        )
        .then(async (res) => {
          // 새 토큰 저장
          let token = res.headers.authorization;
          axios.defaults.headers.common["Authorization"] = token;

          // 유저 정보가 없는 경우 다시 요청
          if (user.id == 0) {
            axios
              .get("/api/user/me")
              .then(async (res) => {
                let {
                  id,
                  name,
                  role,
                  profile,
                }: {
                  id: number;
                  name: string;
                  role: "USER" | "ADMIN";
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
              })
              .catch((err) => {
                console.log(err);
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
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <CircularProgress className='loading-spinner' />
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<BasicLayout />}>
        <Route
          element={
            <ContentMainLayout>
              <LandingUpper />
            </ContentMainLayout>
          }>
          <Route path='/' element={<Landing />}></Route>
          <Route path='/debate' element={<Debate />}></Route>
        </Route>
        <Route element={<ContentMainLayout />}>
          <Route path='/search' element={<Search />}></Route>
          <Route path='/summary' element={<Summary />}></Route>
          <Route path='/debate/:debate_id' element={<DebateDetail />}></Route>
          <Route
            path='/summary/:summary_id'
            element={<SummaryDetail />}></Route>
          <Route path='/post/:post_id' element={<PostDetail />}></Route>
          <Route path='/summary/create' element={<CreateSummary />}></Route>
          <Route path='/debate/create' element={<CreateDebate />}></Route>
        </Route>
        <Route path='/mypage' element={<MyPage />}></Route>
        <Route path='/user/:user_id' element={<UserProfile />}></Route>
        <Route path='settings' element={<Settings />}></Route>
      </Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/auth/:provider' element={<Auth />}></Route>
      <Route path='*' element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
