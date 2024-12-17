import Profile from "@/components/Profile";
import { useAppSelector } from "@/stores/hooks";
import { selectUser } from "@/stores/user";
import { InitialUser, User } from "@/types/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <>
      <Profile userProfile={userProfile} is_me />
    </>
  );
}

export default MyPage;
