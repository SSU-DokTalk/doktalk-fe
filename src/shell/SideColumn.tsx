import clsx from 'clsx';
import { BookOpen } from 'lucide-react';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Avatar, buttonStyles, Card } from '@/design-system';
import { useAuth, useMyProfileCounts } from './hooks';
import { ACTIVITY_LINKS } from './navigation';
import SiteLinks from './SiteLinks';
import * as s from './side.css';

function ProfileSummary() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const counts = useMyProfileCounts(true);
  const activityTitleId = useId();
  const name = user.name ?? t('component.navigation.topnav.nickname-fallback');

  return (
    <>
      <Card className={s.profileCard}>
        <Avatar
          name={name}
          src={user.profile}
          size={56}
          className={s.profileAvatar}
        />
        <p className={s.profileName}>{name}</p>
        <p className={s.profileMeta}>
          {t('component.floating.text.follower')} {counts?.follower ?? '–'} ·{' '}
          {t('component.floating.text.following')} {counts?.following ?? '–'}
        </p>
        <div className={s.profileActions}>
          <Link
            to='/mypage'
            className={buttonStyles({ variant: 'secondary', size: 'sm' })}
          >
            {t('component.topnav.dropdown.mypage')}
          </Link>
          <Link
            to='/mypage/library'
            className={buttonStyles({ variant: 'secondary', size: 'sm' })}
          >
            {t('component.floating.text.library')}
          </Link>
        </div>
      </Card>

      <Card
        as='section'
        padding='none'
        aria-labelledby={activityTitleId}
        className={s.activityCard}
      >
        <p id={activityTitleId} className={s.activityTitle}>
          {t('component.floating.text.my-activity')}
        </p>
        {ACTIVITY_LINKS.map((link) => (
          <Link key={link.key} to={link.to} className={s.activityLink}>
            {t(link.labelKey)}
          </Link>
        ))}
      </Card>
    </>
  );
}

function LoginPrompt() {
  const { t } = useTranslation();

  return (
    <Card className={s.loginCard}>
      <span aria-hidden='true' className={s.loginIcon}>
        <BookOpen />
      </span>
      <p className={s.loginTitle}>{t('component.shell.login-card.title')}</p>
      <p className={s.loginDescription}>
        {t('component.shell.login-card.description')}
      </p>
      <Link
        to='/login'
        className={buttonStyles({ variant: 'primary', fullWidth: true })}
      >
        {t('component.topnav.login')}
      </Link>
      <Link
        to='/register'
        className={buttonStyles({ variant: 'secondary', fullWidth: true })}
      >
        {t('component.topnav.register')}
      </Link>
    </Card>
  );
}

/**
 * 앱 셸 왼쪽 칼럼 (lg 이상). 내 프로필·내 활동, 로그아웃 상태면 로그인 안내를 보여줘요.
 * 약관·고객지원 링크도 여기 두어서 무한 스크롤 화면에서도 찾을 수 있어요.
 */
function SideColumn({ className }: { className?: string }) {
  const { t } = useTranslation();
  const { isLoggedIn } = useAuth();

  return (
    <aside
      aria-label={t('component.shell.my-menu')}
      className={clsx(s.sideColumn, className)}
    >
      {isLoggedIn ? <ProfileSummary /> : <LoginPrompt />}
      <SiteLinks variant='column' />
    </aside>
  );
}

export default SideColumn;
