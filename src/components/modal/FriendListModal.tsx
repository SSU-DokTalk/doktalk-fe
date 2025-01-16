import { Dispatch, SetStateAction, useState } from "react";
import { Modal } from "react-bootstrap";
import { FollowType, UserType } from "@/types/data";

import userIcon from "@/assets/images/profile.svg";
import InfiniteScroll from "../base/InfiniteScroll";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { selectGlobalState, updateGlobalState } from "@/stores/globalStates";

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
  userProfile,
  showModal,
  setShowModal,
}: {
  userProfile: UserType;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [followers, setFollowers] = useState<FollowType[]>([]);
  const [followings, setFollowings] = useState<FollowType[]>([]);
  const [followerPage, setFollowerPage] = useState(1);
  const [followingPage, setFollowingPage] = useState(1);
  const [hasMoreFollower, setHasMoreFollower] = useState(true);
  const [hasMoreFollowing, setHasMoreFollowing] = useState(true);
  const [currentInfo, setCurrentInfo] = useState<"follower" | "following">(
    "follower"
  );

  const globalState = useAppSelector(selectGlobalState);
  const dispatch = useAppDispatch();

  return (
    <Modal
      id="friend-list-modal"
      show={showModal}
      onHide={() => {
        setShowModal(false);
        setCurrentInfo("follower");
      }}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <strong>{userProfile.name}</strong>님의 친구
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
                  setCurrentInfo(
                    e.currentTarget.dataset.value as "follower" | "following"
                  );
                }}
              >
                {tab.name + "\n"}
                <span className="number">
                  {tab.key == "follower"
                    ? userProfile.follower_num
                    : userProfile.following_num}
                </span>
              </pre>
            );
          })}
        </div>
        <div className="friend-list">
          <InfiniteScroll
            api={`user/${userProfile.id}/${currentInfo}s`}
            setItems={currentInfo == "follower" ? setFollowers : setFollowings}
            page={currentInfo == "follower" ? followerPage : followingPage}
            setPage={
              currentInfo == "follower" ? setFollowerPage : setFollowingPage
            }
            hasMore={
              currentInfo == "follower" ? hasMoreFollower : hasMoreFollowing
            }
            setHasMore={
              currentInfo == "follower"
                ? setHasMoreFollower
                : setHasMoreFollowing
            }
            condition={userProfile && userProfile.id != 0 && showModal}
            refreshCondition={globalState.isFollowerUpdated}
            afterFetchSuccess={async () => {
              dispatch(updateGlobalState({ isFollowerUpdated: false }));
            }}
            afterFetchFail={() => {
              dispatch(updateGlobalState({ isFollowerUpdated: false }));
            }}
            size={50}
            dependency={[globalState.isFollowerUpdated]}
          >
            {(currentInfo == "follower" ? followers : followings).map(
              (friend, idx) => {
                return (
                  <div key={"friend" + idx} className="friend-container">
                    <div className="left-container">
                      <img
                        src={friend[currentInfo]?.profile ?? userIcon}
                        alt="user icon"
                        className="friend-profile-icon"
                      />
                      <div className="friend-name">
                        {friend[currentInfo]?.name}
                      </div>
                    </div>
                    <div className="right-container">
                      <div className="delete-friend-button-container">
                        <button className="delete-friend-button">삭제</button>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </InfiniteScroll>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default FriendListModal;
