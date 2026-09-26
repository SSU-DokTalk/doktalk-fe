import { Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Button,
  Dialog,
  EmptyState,
  mq,
  Spinner,
  Tabs,
} from '@/design-system';
import { useFollowList, type FollowListKind } from '@/features/user/api';
import { FollowButton } from '@/features/user/components/FollowButton';
import type { User } from '@/shared/api/models';
import { useFormat } from '@/shared/format';
import { useLoadMoreOnScroll } from '@/shared/hooks/useLoadMoreOnScroll';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import * as s from './FollowListDialog.css';

type FollowListDialogProps = {
  user: Pick<User, 'id' | 'name' | 'follower_num' | 'following_num'>;
  viewerId: number;
  /** 보고 있는 목록. null이면 닫혀 있어요. */
  kind: FollowListKind | null;
  onKindChange: (kind: FollowListKind | null) => void;
};

function FollowPeople({
  userId,
  viewerId,
  kind,
  onNavigate,
}: {
  userId: number;
  viewerId: number;
  kind: FollowListKind;
  onNavigate: () => void;
}) {
  const { t } = useTranslation();
  const query = useFollowList(userId, kind, true);
  const loadingLabel = t('component.base.infinite-scroll.loading');
  const loadMoreRef = useLoadMoreOnScroll({
    enabled:
      query.hasNextPage &&
      !query.isFetchingNextPage &&
      !query.isFetchNextPageError,
    onLoadMore: () => void query.fetchNextPage(),
    rootMargin: '120px',
  });

  if (query.isPending) {
    return (
      <div className={s.status}>
        <Spinner label={loadingLabel} showLabel />
      </div>
    );
  }

  // 다음 페이지만 실패해도 error 상태라서, 불러 둔 목록이 없을 때만 오류를 보여줘요.
  if (!query.data) {
    return (
      <div className={s.state}>
        <EmptyState
          tone='danger'
          icon={<Users />}
          title={t('page.profile.follow-list.error')}
          actions={
            <Button variant='outline' onClick={() => void query.refetch()}>
              {t('page.debate.item.retry')}
            </Button>
          }
        />
      </div>
    );
  }

  const people = query.data.pages.flatMap((page) => page.items);
  if (people.length === 0) {
    return (
      <div className={s.state}>
        <EmptyState
          icon={<Users />}
          title={t(`page.profile.follow-list.empty-${kind}`)}
        />
      </div>
    );
  }

  return (
    <>
      <ul className={s.list}>
        {people.map((person) => {
          const name = person.name || t('component.user.unknown');
          return (
            <li key={person.id} className={s.row}>
              <Link
                to={person.id === viewerId ? '/mypage' : `/user/${person.id}`}
                className={s.person}
                onClick={onNavigate}
              >
                <Avatar name={name} src={person.profile} size={44} />
                <span className={s.personName}>{name}</span>
              </Link>
              <FollowButton
                targetId={person.id}
                viewerId={viewerId}
                emphasis='strong'
              />
            </li>
          );
        })}
      </ul>
      <div ref={loadMoreRef} />
      {query.isFetchingNextPage && (
        <div className={s.status}>
          <Spinner label={loadingLabel} showLabel />
        </div>
      )}
      {query.isFetchNextPageError && (
        <div className={s.status}>
          <Button variant='outline' onClick={() => void query.fetchNextPage()}>
            {t('page.debate.item.retry')}
          </Button>
        </div>
      )}
    </>
  );
}

/** 팔로워·팔로잉 목록 창. 데스크톱은 가운데, 모바일은 화면 전체예요. */
export function FollowListDialog({
  user,
  viewerId,
  kind,
  onKindChange,
}: FollowListDialogProps) {
  const { t } = useTranslation();
  const format = useFormat();
  const isDesktop = useMediaQuery(mq.md);
  const close = () => onKindChange(null);

  return (
    <Dialog.Root
      open={kind !== null}
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <Dialog.Content
        placement={isDesktop ? 'center' : 'full'}
        width={480}
        className={s.popup}
      >
        <Dialog.Header
          title={user.name || t('component.user.unknown')}
          closeLabel={t('component.dialog.close')}
        />
        {kind && (
          <Tabs.Root
            value={kind}
            onValueChange={(value) => onKindChange(value as FollowListKind)}
            className={s.body}
          >
            <Tabs.List
              aria-label={t('page.profile.follow-list.tabs')}
              fill
              divider
              className={s.tabs}
            >
              <Tabs.Tab value='followers'>
                {t('page.profile.follow-list.followers', {
                  number: format.number(user.follower_num),
                })}
              </Tabs.Tab>
              <Tabs.Tab value='followings'>
                {t('page.profile.follow-list.followings', {
                  number: format.number(user.following_num),
                })}
              </Tabs.Tab>
            </Tabs.List>
            {(['followers', 'followings'] as const).map((value) => (
              <Tabs.Panel key={value} value={value} className={s.panel}>
                <FollowPeople
                  userId={user.id}
                  viewerId={viewerId}
                  kind={value}
                  onNavigate={close}
                />
              </Tabs.Panel>
            ))}
          </Tabs.Root>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
}
