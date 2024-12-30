/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { toggleUpdateFlag } from "@/stores/store";
import { PostType } from "@/types/components";

// ...existing code...

const usePosts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateFlag = useSelector((state: any) => state.posts?.updateFlag);
  const dispatch = useDispatch();

  const fetchUpdate = async () => {
    try {
      const response = await axios.get("/api/post/recent");
      setPosts([...response.data.items]);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const update = () => {
    dispatch(toggleUpdateFlag());
  };

  useEffect(() => {
    fetchUpdate();
  }, [updateFlag]);

  return { posts, loading, error, update };
};

export default usePosts;
