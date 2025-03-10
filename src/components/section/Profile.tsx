import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';

import FriendListModal from '@/components/modal/FriendListModal';
import EditProfileModal from '@/components/modal/EditProfileModal';

import { UserType } from '@/types/data';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { selectUser } from '@/stores/user';
import { useNavigate } from 'react-router-dom';
import ProfileIcon from '@/components/base/ProfileIcon';
import {
  MyTabs,
  MyTabsCandidate,
  UserTabs,
  UserTabsCandidate,
} from '@/types/initialValue';
import { useTranslation } from 'react-i18next';
import { updateGlobalState } from '@/stores/globalStates';

function Profile({
  userProfile,
  setUserProfile = undefined,
  currentTab = undefined,
  setCurrentTab = undefined,
}: {
  userProfile: UserType;
  setUserProfile?: Dispatch<SetStateAction<UserType>>;
  currentTab?: MyTabsCandidate | UserTabsCandidate;
  setCurrentTab?: Dispatch<SetStateAction<MyTabsCandidate | UserTabsCandidate>>;
}) {
  const [tabs, setTabs] =
    useState<{ text: string; url: MyTabsCandidate | UserTabsCandidate }[]>(
      UserTabs
    );
  const [inherentCurrentTab, setInherentCurrentTab] =
    useState<MyTabsCandidate>('/post');
  const [showFriendsModal, setShowFriendsModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [didEdit, setDidEdit] = useState(false);
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (userProfile.id != 0) {
      axios.get(`/api/user/is-following/${userProfile.id}`).then((res) => {
        setIsFollowing(res.data);
      });
    }
    if (user.id != 0 && userProfile.id == user.id) {
      setTabs(MyTabs);
      navigate('/mypage');
    } else {
      setTabs(UserTabs);
    }
    if (didEdit && user.id != 0 && userProfile.id == user.id) {
      axios.get(`/api/user/me`).then(
        (res) => {
          let { data } = res;
          setDidEdit(false);
          setUserProfile?.(data);
        },
        () => {
          setDidEdit(false);
        }
      );
    }
  }, [user.id, userProfile.id, didEdit]);

  const follow = () => {
    axios.post(`/api/user/follow/${userProfile.id}`).then(() => {
      setIsFollowing(true);
      userProfile.follower_num++;
      dispatch(updateGlobalState({ isFollowerUpdated: true }));
    });
  };

  const unfollow = () => {
    axios.delete(`/api/user/follow/${userProfile.id}`).then(() => {
      setIsFollowing(false);
      userProfile.follower_num--;
      dispatch(updateGlobalState({ isFollowerUpdated: true }));
    });
  };

  return (
    <div id='profile'>
      <FriendListModal
        showModal={showFriendsModal}
        setShowModal={setShowFriendsModal}
        userProfile={userProfile}
      />
      <EditProfileModal
        showModal={showEditProfileModal}
        setShowModal={setShowEditProfileModal}
        setDidEdit={setDidEdit}
      />
      <div className='profile-container w-full! mx-8! md:w-3/5! md:mx-auto!'>
        <div className='upper-container'>
          <div className='profile-image-container'>
            <ProfileIcon profile={userProfile.profile} size={100} />
            <div className='button-container'>
              {user.id != 0 && userProfile.id == user.id ? (
                <button
                  className='edit-profile'
                  onClick={() => {
                    setShowEditProfileModal(true);
                  }}
                >
                  {t('component.section.profile.button.edit-profile')}
                </button>
              ) : (
                <button
                  className='be-friend'
                  onClick={() => {
                    if (isFollowing) {
                      unfollow();
                    } else {
                      follow();
                    }
                  }}
                >
                  {isFollowing
                    ? t('component.section.profile.button.unfollow')
                    : t('component.section.profile.button.follow')}
                </button>
              )}
            </div>
          </div>
        </div>
        <div className='lower-container'>
          <div className='name-container'>{userProfile.name}</div>
          <div className='follow-container'>
            <div
              className='follower'
              onClick={() => {
                setShowFriendsModal(true);
              }}
            >
              {t('component.section.profile.text.follower-prefix')}
              {userProfile.follower_num}
              {t('component.section.profile.text.follower-postfix')}
            </div>
            <div
              className='following'
              onClick={() => {
                setShowFriendsModal(true);
              }}
            >
              {t('component.section.profile.text.following-prefix')}
              {userProfile.following_num}
              {t('component.section.profile.text.following-postfix')}
            </div>
          </div>
          <div className='introduction-container'>
            <pre className='introduction'>
              {userProfile.introduction ??
                t('component.section.profile.text.no-introduction')}
            </pre>
          </div>
        </div>
        <div className='tabs'>
          {tabs.map((tab, idx) => {
            return (
              <div
                key={'tab' + idx}
                className={[
                  'tab-item ml-1! mr-4! md:mx-6!',
                  (currentTab ?? inherentCurrentTab) == tab.url
                    ? 'current-tab'
                    : '',
                ].join(' ')}
                data-value={tab.url}
                onClick={(e) => {
                  (setCurrentTab ?? setInherentCurrentTab)(
                    e.currentTarget.dataset.value! as
                      | MyTabsCandidate
                      | UserTabsCandidate
                  );
                }}
              >
                <span className='text-base! md:text-xl!'>{t(tab.text)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Profile;
