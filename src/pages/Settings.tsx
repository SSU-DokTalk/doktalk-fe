import SettingsSidebar from '@/components/section/SettingsSidebar';
import { useState } from 'react';
import {
  faBell,
  faComment,
  faHeart,
} from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

const items = [
  { name: 'page.settings.notifications.likes', icon: faHeart },
  { name: 'page.settings.notifications.comments', icon: faComment },
  { name: 'page.settings.notifications.notifications', icon: faBell },
];

function Settings() {
  const [tabIndex, setTabIndex] = useState(0);
  const { t } = useTranslation();

  return (
    <div id='settings'>
      <SettingsSidebar tabIndex={tabIndex} setTabIndex={setTabIndex} />
      <div className='settings-content'>
        {tabIndex === 0 ? (
          <div>
            <div className='settings-content-header'>
              <FontAwesomeIcon className='icon' icon={faLock} />
              <h2>{t('page.settings.privacy.title')}</h2>
            </div>
          </div>
        ) : (
          <div>
            <h1>{t(items[tabIndex - 1].name)}</h1>
            <p>
              {t(items[tabIndex - 1].name)}
              {t('page.settings.notifications.page')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;
