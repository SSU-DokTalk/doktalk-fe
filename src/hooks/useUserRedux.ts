// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { setUser, unsetUser, selectUser } from "@/stores/user";
// import type { RootState } from "@/stores/store";

// const useUserRedux = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state: RootState) => selectUser(state));

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       axios.defaults.headers.common["Authorization"] = token;
//     }

//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("/api/user/me");
//         localStorage.setItem("user", JSON.stringify(res.data));
//         dispatch(setUser(res.data));
//       } catch (err) {
//         console.log(err);
//         localStorage.removeItem("user");
//         dispatch(unsetUser());
//       }
//     };

//     const savedUser = localStorage.getItem("user");
//     if (savedUser) {
//       dispatch(setUser(JSON.parse(savedUser)));
//     } else {
//       fetchUser();
//     }
//   }, [dispatch]);

//   return { user,  };
// };

// export default useUserRedux;
