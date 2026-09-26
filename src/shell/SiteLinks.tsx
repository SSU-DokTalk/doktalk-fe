import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { APP_VERSION, SITE_LINKS } from './navigation';
import * as s from './side.css';

/**
 * 약관·고객지원 링크와 버전.
 * 무한 스크롤 화면에서는 페이지 맨 아래 푸터가 보이지 않아서 왼쪽 칼럼에 둬요.
 */
function SiteLinks({ variant }: { variant: 'column' | 'bar' }) {
  const { t } = useTranslation();

  return (
    <footer
      className={clsx(
        s.siteLinks,
        variant === 'column' ? s.siteLinksColumn : s.siteLinksBar
      )}
    >
      <nav aria-label={t('component.shell.footer-nav')}>
        <ul className={s.siteLinkList}>
          {SITE_LINKS.map((link) => (
            <li key={link.key}>
              <Link
                to={link.to}
                className={clsx(
                  s.siteLink,
                  'emphasis' in link && link.emphasis && s.siteLinkStrong
                )}
              >
                {t(link.labelKey)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <p className={s.siteMeta}>
        © DokTalk · {t('footer.version.label')} {APP_VERSION}
      </p>
    </footer>
  );
}

export default SiteLinks;
