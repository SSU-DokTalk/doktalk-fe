import { Dispatch, SetStateAction, useState } from "react";
import { Modal } from "react-bootstrap";

import userIcon from "@/assets/images/profile.svg";

const friends = [
  {
    profile: null,
    name: "닉네임11",
    id: 1,
  },
  {
    profile: null,
    name: "닉네임22",
    id: 2,
  },
  {
    profile: null,
    name: "닉네임33",
    id: 3,
  },
  {
    profile: null,
    name: "닉네임44",
    id: 4,
  },
  {
    profile: null,
    name: "닉네임55",
    id: 5,
  },
];
const tabs = [
  {
    name: "팔로워",
    key: "follower",
  },
  {
    name: "팔로잉",
    key: "following",
  },
];

function FriendListModal({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [currentInfo, setCurrentInfo] = useState("follower");
  return (
    <Modal
      id="friend-list-modal"
      show={showModal}
      onHide={() => {
        setShowModal(false);
      }}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <strong>{"닉네임"}</strong>님의 친구
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="friend-info">
          {tabs.map((tab, idx) => {
            return (
              <pre
                key={"tab" + idx}
                className={[
                  "info",
                  tab.key == currentInfo ? "current" : "",
                ].join(" ")}
                data-value={tab.key}
                onClick={(e) => {
                  setCurrentInfo(e.currentTarget.dataset.value!);
                }}
              >
                {tab.name + "\n"}
                <span className="number">{999}</span>
              </pre>
            );
          })}
        </div>
        <div className="friend-list">
          {friends.map((friend, idx) => {
            return (
              <div key={"friend" + idx} className="friend-container">
                <div className="left-container">
                  <img
                    src={friend.profile ?? userIcon}
                    alt="user icon"
                    className="friend-profile-icon"
                  />
                  <div className="friend-name">{friend.name}</div>
                </div>
                <div className="right-container">
                  <div className="delete-friend-button-container">
                    <button className="delete-friend-button">삭제</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default FriendListModal;
