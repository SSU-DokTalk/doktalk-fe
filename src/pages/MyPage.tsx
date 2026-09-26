import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Profile from '@/components/section/Profile';
import { selectUser } from '@/stores/user';
import { useAppSelector } from '@/stores/hooks';

import { UserType } from '@/types/data';
import { InitialUser, MyTabs, MyTabsCandidate } from '@/types/initialValue';
import ProfileTabDetails from '@/components/section/ProfileTabDetails';

/** ?tab=debate 처럼 들어오면 그 탭을 열어요 (왼쪽 칼럼 '내 활동' 링크). */
function tabFromQuery(tab: string | null): MyTabsCandidate {
  const match = MyTabs.find((item) => item.url === `/${tab}`);
  return match ? match.url : '/post';
}

function MyPage() {
  const user = useAppSelector(selectUser);
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [userProfile, setUserProfile] = useState<UserType>(InitialUser);
  const [currentTab, setCurrentTab] = useState<MyTabsCandidate>(() =>
    tabFromQuery(tabParam)
  );

  useEffect(() => {
    setCurrentTab(tabFromQuery(tabParam));
  }, [tabParam]);

  useEffect(() => {
    if (user.id != 0) {
      axios.get('/api/user/me').then((res) => {
        setUserProfile(res.data);
      });
    }
  }, [user.id]);

  return (
    <div id='mypage'>
      <Profile
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <div className='content-container'>
        <div className='content w-full mx-4! md:w-1/2 md:mx-auto!'>
          <ProfileTabDetails
            currentTab={currentTab}
            userProfile={userProfile}
          />
        </div>
      </div>
    </div>
  );
}

export default MyPage;
