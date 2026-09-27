import { CircleAlert, UserX } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { Button, buttonStyles, mq, Tabs } from '@/design-system';
import { LibraryShelf } from '@/features/library/components/LibraryShelf';
import { useUser, type FollowListKind } from '@/features/user/api';
import { httpStatus } from '@/shared/api/client';
import { PageState } from '@/shared/components/PageState';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { useAuth } from '@/shell/hooks';
import { FollowListDialog } from '../components/FollowListDialog';
import {
  ProfileHeader,
  ProfileHeaderSkeleton,
} from '../components/ProfileHeader';
import { ProfilePosts } from '../components/ProfilePosts';
import * as s from './ProfilePage.css';

const USER_TABS = ['post', 'library'] as const;
type UserTab = (typeof USER_TABS)[number];

const parseTab = (value: string | null): UserTab =>
  USER_TABS.find((tab) => tab === value) ?? 'post';

/** 다른 사람 프로필 (/user/:user_id?tab=post|library). 내 id면 마이페이지로 보내요. */
function UserProfilePage() {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery(mq.md);
  const { user_id } = useParams();
  const id = Number(user_id);
  const validId = Number.isInteger(id) && id > 0 ? id : 0;
  const { user, isLoggedIn } = useAuth();
  const viewerId = isLoggedIn ? (user.id ?? 0) : 0;
  const profile = useUser(validId);
  const [params, setParams] = useSearchParams();
  const tab = parseTab(params.get('tab'));
  const [follows, setFollows] = useState<FollowListKind | null>(null);

  useDocumentTitle(profile.data?.name || t('page.profile.region'));

  if (validId > 0 && validId === viewerId) {
    return <Navigate to='/mypage' replace />;
  }

  const status = httpStatus(profile.error);
  if (!validId || status === 404 || status === 422) {
    return (
      <PageState
        icon={<UserX />}
        title={t('page.profile.state.not-found-title')}
        description={t('page.profile.state.not-found-description')}
        actions={
          <Link to='/' className={buttonStyles({ variant: 'secondary' })}>
            {t('component.topnav.main-page')}
          </Link>
        }
      />
    );
  }

  if (profile.isPending) {
    return (
      <div className={s.page}>
        <ProfileHeaderSkeleton />
      </div>
    );
  }

  if (!profile.data) {
    return (
      <PageState
        tone='danger'
        icon={<CircleAlert />}
        title={t('page.profile.state.error-title')}
        description={t('page.profile.state.error-description')}
        actions={
          <Button variant='outline' onClick={() => void profile.refetch()}>
            {t('page.debate.item.retry')}
          </Button>
        }
      />
    );
  }

  const changeTab = (value: UserTab) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set('tab', value);
        return next;
      },
      { replace: true }
    );

  return (
    <Tabs.Root
      // 다른 사람 프로필로 옮겨 가면 탭·창 상태를 새로 시작해요.
      key={validId}
      value={tab}
      onValueChange={(value) => changeTab(value as UserTab)}
      className={s.page}
    >
      <ProfileHeader
        user={profile.data}
        viewerId={viewerId}
        onOpenFollows={viewerId > 0 ? setFollows : undefined}
        tabs={
          <Tabs.List
            aria-label={t('page.profile.user-tabs')}
            size={isDesktop ? 'lg' : 'md'}
            scroll
          >
            {USER_TABS.map((key) => (
              <Tabs.Tab key={key} value={key}>
                {t(`component.section.profile.tab.user-tab.${key}`)}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        }
      />

      <Tabs.Panel value='post' className={s.panel}>
        <ProfilePosts user={profile.data} viewerId={viewerId} />
      </Tabs.Panel>
      <Tabs.Panel value='library' className={s.panel}>
        <LibraryShelf userId={profile.data.id} editable={false} />
      </Tabs.Panel>

      {viewerId > 0 && (
        <FollowListDialog
          user={profile.data}
          viewerId={viewerId}
          kind={follows}
          onKindChange={setFollows}
        />
      )}
    </Tabs.Root>
  );
}

export default UserProfilePage;
