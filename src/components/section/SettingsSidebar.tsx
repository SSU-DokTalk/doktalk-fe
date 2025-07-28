/* eslint-disable @typescript-eslint/no-explicit-any */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faComment,
  faHeart,
} from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

interface MenuItem {
  name: string;
  icon: any;
}

interface SettingsSidebarProps {
  tabIndex: number;
  setTabIndex: (index: number) => void;
}

function SettingsSidebar({ tabIndex, setTabIndex }: SettingsSidebarProps) {
  const { t } = useTranslation();

  const menuItems: MenuItem[] = [
    { name: t('page.settings.notifications.likes'), icon: faHeart },
    { name: t('page.settings.notifications.comments'), icon: faComment },
    { name: t('page.settings.notifications.notifications'), icon: faBell },
  ];

  const getButtonClassName = (isActive: boolean) =>
    `tab-button${isActive ? ' activated' : ''}`;

  return (
    <div id='settings-sidebar'>
      <h1>{t('page.settings.privacy.title').replace(' 수정', '')}</h1>

      <h4 className='subtitle'>
        {t('component.section.settings.privacy-scope')}
      </h4>
      <button
        className={getButtonClassName(tabIndex === 0)}
        onClick={() => setTabIndex(0)}
      >
        <FontAwesomeIcon className='icon' icon={faLock} fill='white' />
        {t('page.settings.privacy.title')}
      </button>

      <h4 className='subtitle'>
        {t('component.section.settings.my-activity')}
      </h4>
      {menuItems.map((item, index) => {
        const isActive = tabIndex === index + 1;
        return (
          <button
            key={item.name}
            className={getButtonClassName(isActive)}
            onClick={() => setTabIndex(index + 1)}
          >
            <FontAwesomeIcon className='icon' icon={item.icon} />
            {item.name}
          </button>
        );
      })}
    </div>
  );
}

export default SettingsSidebar;
