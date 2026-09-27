import clsx from 'clsx';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logo from '@/assets/images/logo.svg';
import { iconButtonStyles, mq } from '@/design-system';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { LanguageMenu } from '@/shell/menus';
import { SITE_LINKS } from '@/shell/navigation';
import * as s from './AuthLayout.css';

type AuthLayoutProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  /** narrow: 로그인(440px), wide: 회원가입(560px) */
  width?: 'narrow' | 'wide';
  children: ReactNode;
};

/**
 * 로그인·회원가입 화면의 틀. 앱 내비 없이 가운데 카드 하나예요.
 * 로그아웃 상태에서도 언어를 바꿀 수 있게 오른쪽 위에 언어 선택을 둬요 (기본 언어가 몽골어라서).
 */
export function AuthLayout({
  title,
  subtitle,
  width = 'narrow',
  children,
}: AuthLayoutProps) {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery(mq.md);

  return (
    <div className={s.page}>
      <header className={s.header}>
        {isDesktop ? (
          <Link
            to='/'
            aria-label={t('component.shell.home')}
            className={s.logoLink}
          >
            <img src={logo} alt='' className={s.logo} />
          </Link>
        ) : (
          <Link
            to='/'
            aria-label={t('component.dialog.close')}
            className={iconButtonStyles({ variant: 'ghost', size: 'md' })}
          >
            <X aria-hidden='true' />
          </Link>
        )}
        <LanguageMenu showLabel />
      </header>

      <main className={clsx(s.card, width === 'wide' ? s.wide : s.narrow)}>
        <div className={s.titles}>
          {!isDesktop && (
            <img
              src={logo}
              alt='讀:TALK'
              className={clsx(s.logo, s.cardLogo)}
            />
          )}
          <h1 className={s.title}>{title}</h1>
          {subtitle && <p className={s.subtitle}>{subtitle}</p>}
        </div>
        {children}
      </main>

      <div className={s.spacer} />
      <footer className={s.footer}>
        {SITE_LINKS.filter((link) =>
          ['terms', 'privacy', 'contact'].includes(link.key)
        ).map((link) => (
          <Link
            key={link.key}
            to={link.to}
            className={clsx(
              s.footerLink,
              'emphasis' in link && link.emphasis && s.footerEmphasis
            )}
          >
            {t(link.labelKey)}
          </Link>
        ))}
        <span>© DokTalk</span>
      </footer>
    </div>
  );
}
