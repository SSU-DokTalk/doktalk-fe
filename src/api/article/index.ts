import axios from "axios";

export const heartUp = async (articleId: number) => {
  axios.post(`/api/post/${articleId}/like`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
