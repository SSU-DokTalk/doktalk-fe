import { DebateType } from "@/types/data";
import ProfileIcon from "@/components/base/ProfileIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import {
  faComment,
  faHeart as faHeartRegular,
} from "@fortawesome/free-regular-svg-icons";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PopularDebateCard({
  debate,
  hasLiked = false,
  setHasLiked,
}: {
  debate: DebateType;
  hasLiked?: boolean;
  setHasLiked: Dispatch<SetStateAction<number[]>>;
}) {
  const navigate = useNavigate();

  const doLike = () => {
    // Like API 호출
    axios.post(`/api/debate/${debate.id}/like`).then(() => {
      // 좋아요 성공
      setHasLiked((prv) => prv.concat([debate.id]));
      debate.likes_num++;
    });
  };

  const doUnlike = () => {
    axios.delete(`/api/debate/${debate.id}/like`).then(() => {
      setHasLiked((prv) => prv.filter((val) => val !== debate.id));
      debate.likes_num--;
    });
  };

  return (
    <div id="popular-debate-card">
      <div className="title" onClick={() => navigate(`/debate/${debate.id}`)}>
        {debate.title}
      </div>
      <div className="content" onClick={() => navigate(`/debate/${debate.id}`)}>
        {debate.content}
      </div>
      <div className="content-info">
        <div
          className="user-info"
          onClick={() => navigate(`/user/${debate.user.id}`)}
        >
          <ProfileIcon profile={debate.user.profile} size={15} />
          <div className="user-name">{debate.user.name}</div>
        </div>
        <div className="additional-info">
          <div className="like-container">
            {hasLiked ? (
              <FontAwesomeIcon
                icon={faHeartSolid}
                onClick={doUnlike}
                className="like-icon liked"
              />
            ) : (
              <FontAwesomeIcon
                icon={faHeartRegular}
                onClick={doLike}
                className="like-icon"
              />
            )}
            <div className="like-text">{debate.likes_num}</div>
          </div>
          <div
            className="comment-container"
            onClick={() => navigate(`/debate/${debate.id}`)}
          >
            <FontAwesomeIcon icon={faComment} />
            <div className="comment-text">{debate.comments_num}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularDebateCard;
