/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import axios from "axios";

// ...existing code...

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateFlag, setUpdateFlag] = useState(false);

  const fetchUpdate = async () => {
    try {
      const response = await axios.get("/api/post/recent");
      setPosts(response.data.items);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const update = async () => {
    setUpdateFlag((prev) => !prev);
  }

  useEffect(() => {
    fetchUpdate();
  }, [posts, updateFlag]);

  return { posts, loading, error, update };
};

export default usePosts;
