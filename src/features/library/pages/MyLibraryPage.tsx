import { LogIn, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { buttonStyles } from '@/design-system';
import { PageState } from '@/shared/components/PageState';
import * as list from '@/shared/components/ListPage.css';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import { useAuth } from '@/shell/hooks';
import { MyLibrary } from '../components/MyLibrary';
import * as s from './MyLibraryPage.css';

/** 내 서재 (/mypage/library) */
function MyLibraryPage() {
  const { t } = useTranslation();
  const { user, isLoggedIn } = useAuth();

  useDocumentTitle(t('page.mypage.library.title'));

  if (!isLoggedIn) {
    return (
      <PageState
        icon={<LogIn />}
        title={t('page.profile.state.login-title')}
        description={t('page.profile.state.login-description')}
        actions={
          <Link to='/login' className={buttonStyles({ variant: 'primary' })}>
            {t('component.topnav.login')}
          </Link>
        }
      />
    );
  }

  return (
    <div className={s.page}>
      <div className={list.header}>
        <div className={list.titles}>
          <h1 className={list.title}>{t('page.mypage.library.title')}</h1>
          <p className={s.subtitle}>{t('page.mypage.library.description')}</p>
        </div>
        <Link
          to='/search'
          className={`${buttonStyles({ variant: 'secondary' })} ${s.searchLink}`}
        >
          <Search aria-hidden='true' />
          {t('page.mypage.library.go-to-search')}
        </Link>
      </div>
      <MyLibrary viewerId={user.id ?? 0} />
    </div>
  );
}

export default MyLibraryPage;
