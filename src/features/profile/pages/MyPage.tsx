import { CircleAlert, LogIn } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
import { Button, buttonStyles, mq, Tabs } from '@/design-system';
import { MyLibrary } from '@/features/library/components/MyLibrary';
import { PaymentHistory } from '@/features/payment/components/PaymentHistory';
import { useMe, type FollowListKind } from '@/features/user/api';
import { PageState } from '@/shared/components/PageState';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { useAuth } from '@/shell/hooks';
import { FollowListDialog } from '../components/FollowListDialog';
import { ProfileEditDialog } from '../components/ProfileEditDialog';
import {
  ProfileHeader,
  ProfileHeaderSkeleton,
} from '../components/ProfileHeader';
import { ProfileMeetings } from '../components/ProfileMeetings';
import { ProfilePosts } from '../components/ProfilePosts';
import { ProfileSummaries } from '../components/ProfileSummaries';
import * as s from './ProfilePage.css';

/** 탭 주소(?tab=)와 이름. 왼쪽 칼럼 '내 활동' 링크가 이 주소로 들어와요. */
const MY_TABS = ['post', 'summary', 'library', 'debate', 'payment'] as const;
type MyTab = (typeof MY_TABS)[number];

const parseTab = (value: string | null): MyTab =>
  MY_TABS.find((tab) => tab === value) ?? 'post';

/** 마이페이지 (/mypage?tab=post|summary|library|debate|payment) */
function MyPage() {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery(mq.md);
  const { user, isLoggedIn } = useAuth();
  const viewerId = isLoggedIn ? (user.id ?? 0) : 0;
  const me = useMe(viewerId);
  const [params, setParams] = useSearchParams();
  const tab = parseTab(params.get('tab'));
  const [follows, setFollows] = useState<FollowListKind | null>(null);
  const [editing, setEditing] = useState(false);

  useDocumentTitle(t('component.topnav.dropdown.mypage'));

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

  if (me.isPending) {
    return (
      <div className={s.page}>
        <ProfileHeaderSkeleton />
      </div>
    );
  }

  if (!me.data) {
    return (
      <PageState
        tone='danger'
        icon={<CircleAlert />}
        title={t('page.profile.state.error-title')}
        description={t('page.profile.state.error-description')}
        actions={
          <Button variant='outline' onClick={() => void me.refetch()}>
            {t('page.debate.item.retry')}
          </Button>
        }
      />
    );
  }

  const changeTab = (value: MyTab) =>
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
      value={tab}
      onValueChange={(value) => changeTab(value as MyTab)}
      className={s.page}
    >
      <ProfileHeader
        user={me.data}
        viewerId={viewerId}
        onOpenFollows={setFollows}
        onEdit={() => setEditing(true)}
        tabs={
          <Tabs.List
            aria-label={t('page.profile.my-tabs')}
            size={isDesktop ? 'lg' : 'md'}
            scroll
          >
            {MY_TABS.map((key) => (
              <Tabs.Tab key={key} value={key}>
                {t(`component.section.profile.tab.my-tab.${key}`)}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        }
      />

      <Tabs.Panel value='post' className={s.panel}>
        <ProfilePosts user={me.data} viewerId={viewerId} />
      </Tabs.Panel>
      <Tabs.Panel value='summary' className={s.panel}>
        <ProfileSummaries userId={viewerId} />
      </Tabs.Panel>
      <Tabs.Panel value='library' className={s.panel}>
        <MyLibrary viewerId={viewerId} />
      </Tabs.Panel>
      <Tabs.Panel value='debate' className={s.panel}>
        <ProfileMeetings viewerId={viewerId} />
      </Tabs.Panel>
      <Tabs.Panel value='payment' className={s.panel}>
        <PaymentHistory viewerId={viewerId} />
      </Tabs.Panel>

      <FollowListDialog
        user={me.data}
        viewerId={viewerId}
        kind={follows}
        onKindChange={setFollows}
      />
      <ProfileEditDialog
        user={me.data}
        open={editing}
        onOpenChange={setEditing}
      />
    </Tabs.Root>
  );
}

export default MyPage;
