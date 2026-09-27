import { LogOut, Menu as MenuIcon, Search } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';
import logo from '@/assets/images/logo.svg';
import {
  Avatar,
  Button,
  buttonStyles,
  Dialog,
  IconButton,
  iconButtonStyles,
  Radio,
} from '@/design-system';
import { useAuth, useLanguage } from './hooks';
import { MAIN_NAV } from './navigation';
import SiteLinks from './SiteLinks';
import * as s from './nav.css';
import * as side from './side.css';
import { useAuthHref } from '@/features/auth/redirect';

/** 모바일 전체 메뉴 내용. 링크를 누르면 서랍을 닫아요. */
function DrawerContent({ onNavigate }: { onNavigate: () => void }) {
  const { t } = useTranslation();
  const loginHref = useAuthHref();
  const registerHref = useAuthHref('register');
  const { user, isLoggedIn, logout } = useAuth();
  const { languages, current, change } = useLanguage();
  const name = user.name ?? t('component.navigation.topnav.nickname-fallback');

  return (
    <div className={side.drawerBody}>
      {isLoggedIn ? (
        <Link to='/mypage' className={side.drawerProfile} onClick={onNavigate}>
          <Avatar name={name} src={user.profile} size={44} />
          {name}
        </Link>
      ) : (
        <div className={side.drawerCta}>
          <p className={side.loginTitle}>
            {t('component.shell.login-card.title')}
          </p>
          <div className={side.drawerCtaActions}>
            <Link
              to={loginHref}
              onClick={onNavigate}
              className={buttonStyles({ variant: 'primary', size: 'md' })}
            >
              {t('component.topnav.login')}
            </Link>
            <Link
              to={registerHref}
              onClick={onNavigate}
              className={buttonStyles({ variant: 'secondary', size: 'md' })}
            >
              {t('component.topnav.register')}
            </Link>
          </div>
        </div>
      )}

      <nav aria-label={t('component.shell.main-nav')}>
        <ul className={side.drawerList}>
          {MAIN_NAV.map((item) => (
            <li key={item.key}>
              <NavLink
                to={item.to}
                className={side.drawerLink}
                onClick={onNavigate}
              >
                <span aria-hidden='true' className={side.drawerLinkIcon}>
                  <item.icon />
                </span>
                {t(item.labelKey)}
              </NavLink>
            </li>
          ))}
          {isLoggedIn && (
            <>
              <li>
                <NavLink
                  to='/mypage/library'
                  className={side.drawerLink}
                  onClick={onNavigate}
                >
                  {t('component.floating.text.library')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/settings'
                  className={side.drawerLink}
                  onClick={onNavigate}
                >
                  {t('component.topnav.dropdown.settings')}
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>

      <fieldset className={side.drawerSection}>
        <legend className={side.drawerSectionTitle}>
          {t('component.shell.language')}
        </legend>
        {languages.map((language) => (
          <label
            key={language.value}
            className={side.drawerRadio}
            lang={language.htmlLang}
          >
            {language.nativeName}
            <Radio
              name='drawer-language'
              value={language.value}
              checked={current.value === language.value}
              onChange={() => change(language.value)}
            />
          </label>
        ))}
      </fieldset>

      {isLoggedIn && (
        <Button
          variant='neutral'
          startIcon={<LogOut />}
          className={side.drawerLogout}
          onClick={() => {
            onNavigate();
            logout();
          }}
        >
          {t('component.topnav.dropdown.logout')}
        </Button>
      )}

      <SiteLinks variant='column' />
    </div>
  );
}

/** 모바일 상단 바 (md 미만). 검색과 전체 메뉴를 열어요. */
function MobileTopBar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <header className={s.mobileBar}>
      <Link to='/' aria-label={t('component.shell.home')}>
        <img src={logo} alt='' className={s.mobileLogo} />
      </Link>
      <div className={s.spacer} />
      <Link
        to='/integrated-search'
        aria-label={t('component.shell.search')}
        className={iconButtonStyles({ variant: 'ghost' })}
      >
        <Search aria-hidden='true' />
      </Link>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger
          render={
            <IconButton aria-label={t('component.shell.open-menu')}>
              <MenuIcon />
            </IconButton>
          }
        />
        <Dialog.Content placement='right'>
          <Dialog.Header
            title={t('component.navigation.topnav.explore')}
            closeLabel={t('component.shell.close-menu')}
          />
          <DrawerContent onNavigate={() => setOpen(false)} />
        </Dialog.Content>
      </Dialog.Root>
    </header>
  );
}

export default MobileTopBar;
