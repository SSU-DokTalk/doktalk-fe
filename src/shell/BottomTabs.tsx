import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { BOTTOM_TABS } from './navigation';
import * as s from './nav.css';

/**
 * 모바일 하단 탭 (로그인했을 때만). 화면 아래에 고정돼서 무한 스크롤 중에도 보여요.
 */
function BottomTabs() {
  const { t } = useTranslation();

  return (
    <nav aria-label={t('component.shell.bottom-nav')} className={s.bottomTabs}>
      {BOTTOM_TABS.map((tab) => (
        <NavLink
          key={tab.key}
          to={tab.to}
          end={tab.end}
          className={s.bottomTab}
        >
          <tab.icon aria-hidden='true' />
          {t(tab.labelKey)}
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomTabs;
