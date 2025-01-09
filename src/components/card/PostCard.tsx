import { PostType } from "@/types/data";
import { getFileTypeFromUrl, getTimeDiff } from "@/functions";
import ProfileIcon from "@/components/base/ProfileIcon";
import Image from "@/components/base/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart as faHeartRegular,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { ACCEPTABLE_IMAGE } from "@/common/variables";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

function PostCard({
  idx,
  post,
  hasLiked = false,
  setHasLiked,
}: {
  idx: number;
  post: PostType;
  hasLiked?: boolean;
  setHasLiked: Dispatch<SetStateAction<boolean[]>>;
}) {
  const navigate = useNavigate();

  const doLike = () => {
    // Like API 호출
    axios
      .post(`/api/post/${post.id}/like`)
      .then(() => {
        // 좋아요 성공
        setHasLiked((prv) =>
          prv
            .slice(0, idx)
            .concat(true)
            .concat(prv.slice(idx + 1))
        );
        post.likes_num++;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const doUnlike = () => {
    axios
      .delete(`/api/post/${post.id}/like`)
      .then(() => {
        setHasLiked((prv) =>
          prv
            .slice(0, idx)
            .concat(false)
            .concat(prv.slice(idx + 1))
        );
        post.likes_num--;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="post-card">
      <div className="header-container">
        <ProfileIcon
          profile={post.user.profile}
          size={28}
          onClick={() => navigate(`/user/${post.user_id}`)}
        />
        <div
          className="user-name"
          onClick={() => navigate(`/user/${post.user_id}`)}
        >
          {post.user.name}
        </div>
        <div className="created-time">{getTimeDiff(post.created)}</div>
      </div>
      <div className="title" onClick={() => navigate(`/post/${post.id}`)}>
        {post.title}
      </div>
      <pre className="content" onClick={() => navigate(`/post/${post.id}`)}>
        {post.content}
      </pre>
      <div
        className="image-container"
        onClick={() => navigate(`/post/${post.id}`)}
      >
        {post.files
          ?.filter(
            (file) =>
              !file.startsWith(import.meta.env.VITE_IMG_SRC) ||
              ACCEPTABLE_IMAGE.includes(`.${getFileTypeFromUrl(file)}`)
          )
          .slice(0, 2)
          .map((file, index) => {
            return (
              <Image
                src={file}
                alt={`image${index}`}
                width={"49%"}
                key={index}
              />
            );
          })}
      </div>
      <div className="info-container">
        <div className="like-container">
          {hasLiked ? (
            <FontAwesomeIcon
              icon={faHeartSolid}
              fontSize={20}
              className="like-icon liked"
              onClick={doUnlike}
            />
          ) : (
            <FontAwesomeIcon
              icon={faHeartRegular}
              fontSize={20}
              className="like-icon"
              onClick={doLike}
            />
          )}
          <div className="like-count">{post.likes_num}</div>
        </div>
        <div
          className="comment-container"
          onClick={() => navigate(`/post/${post.id}`)}
        >
          <FontAwesomeIcon icon={faComment} fontSize={20} />
          <div className="comment-count">{post.comments_num}</div>
        </div>
        <div
          className="more-comment"
          onClick={() => navigate(`/post/${post.id}`)}
        >
          댓글 더보기
        </div>
      </div>
    </div>
  );
}

export default PostCard;
