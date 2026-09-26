import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { buttonStyles } from '@/design-system';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import * as s from './NotFoundPage.css';

/** 없는 주소 (404). 앱 틀 안에 보여줘서 메뉴로 바로 옮겨 갈 수 있어요. */
function NotFoundPage() {
  const { t } = useTranslation();
  useDocumentTitle(t('page.not-found.title'));

  return (
    <div className={s.page}>
      <div aria-hidden='true' className={s.art}>
        <span className={s.backBook} />
        <span className={s.frontBook}>
          <span className={s.code}>404</span>
          <span className={s.brand}>讀:TALK</span>
        </span>
      </div>
      <div className={s.text}>
        <h1 className={s.title}>{t('page.not-found.title')}</h1>
        <p className={s.description}>{t('page.not-found.description')}</p>
      </div>
      <div className={s.actions}>
        <Link
          to='/'
          className={buttonStyles({ variant: 'primary', size: 'lg' })}
        >
          {t('page.not-found.home')}
        </Link>
        <Link
          to='/integrated-search'
          className={buttonStyles({ variant: 'neutral', size: 'lg' })}
        >
          <Search aria-hidden='true' />
          {t('page.not-found.search')}
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
