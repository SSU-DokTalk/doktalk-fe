import ProfileIcon from "@/components/base/ProfileIcon";
import { getTimeDiff } from "@/functions";
import { CommentType } from "@/types/data";
import { faThumbsUp as faThumbsUpSolid } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as faThumbsUpRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
function CommentCard({
  idx,
  comment,
  itemType,
  hasLiked,
  setHasLiked,
}: {
  idx: number;
  comment: CommentType;
  itemType: "post" | "summary" | "debate";
  hasLiked: boolean;
  setHasLiked: Dispatch<SetStateAction<boolean[]>>;
}) {
  const doLike = () => {
    axios.post(`/api/${itemType}/comment/${comment.id}/like`).then(() => {
      setHasLiked((prv) =>
        prv
          .slice(0, idx)
          .concat(true)
          .concat(prv.slice(idx + 1))
      );
      comment.likes_num++;
    });
  };

  const doUnlike = () => {
    axios.delete(`/api/${itemType}/comment/${comment.id}/like`).then(() => {
      setHasLiked((prv) =>
        prv
          .slice(0, idx)
          .concat(false)
          .concat(prv.slice(idx + 1))
      );
      comment.likes_num--;
    });
  };

  return (
    <div id="comment-card">
      <ProfileIcon profile={comment.user.profile} size={34} />
      <div className="comment-card__container">
        <div className="comment-card__nickname">{comment.user.name}</div>
        <div className="comment-card__time">{getTimeDiff(comment.created)}</div>
        <div className="comment-card__content">{comment.content}</div>
        <div className="comment-card__additional">
          <div className="comment-card__reply">답글 {comment.comments_num}</div>
          <div className="comment-card__like">
            {hasLiked ? (
              <FontAwesomeIcon icon={faThumbsUpSolid} onClick={doUnlike} />
            ) : (
              <FontAwesomeIcon icon={faThumbsUpRegular} onClick={doLike} />
            )}
            <div className="comment-card__like_num">{comment.likes_num}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
