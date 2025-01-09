import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Profile from "@/components/section/Profile";

import { useAppSelector } from "@/stores/hooks";
import { selectUser } from "@/stores/user";

import { UserType } from "@/types/data";
import {
  InitialUser,
  MyTabsCandidate,
  UserTabsCandidate,
} from "@/types/initialValue";
import ProfileTabDetails from "@/components/section/ProfileTabDetails";

function UserProfile() {
  const { user_id } = useParams();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserType>(InitialUser);
  const [currentTab, setCurrentTab] = useState<UserTabsCandidate>("/post");

  useEffect(() => {
    if (user_id && user.id != 0 && parseInt(user_id ?? "0") == user.id)
      navigate("/mypage");
    axios.get(`/api/user/${user_id}`).then(
      (res) => {
        setUserProfile(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, [user_id]);

  return (
    <div id="mypage">
      <Profile
        userProfile={userProfile}
        currentTab={currentTab}
        setCurrentTab={
          setCurrentTab as Dispatch<SetStateAction<MyTabsCandidate>>
        }
      />
      <div className="content-container">
        <div className="content-left-margin" />
        <div className="content">
          <ProfileTabDetails
            currentTab={currentTab}
            userProfile={userProfile}
          />
        </div>
        <div className="content-right-margin" />
      </div>
    </div>
  );
}

export default UserProfile;
