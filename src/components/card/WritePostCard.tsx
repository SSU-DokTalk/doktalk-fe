import { useAppSelector } from "@/stores/hooks";
import { selectUser } from "@/stores/user";

import ProfileIcon from "@/components/base/ProfileIcon";
import { Dispatch, SetStateAction, useState } from "react";
import WritePostModal from "../modal/WritePostModal";
import WriteIcon from "@/assets/images/WriteIcon";

function WritePostCard({
  setDidPost = undefined,
}: {
  setDidPost?: Dispatch<SetStateAction<boolean>>;
}) {
  const user = useAppSelector(selectUser);
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div id="write-post-card">
      <WritePostModal
        showModal={showModal}
        setShowModal={setShowModal}
        setDidPost={setDidPost}
      />
      <ProfileIcon profile={user.profile} size={45} />
      <div
        className="input-container"
        onClick={() => {
          setShowModal(true);
        }}
      >
        <div className="write-input">게시글을 작성해보세요!</div>
        <WriteIcon className="write-icon" width={20} fill={"#666565"} />
      </div>
    </div>
  );
}

export default WritePostCard;
