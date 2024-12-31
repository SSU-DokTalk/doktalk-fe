import { Post } from "@/types/data";
import axios from "axios";
import { useEffect, useState } from "react";
import write from "@/assets/images/write.svg";
import userIcon from "@/assets/images/profile.svg";
import { selectUser } from "@/stores/user";
import { useAppSelector } from "@/stores/hooks";

function PostThumbnail() {
  const user = useAppSelector(selectUser);
  const [posts, setPosts] = useState<Post[]>([]);
  const userId = 1;

  useEffect(() => {
    axios
      .get(`/api/user/${userId}/posts`, {
        params: {
          page: 1,
          size: 10,
        },
      })
      .then(
        (res) => {
          let { items } = res.data;
          setPosts(items);
          console.log(items);
        },
        (err) => {
          console.log(err);
        }
      );
  }, []);
  return (
    <div className="posts">
      {user.id == userId ? (
        <div className="write-post-container">
          <div className="write-post">
            <img
              src={user.profile ?? userIcon}
              alt="user icon"
              className="user-icon"
            />
            <div className="write-container">
              <input
                type="text"
                placeholder="게시글을 작성해보세요!"
                className="write-input"
              />
              <img src={write} alt="" className="write-icon" />
            </div>
          </div>
        </div>
      ) : null}
      <div className="post-list">
        {posts.map((post) => {
          return (
            <div className="post-container">
              <div className="post-header">
                <img
                  src={post.user.profile ?? userIcon}
                  alt="user icon"
                  className="user-icon"
                />
                <div className="user-name">{post.user.name}</div>
                <div className="created-time">{post.created_at}</div>
              </div>
              <div className="post-content">
                <div className="title">{post.title}</div>
                <div className="content">{post.content}</div>
                {post.image1 ? (
                  <img
                    src={post.image1}
                    alt="post image1"
                    className="post-img1"
                  />
                ) : null}
                {post.image2 ? (
                  <img
                    src={post.image2}
                    alt="post image2"
                    className="post-img2"
                  />
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PostThumbnail;
