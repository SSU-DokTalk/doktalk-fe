import Image from "@/components/base/Image";
import ProfileIcon from "@/components/base/ProfileIcon";
import { getTimeDiff } from "@/functions";
import { DebateType } from "@/types/data";

function DebateCard({ debate }: { debate: DebateType }) {
  return (
    <div id="summary-card">
      <div className="summary-image-container">
        <Image
          src={debate.book.image}
          alt="summary image"
          width="97px"
          height="142px"
        />
      </div>
      <div className="summary-container">
        <div className="summary-content-container">
          <div className="title">{debate.title}</div>
          <pre className="content">{debate.content}</pre>
        </div>
        <div className="info-container">
          <ProfileIcon
            profile={debate.user.profile}
            size={28}
            className="user-icon"
          />
          <div className="user-name">{debate.user.name}</div>
          <div className="created-time">{getTimeDiff(debate.created)}</div>
        </div>
      </div>
    </div>
  );
}

export default DebateCard;
