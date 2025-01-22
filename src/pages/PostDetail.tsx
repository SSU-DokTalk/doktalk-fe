import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import ProfileIcon from "@/components/base/ProfileIcon";
import { useEffect, useState } from "react";
import { PostType } from "@/types/data";
import { getTimeDiff } from "@/functions";
import { selectUser } from "@/stores/user";
import { useAppSelector } from "@/stores/hooks";
import { InitialPost } from "@/types/initialValue";
import "@/assets/css/pages/_post_detail.scss";
import axios from "axios";

function PostDetail() {
  const { post_id } = useParams();
  const [post, setPost] = useState<PostType>(InitialPost);
  const [comments] = useState<any[]>([]);

  const user = useAppSelector(selectUser);

  useEffect(() => {
    axios.get(`/api/post/${post_id}`).then((res) => {
      let { data }: { data: PostType } = res;
      setPost(data);
    });
  }, [post_id]);

  return (
    <div id="summary-detail">
      <div className="user-header">
        <div className="user-header__info">
          <ProfileIcon
            profile={post.user.profile}
            size={40}
            className="user-header__avatar"
          />
          <div className="user-header__text">
            <span className="user-header__nickname">{post.user.name}</span>
            <span className="user-header__time">
              {getTimeDiff(post.created)}
            </span>
          </div>
        </div>

        <div className="user-header__actions">
          {user.id === post.user.id && (
            <>
              <button>수정</button>
              <button className="delete">삭제</button>
            </>
          )}
        </div>
      </div>
      <div className="discussion-info">
        <h2 className="discussion-info__title">{post.title}</h2>
        <div className="discussion-info__likes">
          <FontAwesomeIcon icon={faHeart} className="like-icon" />
          <span className="discussion-info__likes__text">{post.likes_num}</span>
        </div>
      </div>
      <div className="comment-box">
        <div className="comment-box__title">댓글</div>
        <div className="comment">
          <div className="comment__info">
            <ProfileIcon
              profile={user.profile}
              size={30}
              className="comment__avatar"
            />
          </div>
          <textarea placeholder="댓글을 입력해주세요." />
        </div>
        <div className="comment-box__input">
          <button>등록</button>
        </div>
        <div className="comment-box__comments">
          {comments.map((comment) => (
            <div className="comment" key={comment.id}>
              <div className="comment__info">
                <ProfileIcon
                  profile={comment.user.profile}
                  size={30}
                  className="comment__avatar"
                />
              </div>
              <div className="comment__text">
                <span className="comment__nickname">{comment.user.name}</span>
                <span className="comment__time">
                  {/* {getTimeDiff(comment.created)} */}
                </span>
                <span className="comment__content">{comment.content}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
