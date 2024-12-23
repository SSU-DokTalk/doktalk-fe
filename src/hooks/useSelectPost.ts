import { useState } from "react";
import { PostType } from "@/types/components";

const useSelectPost = () => {
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);

  const handlePostClick = (post: PostType) => {
    setSelectedPost(post);
  };

  const handleCloseDetail = () => {
    setSelectedPost(null);
  };

  return { selectedPost, handlePostClick, handleCloseDetail };
};

export default useSelectPost;
