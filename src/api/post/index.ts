import axios from "axios";

export const heartUp = async (postId: number) => {
  axios.post(`/api/post/${postId}/like`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
