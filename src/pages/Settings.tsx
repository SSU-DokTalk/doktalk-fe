import SettingsSidebar from '@/components/section/SettingsSidebar';
import { useState } from 'react';
import {
  faBell,
  faComment,
  faHeart,
} from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const items = [
  { name: '좋아요', icon: faHeart },
  { name: '댓글', icon: faComment },
  { name: '알림', icon: faBell },
];

function Settings() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div id='settings'>
      <SettingsSidebar tabIndex={tabIndex} setTabIndex={setTabIndex} />
      <div className='settings-content'>
        {tabIndex === 0 ? (
          <div>
            <div className='settings-content-header'>
              <FontAwesomeIcon className='icon' icon={faLock} />
              <h2>공개 범위 수정</h2>
            </div>
          </div>
        ) : (
          <div>
            <h1>{items[tabIndex - 1].name}</h1>
            <p>{items[tabIndex - 1].name} 페이지</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;
