/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import axios from "axios";

// ...existing code...

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const update = async () => {
    try {
      const response = await axios.get("/api/post/recent");
      setPosts(response.data.items);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    update();
  }, [posts]);

  return { posts, loading, error, update };
};

export default usePosts;
