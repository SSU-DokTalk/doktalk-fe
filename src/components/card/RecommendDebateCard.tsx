import { DebateType } from "@/types/data";
import Image from "@/components/base/Image";
import ProfileIcon from "@/components/base/ProfileIcon";

function RecommendDebateCard({
  debate,
  ...props
}: { debate: DebateType } & React.HTMLProps<HTMLDivElement>) {
  return (
    <div id="recommend-debate-card" {...props}>
      <Image
        src={debate.book.image}
        alt={"debate book image"}
        width={86}
        height={124}
      />
      <div className="debate-info">
        <div className="debate">
          <div className="debate-title">{debate.title}</div>
          <div className="debate-content">{debate.content}</div>
        </div>
        <div className="debate-user">
          <ProfileIcon
            size={23}
            profile={debate.user.profile}
            className="debate-user-icon"
          />
          <div className="debate-user-name">{debate.user.name}</div>
        </div>
      </div>
    </div>
  );
}

export default RecommendDebateCard;
