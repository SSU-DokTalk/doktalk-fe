import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Profile from "@/components/Profile";

import { selectUser } from "@/stores/user";
import { useAppSelector } from "@/stores/hooks";

import { InitialUser, User } from "@/types/data";
import PostThumbnail from "@/components/PostThumbnail";

function MyPage() {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const [userProfile, setUserProfile] = useState<User>(InitialUser);

  useEffect(() => {
    if (user.id == undefined) {
      navigate("/login");
    }

    axios.get("/api/user/me").then(
      (res) => {
        setUserProfile(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, [user]);

  return (
    <div id="mypage">
      <Profile userProfile={userProfile} is_me />
      <div className="content-container">
        <div className="content-left-margin" />
        <div className="content">
          <PostThumbnail />
        </div>
        <div className="content-right-margin" />
      </div>
    </div>
  );
}

export default MyPage;
