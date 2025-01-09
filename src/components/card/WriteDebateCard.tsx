import { useAppSelector } from "@/stores/hooks";
import { selectUser } from "@/stores/user";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "@/components/base/ProfileIcon";
import write from "@/assets/images/write.svg";

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
        <img src={write} alt="" className="write-icon" width={20} />
      </div>
    </div>
  );
}

export default WriteDebateCard;
