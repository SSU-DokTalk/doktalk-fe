import { useAppDispatch } from "@/stores/hooks";
import { setUser } from "@/stores/user";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
        const { id, name, role }: { id: number; name: string; role: string } =
          res.data;
        const token = res.headers.authorization;

        axios.defaults.headers.common["Authorization"] = token;
        await dispatch(
          setUser({
            id: id,
            name: name,
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
  }, []);

  return <></>;
}

export default Auth;
