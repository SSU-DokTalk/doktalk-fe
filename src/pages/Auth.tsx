import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { setUser } from "@/stores/user";
import { useAppDispatch } from "@/stores/hooks";

const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

function Auth() {
  const { provider } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    axios
      .get(`/api/oauth/${provider}`, {
        params: {
          code: code,
          redirect_uri: REDIRECT_URI,
        },
      })
      .then(async (res) => {
        let {
          id,
          name,
          role,
          profile,
        }: { id: number; name: string; profile: string; role: string } =
          res.data;
        const token = res.headers.authorization;

        axios.defaults.headers.common["Authorization"] = token;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({ id, name, profile, role }));

        await dispatch(
          setUser({
            id: id,
            name: name,
            profile: profile,
            role: role,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        navigate("/");
      });
  }, [provider, code, dispatch, navigate]);

  return <></>;
}

export default Auth;
