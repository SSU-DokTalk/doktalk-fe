import { SummaryType } from "@/types/data";
import ProfileIcon from "@/components/base/ProfileIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart as faHeartRegular,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PopularSummaryCard({
  idx,
  summary,
  hasLiked = false,
  setHasLiked,
}: {
  idx: number;
  summary: SummaryType;
  hasLiked?: boolean;
  setHasLiked: Dispatch<SetStateAction<boolean[]>>;
}) {
  const navigate = useNavigate();

  const doLike = () => {
    // Like API 호출
    axios
      .post(`/api/summary/${summary.id}/like`)
      .then(() => {
        // 좋아요 성공
        setHasLiked((prv) =>
          prv
            .slice(0, idx)
            .concat(true)
            .concat(prv.slice(idx + 1))
        );
        summary.likes_num++;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const doUnlike = () => {
    axios
      .delete(`/api/summary/${summary.id}/like`)
      .then(() => {
        setHasLiked((prv) =>
          prv
            .slice(0, idx)
            .concat(false)
            .concat(prv.slice(idx + 1))
        );
        summary.likes_num--;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="popular-summary-card">
      <div className="summary-title">{summary.title}</div>
      <div className="summary-content">{summary.free_content}</div>
      <div className="info-container">
        <div className="user-info">
          <ProfileIcon size={15} />
          <div className="user-name">{summary.user.name}</div>
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
            <div className="like-text">{summary.likes_num}</div>
          </div>
          <div className="comment-container">
            <FontAwesomeIcon icon={faComment} />
            <div className="comment-text">{summary.comments_num}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularSummaryCard;
