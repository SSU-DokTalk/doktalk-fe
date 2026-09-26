import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLanguage, type LanguageValue } from './hooks';
import { APP_VERSION, SITE_LINKS } from './navigation';
import * as shell from './shell.css';
import * as s from './LandingFooter.css';

const SERVICES = [
  { to: '/debate', labelKey: 'footer.services.debate' },
  { to: '/summary', labelKey: 'footer.services.summary' },
  { to: '/post', labelKey: 'footer.services.post' },
  { to: '/search', labelKey: 'footer.services.search' },
];

const SUPPORT_ORDER = ['faq', 'notice', 'contact', 'terms', 'privacy'];

/** 언어 이름은 그 언어로 적어요. */
const NATIVE_NAMES: Record<LanguageValue, { name: string; lang: string }> = {
  kr: { name: '한국어', lang: 'ko' },
  us: { name: 'English', lang: 'en' },
  mn: { name: 'Монгол хэл', lang: 'mn' },
};

/** 로그아웃 랜딩의 어두운 푸터 (회사 소개, 서비스, 고객지원, 언어) */
function LandingFooter() {
  const { t } = useTranslation();
  const { current, change } = useLanguage();
  const support = SUPPORT_ORDER.flatMap((key) =>
    SITE_LINKS.filter((link) => link.key === key)
  );

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
            {support.map((link) => (
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
            {(Object.keys(NATIVE_NAMES) as LanguageValue[]).map((value) => (
              <button
                key={value}
                type='button'
                lang={NATIVE_NAMES[value].lang}
                aria-pressed={current.value === value}
                className={s.languageButton}
                onClick={() => change(value)}
              >
                {NATIVE_NAMES[value].name}
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
