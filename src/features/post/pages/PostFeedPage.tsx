import { PenLine, SquarePen } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { EmptyState, mq } from '@/design-system';
import { maskLanguageFor, usePopularSummaries } from '@/features/summary/api';
import type { Post } from '@/shared/api/models';
import { CoverRailList } from '@/shared/components/CoverRailList';
import { InfiniteFeed } from '@/shared/components/InfiniteFeed';
import * as s from '@/shared/components/ListPage.css';
import { useFormat } from '@/shared/format';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { useAuth } from '@/shell/hooks';
import { usePostFeed, useTogglePostLike } from '../api';
import { PostCard, PostCardSkeleton } from '../components/PostCard';
import { PostComposer } from '../components/PostComposer';
import { WritePrompt } from '../components/WritePrompt';

function PopularSummariesRail() {
  const { t, i18n } = useTranslation();
  const format = useFormat();
  const { data } = usePopularSummaries(maskLanguageFor(i18n.language));

  return (
    <CoverRailList
      title={t('page.debate.title.popular')}
      more={{
        to: '/summary',
        label: t('page.debate.popular.more'),
        ariaLabel: t('page.debate.popular.more-label'),
      }}
      items={(data ?? []).slice(0, 4).map((summary) => ({
        key: summary.id,
        to: `/summary/${summary.id}`,
        title: summary.title,
        cover: { title: summary.book.title, src: summary.book.image },
        meta:
          summary.price > 0
            ? format.price(summary.price)
            : t('component.stats.free'),
      }))}
    />
  );
}

/** 게시글 피드 (/post). ?write=1로 들어오면 쓰기 창을 열어요. */
function PostFeedPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isWide = useMediaQuery(mq.xl);
  const { user, isLoggedIn } = useAuth();
  const viewerId = isLoggedIn ? (user.id ?? 0) : 0;
  const [params, setParams] = useSearchParams();
  const query = usePostFeed(viewerId);
  const toggleLike = useTogglePostLike(viewerId);
  const [editing, setEditing] = useState<Post | undefined>();
  const composing =
    isLoggedIn && (params.get('write') === '1' || editing !== undefined);

  useDocumentTitle(t('component.topnav.post'));

  const openComposer = () =>
    setParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('write', '1');
      return next;
    });
  const closeComposer = () => {
    setEditing(undefined);
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('write');
        return next;
      },
      { replace: true }
    );
  };

  const likedIds = new Set(query.data?.pages.flatMap((page) => page.likedIds));
  const getKey = useCallback((post: Post) => post.id, []);

  return (
    <div className={s.page}>
      <div className={s.content}>
        <div className={s.header}>
          <div className={s.titles}>
            <h1 className={s.title}>{t('component.topnav.post')}</h1>
            <p className={s.subtitle}>{t('page.post.subtitle')}</p>
          </div>
        </div>

        <WritePrompt onOpen={openComposer} />

        <InfiniteFeed
          variant='cards'
          heading={t('page.post.list')}
          query={query}
          getKey={getKey}
          renderItem={(post) => (
            <PostCard
              post={post}
              viewerId={viewerId}
              liked={likedIds.has(post.id)}
              likePending={toggleLike.isPending}
              onToggleLike={() =>
                toggleLike.mutate({ id: post.id, like: !likedIds.has(post.id) })
              }
              onEdit={() => setEditing(post)}
            />
          )}
          renderSkeleton={() => <PostCardSkeleton />}
          errorIcon={<SquarePen />}
          errorTitle={t('page.post.error')}
          errorDescription={t('page.post.error-description')}
          empty={
            <EmptyState
              icon={<PenLine />}
              title={t('page.landing.item.no-post-item')}
              description={t('page.post.empty-description')}
            />
          }
        />
      </div>

      {isWide && (
        <div className={s.rail}>
          <PopularSummariesRail />
        </div>
      )}

      <PostComposer
        open={composing}
        post={editing}
        onOpenChange={(open) => {
          if (!open) closeComposer();
        }}
        onSaved={(id) => {
          // 새 글은 상세로, 수정은 피드에 그대로 있어요.
          if (!editing) navigate(`/post/${id}`);
        }}
      />
    </div>
  );
}

export default PostFeedPage;
