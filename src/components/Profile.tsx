import userIcon from "@/assets/images/profile.svg";
import { useEffect, useState } from "react";
import FriendListModal from "./modal/FriendListModal";
import { User } from "@/types/data";
import EditProfileModal from "./modal/EditProfileModal";

const MyTabs = [
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
const UserTabs = [
  {
    text: "게시글",
    url: "/post",
  },
  {
    text: "내 서재",
    url: "/library",
  },
];
function Profile({
  userProfile,
  is_me = false,
}: {
  userProfile: User;
  is_me?: boolean;
}) {
  const [tabs, setTabs] = useState<{ text: string; url: string }[]>(UserTabs);
  const [currentTab, setCurrentTab] = useState("/post");
  const [showFriendsModal, setShowFriendsModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  useEffect(() => {
    if (is_me) {
      setTabs(MyTabs);
    } else {
      setTabs(UserTabs);
    }
  }, [userProfile]);

  return (
    <div id="profile">
      <FriendListModal
        showModal={showFriendsModal}
        setShowModal={setShowFriendsModal}
      />
      <EditProfileModal
        showModal={showEditProfileModal}
        setShowModal={setShowEditProfileModal}
      />
      <div className="pre-offset" />
      <div className="profile-container">
        <div className="upper-container">
          <div className="profile-image-container">
            <img
              src={userProfile.profile ?? userIcon}
              alt="profile image"
              className="profile-image"
            />
            <div className="button-container">
              {is_me ? (
                <button
                  className="edit-profile"
                  onClick={() => {
                    setShowEditProfileModal(true);
                  }}
                >
                  프로필 편집
                </button>
              ) : (
                <button className="be-friend">친구 맺기</button>
              )}
            </div>
          </div>
        </div>
        <div className="lower-container">
          <div className="name-container">{userProfile.name}</div>
          <div className="follow-container">
            <div
              className="follower"
              onClick={() => {
                setShowFriendsModal(true);
              }}
            >
              팔로워 {userProfile.follower_num}명
            </div>
            <div
              className="following"
              onClick={() => {
                setShowFriendsModal(true);
              }}
            >
              팔로잉 {userProfile.following_num}명
            </div>
          </div>
          <div className="introduction-container">
            <pre className="introduction">
              {userProfile.introduction ?? "자기소개가 없습니다."}
            </pre>
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
