import clsx from 'clsx';
import { Settings } from 'lucide-react';
import type { ReactNode } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Button,
  iconButtonStyles,
  mq,
  Skeleton,
} from '@/design-system';
import type { FollowListKind } from '@/features/user/api';
import { FollowButton } from '@/features/user/components/FollowButton';
import type { User } from '@/shared/api/models';
import { useFormat } from '@/shared/format';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import * as s from './ProfileHeader.css';

type ProfileHeaderProps = {
  user: User;
  viewerId: number;
  /** 팔로우 목록은 로그인해야 볼 수 있어요. 없으면 숫자만 보여줘요. */
  onOpenFollows?: (kind: FollowListKind) => void;
  /** 내 프로필이면 편집 버튼을 보여줘요. */
  onEdit?: () => void;
  /** 머리 아래에 붙는 탭 목록 */
  tabs: ReactNode;
};

/** 마이페이지·다른 사람 프로필의 머리 (사진, 이름, 팔로워 수, 소개, 버튼, 탭) */
export function ProfileHeader({
  user,
  viewerId,
  onOpenFollows,
  onEdit,
  tabs,
}: ProfileHeaderProps) {
  const { t } = useTranslation();
  const format = useFormat();
  const isDesktop = useMediaQuery(mq.md);
  const name = user.name || t('component.user.unknown');
  const intro = user.introduction?.trim();
  const isMine = viewerId > 0 && viewerId === user.id;

  const count = (kind: FollowListKind, value: number) => {
    // 한 줄로 이어 읽히게 span 하나에 담아요 (flex 간격이 '128 명'처럼 벌리지 않게).
    const label = (
      <span>
        <Trans
          i18nKey={`page.profile.${kind}`}
          values={{ number: format.number(value) }}
          components={{ b: <b className={s.countNumber} /> }}
        />
      </span>
    );
    if (!onOpenFollows) return <span className={s.count}>{label}</span>;
    return (
      <button
        type='button'
        aria-haspopup='dialog'
        className={clsx(s.count, s.countButton)}
        onClick={() => onOpenFollows(kind)}
      >
        {label}
      </button>
    );
  };

  return (
    <section aria-label={t('page.profile.region')} className={s.header}>
      <div className={s.top}>
        <Avatar
          name={name}
          src={user.profile}
          size={isDesktop ? 96 : 72}
          className={s.avatar}
        />
        <div className={s.info}>
          <h1 className={s.name}>{name}</h1>
          <div className={s.counts}>
            {count('followers', user.follower_num)}
            {count('followings', user.following_num)}
          </div>
        </div>
        <p className={clsx(s.intro, !intro && s.introEmpty)}>
          {intro || t('component.section.profile.text.no-introduction')}
        </p>
        {isMine ? (
          <div className={s.actions}>
            <Button
              variant='neutral'
              aria-haspopup='dialog'
              className={s.mainAction}
              onClick={onEdit}
            >
              {t('component.section.profile.button.edit-profile')}
            </Button>
            <Link
              to='/settings'
              aria-label={t('component.topnav.dropdown.settings')}
              className={iconButtonStyles({ variant: 'outline', size: 'md' })}
            >
              <Settings aria-hidden='true' />
            </Link>
          </div>
        ) : (
          viewerId > 0 && (
            <div className={s.actions}>
              <FollowButton
                targetId={user.id}
                viewerId={viewerId}
                size='md'
                emphasis='strong'
                className={s.mainAction}
              />
            </div>
          )
        )}
      </div>
      <div className={s.tabs}>{tabs}</div>
    </section>
  );
}

/** 프로필을 불러오는 동안 머리 자리 */
export function ProfileHeaderSkeleton() {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery(mq.md);
  const avatar = isDesktop ? 96 : 72;
  return (
    <div
      role='status'
      aria-label={t('component.base.infinite-scroll.loading')}
      className={s.header}
    >
      <div className={s.top}>
        <Skeleton
          width={avatar}
          height={avatar}
          radius='50%'
          className={s.avatar}
        />
        <div className={s.info}>
          <Skeleton width={120} height={28} />
          <Skeleton width={180} height={20} />
        </div>
        <Skeleton width='60%' height={18} className={s.intro} />
      </div>
      <div className={s.tabs}>
        <Skeleton width='70%' height={20} style={{ margin: '16px 0' }} />
      </div>
    </div>
  );
}
