import { useAppSelector } from "@/stores/hooks";
import { selectUser } from "@/stores/user";

import write from "@/assets/images/write.svg";
import ProfileIcon from "@/components/base/ProfileIcon";
import { useNavigate } from "react-router-dom";

function WriteSummaryCard() {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  return (
    <div id="write-summary-card">
      <ProfileIcon profile={user.profile} size={45} />
      <div
        className="input-container"
        onClick={() => navigate("/summary/write")}
      >
        <div className="write-input">요약을 작성해보세요!</div>
        <img src={write} alt="" className="write-icon" width={20} />
      </div>
    </div>
  );
}

export default WriteSummaryCard;
