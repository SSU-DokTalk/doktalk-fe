import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLanguage } from './hooks';
import { APP_VERSION, SUPPORT_LINKS } from './navigation';
import * as shell from './shell.css';
import * as s from './LandingFooter.css';

const SERVICES = [
  { to: '/debate', labelKey: 'footer.services.debate' },
  { to: '/summary', labelKey: 'footer.services.summary' },
  { to: '/post', labelKey: 'footer.services.post' },
  { to: '/search', labelKey: 'footer.services.search' },
];

/** 로그아웃 랜딩의 어두운 푸터 (회사 소개, 서비스, 고객지원, 언어) */
function LandingFooter() {
  const { t } = useTranslation();
  const { languages, current, change } = useLanguage();

  return (
    <footer className={s.footer}>
      <div className={clsx(shell.container, s.inner)}>
        <div className={s.columns}>
          <div className={s.brand}>
            <p className={s.brandName}>DokTalk</p>
            <p className={s.description}>
              {t('footer.company.description')}
              <br />
              {t('footer.company.motto')}
            </p>
            <p className={s.contact}>
              {t('footer.company.address')}: {t('footer.company.address_value')}
              <br />
              {t('footer.company.email')}: doktalk.official@gmail.com
            </p>
          </div>

          <nav aria-labelledby='landing-footer-services' className={s.group}>
            <h2 id='landing-footer-services' className={s.groupTitle}>
              {t('footer.services.title')}
            </h2>
            {SERVICES.map((item) => (
              <Link key={item.to} to={item.to} className={s.link}>
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>

          <nav aria-labelledby='landing-footer-support' className={s.group}>
            <h2 id='landing-footer-support' className={s.groupTitle}>
              {t('footer.support.title')}
            </h2>
            {SUPPORT_LINKS.map((link) => (
              <Link key={link.key} to={link.to} className={s.link}>
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>

          <div
            role='group'
            aria-labelledby='landing-footer-language'
            className={s.group}
          >
            <h2 id='landing-footer-language' className={s.groupTitle}>
              {t('page.home.footer.language')}
            </h2>
            {languages.map((language) => (
              <button
                key={language.value}
                type='button'
                lang={language.htmlLang}
                aria-pressed={current.value === language.value}
                className={s.languageButton}
                onClick={() => change(language.value)}
              >
                {language.nativeName}
              </button>
            ))}
          </div>
        </div>

        <div className={s.bottom}>
          <span>{t('page.home.footer.rights')}</span>
          <span>{t('page.settings.version', { version: APP_VERSION })}</span>
        </div>
      </div>
    </footer>
  );
}

export default LandingFooter;
