import clsx from 'clsx';
import { Search } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '@/assets/images/logo.svg';
import { buttonStyles, iconButtonStyles, TextField } from '@/design-system';
import { useAuth } from './hooks';
import { CreateMenu, LanguageMenu, ProfileMenu } from './menus';
import { MAIN_NAV } from './navigation';
import * as shell from './shell.css';
import * as s from './nav.css';
import { useAuthHref } from '@/features/auth/redirect';

/** 통합 검색 입력칸. 결과 화면에서는 지금 검색어를 채워 둬요. */
function NavSearch() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const currentQuery =
    location.pathname === '/integrated-search'
      ? (new URLSearchParams(location.search).get('search') ?? '')
      : '';
  const [query, setQuery] = useState(currentQuery);

  useEffect(() => {
    setQuery(currentQuery);
  }, [currentQuery]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/integrated-search?search=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form
      role='search'
      aria-label={t('component.shell.search')}
      className={s.search}
      onSubmit={handleSubmit}
    >
      <TextField
        label={t('component.shell.search')}
        hideLabel
        type='search'
        variant='filled'
        size='sm'
        placeholder={t('component.topnav.search-bar.placeholder')}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        startIcon={<Search aria-hidden='true' />}
      />
    </form>
  );
}

/** 데스크톱 상단 내비 (md 이상). 로그인 여부에 따라 오른쪽이 바뀌어요. */
function TopNav() {
  const { t } = useTranslation();
  const loginHref = useAuthHref();
  const registerHref = useAuthHref('register');
  const { isLoggedIn } = useAuth();

  return (
    <header className={clsx(s.topNav, shell.desktopOnly)}>
      <div className={clsx(shell.container, s.topNavInner)}>
        <Link
          to='/'
          className={s.logoLink}
          aria-label={t('component.shell.home')}
        >
          <img src={logo} alt='' className={s.logo} />
        </Link>

        <nav aria-label={t('component.shell.main-nav')} className={s.navList}>
          {MAIN_NAV.map((item) => (
            <NavLink key={item.key} to={item.to} className={s.navLink}>
              {t(item.labelKey)}
            </NavLink>
          ))}
        </nav>

        <div className={s.spacer} />
        <NavSearch />
        <Link
          to='/integrated-search'
          aria-label={t('component.shell.search')}
          className={clsx(iconButtonStyles({ variant: 'ghost' }), s.searchIcon)}
        >
          <Search aria-hidden='true' />
        </Link>

        <div className={s.actions}>
          <LanguageMenu />
          {isLoggedIn ? (
            <>
              <CreateMenu />
              <ProfileMenu />
            </>
          ) : (
            <>
              <Link
                to={loginHref}
                className={buttonStyles({ variant: 'ghost', size: 'md' })}
              >
                {t('component.topnav.login')}
              </Link>
              <Link
                to={registerHref}
                className={buttonStyles({ variant: 'primary', size: 'md' })}
              >
                {t('component.topnav.register')}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default TopNav;
