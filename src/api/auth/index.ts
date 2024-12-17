import axios from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const signup = async (data: any) => {
  axios.post("/api/user/register", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
