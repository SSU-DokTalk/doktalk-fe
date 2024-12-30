import { unsetUser } from "@/stores/user";
import { useDispatch } from "react-redux";

const useLogout = () => {
    const dispatch = useDispatch();
    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        dispatch(unsetUser());
    };
    return logout
}

export default useLogout;