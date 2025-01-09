import { DebateType } from "@/types/data";
import ProfileIcon from "@/components/base/ProfileIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

function PopularDebateCard({
  debate,
  has_liked = false,
}: {
  debate: DebateType;
  has_liked?: boolean;
}) {
  return (
    <div id="popular-debate-card">
      <div className="title">{debate.title}</div>
      <div className="content">{debate.content}</div>
      <div className="content-info">
        <div className="user-info">
          <ProfileIcon profile={debate.user.profile} />
          <div className="user-name">{debate.user.name}</div>
        </div>
        <div className="additional-info">
          <div className="comment-container">
            <FontAwesomeIcon icon={faComment} />
            <div className="comment-count">{debate.comments_num}</div>
          </div>
          <div className="like-container">
            {has_liked ? (
              <FontAwesomeIcon icon={faHeartSolid} />
            ) : (
              <FontAwesomeIcon icon={faHeartRegular} />
            )}
            <div className="like-count">{debate.likes_num}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularDebateCard;
