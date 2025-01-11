import { useAppSelector } from "@/stores/hooks";
import { selectUser } from "@/stores/user";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "@/components/base/ProfileIcon";
import WriteIcon from "@/assets/images/WriteIcon";

function WriteDebateCard() {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  return (
    <div id="write-debate-card">
      <ProfileIcon profile={user.profile} size={45} />
      <div
        className="input-container"
        onClick={() => navigate("/debate/write")}
      >
        <div className="write-input">새로운 토론방을 생성해보세요!</div>
        <WriteIcon className="write-icon" width={20} fill={"#666565"} />
      </div>
    </div>
  );
}

export default WriteDebateCard;
