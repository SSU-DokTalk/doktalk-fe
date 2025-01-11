import Image from "@/components/base/Image";
import ProfileIcon from "@/components/base/ProfileIcon";
import { getTimeDiff } from "@/functions";
import { DebateType } from "@/types/data";
import {
  faComment,
  faHeart as faHeartRegular,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

function DebateCard({
  debate,
  idx,
  hasLiked,
  setHasLiked,
}: {
  debate: DebateType;
  idx: number;
  hasLiked: boolean;
  setHasLiked: Dispatch<SetStateAction<boolean[]>>;
}) {
  const navigate = useNavigate();

  const doLike = () => {
    // Like API 호출
    axios
      .post(`/api/debate/${debate.id}/like`)
      .then(() => {
        // 좋아요 성공
        setHasLiked((prv) =>
          prv
            .slice(0, idx)
            .concat(true)
            .concat(prv.slice(idx + 1))
        );
        debate.likes_num++;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const doUnlike = () => {
    axios
      .delete(`/api/debate/${debate.id}/like`)
      .then(() => {
        setHasLiked((prv) =>
          prv
            .slice(0, idx)
            .concat(false)
            .concat(prv.slice(idx + 1))
        );
        debate.likes_num--;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="debate-card">
      <div className="image-container">
        <Image
          src={debate.book.image}
          alt="debate image"
          width="97px"
          height="142px"
        />
      </div>
      <div className="item-container">
        <div
          className="item-content-container"
          onClick={() => navigate(`/summary/${debate.id}`)}
        >
          <div className="title">{debate.title}</div>
          <div className="content">{debate.content}</div>
        </div>
        <div className="info-container">
          <div className="user-info">
            <ProfileIcon
              profile={debate.user.profile}
              size={28}
              className="user-icon"
            />
            <div className="user-name">{debate.user.name}</div>
            <div className="created-time">{getTimeDiff(debate.created)}</div>
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
            <div className="comment-container">
              <FontAwesomeIcon icon={faComment} />
              <div className="comment-text">{debate.comments_num}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DebateCard;
