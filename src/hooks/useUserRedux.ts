import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser, unsetUser, selectUser } from "@/stores/user";
import type { RootState } from "@/stores/store";

const useUserRedux = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => selectUser(state));

  useEffect(() => {
    const fetchUser = () => {
      axios
        .get("/api/user/me")
        .then((res) => {
          dispatch(setUser(res.data));
        })
        .catch((err) => {
          console.log(err);
          dispatch(unsetUser());
        });
    };

    fetchUser();
  }, [dispatch]);

  return user;
};

export default useUserRedux;
