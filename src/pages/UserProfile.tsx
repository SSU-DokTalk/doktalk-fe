import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Profile from "@/components/Profile";

import { useAppSelector } from "@/stores/hooks";
import { selectUser } from "@/stores/user";

import { InitialUser, User } from "@/types/data";

function UserProfile() {
  const { user_id } = useParams();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<User>(InitialUser);

  useEffect(() => {
    if (user_id && parseInt(user_id ?? "0") == user.id) navigate("/mypage");
    axios.get(`/api/user/${user_id}`).then(
      (res) => {
        setUserProfile(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  });

  return (
    <>
      <Profile userProfile={userProfile} />
    </>
  );
}

export default UserProfile;
