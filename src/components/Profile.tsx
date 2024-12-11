// import userIcon from "@/assets/images/profile.png";
import userIcon from "@/assets/images/sample200kb.png";
import { useState } from "react";
import FriendListModal from "./modal/FriendListModal";

const tabs = [
  {
    text: "게시글",
    url: "/post",
  },
  {
    text: "내 요약",
    url: "/summary",
  },
  {
    text: "내 서재",
    url: "/library",
  },
  {
    text: "토론방",
    url: "/debate",
  },
  {
    text: "결제내역",
    url: "/payment",
  },
];
// const tabs = [
//   {
//     text: "게시글",
//     url: "/post",
//   },
//   {
//     text: "내 서재",
//     url: "/library",
//   },
// ];
function Profile() {
  const [currentTab, setCurrentTab] = useState("/post");
  const [showFriendsModal, setShowFriendsModal] = useState(false);

  let friend = 200;
  let introduction =
    "안녕하세요 👋 자기소개 문구입니다. \n자기소개 문구입니다. 자기소개 문구입니다.자기소개 문구입니다.자기소개 문구입니다.";
  return (
    <div id="profile">
      <FriendListModal
        showFriendsModal={showFriendsModal}
        setShowFriendsModal={setShowFriendsModal}
      ></FriendListModal>
      <div className="pre-offset" />
      <div className="profile-container">
        <div className="upper-container">
          <div className="profile-image-container">
            <img src={userIcon} alt="profile image" className="profile-image" />
            <div className="button-container">
              <button className="edit-profile">프로필 편집</button>
              <button className="be-friend">친구 맺기</button>
            </div>
          </div>
        </div>
        <div className="lower-container">
          <div className="name-container">닉네임</div>
          <div className="follow-container">
            <div
              className="follower"
              onClick={() => {
                setShowFriendsModal(true);
              }}
            >
              팔로워 {friend}명
            </div>
            <div
              className="following"
              onClick={() => {
                setShowFriendsModal(true);
              }}
            >
              팔로잉 {friend}명
            </div>
          </div>
          <div className="introduction-container">
            <pre className="introduction">{introduction}</pre>
          </div>
        </div>
        <div className="tabs">
          {tabs.map((tab, idx) => {
            return (
              <div
                key={"tab" + idx}
                className={[
                  "tab-item",
                  currentTab == tab.url ? "current-tab" : "",
                ].join(" ")}
                data-value={tab.url}
                onClick={(e) => {
                  setCurrentTab(e.currentTarget.dataset.value!);
                  console.log(e.currentTarget.dataset.value);
                }}
              >
                {tab.text}
              </div>
            );
          })}
        </div>
      </div>
      <div className="post-offset" />
    </div>
  );
}

export default Profile;
