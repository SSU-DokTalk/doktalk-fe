import { Route, Routes } from "react-router-dom";

import "@/assets/css/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import BasicLayout from "@/layouts/BasicLayout";

import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/Register";
import Auth from "@/pages/Auth";
import MyPage from "@/pages/MyPage";
import Search from "@/pages/Search";
import UserProfile from "@/pages/UserProfile";
import Summary from "./pages/Summary";

function App() {
  return (
    <Routes>
      <Route element={<BasicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/search" element={<Search />}></Route>
        <Route path="/community" element={<Landing />}></Route>
        <Route path="/debate" element={<Landing />}></Route>
        <Route path="/summary" element={<Summary />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/user/:user_id" element={<UserProfile />}></Route>
      </Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/auth/:provider" element={<Auth />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
