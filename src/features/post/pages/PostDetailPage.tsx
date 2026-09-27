import { ChevronLeft, MessageCircle, SearchX, SquarePen } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, buttonStyles, mq, Skeleton } from '@/design-system';
import { CommentSection } from '@/features/comment/components/CommentSection';
import { maskLanguageFor, usePopularSummaries } from '@/features/summary/api';
import { httpStatus } from '@/shared/api/client';
import type { Post } from '@/shared/api/models';
import { Attachments } from '@/shared/components/Attachments';
import { AuthorRow } from '@/shared/components/AuthorRow';
import { CoverRailList } from '@/shared/components/CoverRailList';
import * as sd from '@/shared/components/DetailContent.css';
import * as page from '@/shared/components/DetailPage.css';
import { LikeButton } from '@/shared/components/LikeButton';
import { PageState } from '@/shared/components/PageState';
import { PhotoGrid } from '@/shared/components/PhotoGrid';
import { photosOf } from '@/shared/files';
import { ShareButton } from '@/shared/components/ShareButton';
import { useFormat } from '@/shared/format';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import { useScrollToHash } from '@/shared/hooks/useScrollToHash';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { useAuth } from '@/shell/hooks';
import {
  useCreatePostComment,
  usePost,
  usePostComments,
  usePostLiked,
  useTogglePostLike,
} from '../api';
import { PostComposer } from '../components/PostComposer';
import { postTitle } from '../display';
import { PostOwnerMenu } from '../components/PostOwnerMenu';

function PopularSummariesRail() {
  const { t, i18n } = useTranslation();
  const format = useFormat();
  const { data } = usePopularSummaries(maskLanguageFor(i18n.language));
  return (
    <CoverRailList
      title={t('page.debate.title.popular')}
      items={(data ?? []).slice(0, 3).map((summary) => ({
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

function PostDetail({ post }: { post: Post }) {
  const { t } = useTranslation();
  const format = useFormat();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery(mq.md);
  const isWide = useMediaQuery(mq.xl);
  const { user, isLoggedIn } = useAuth();
  const viewerId = isLoggedIn ? (user.id ?? 0) : 0;
  const isOwner = viewerId > 0 && viewerId === post.user.id;
  const [editing, setEditing] = useState(false);

  const liked = usePostLiked(post.id, viewerId);
  const toggleLike = useTogglePostLike(viewerId);
  const comments = usePostComments(post.id);
  useScrollToHash(comments.status !== 'pending');
  const createComment = useCreatePostComment(post.id);

  const title = postTitle(post, t);
  const photos = photosOf(post.files);
  const otherFiles = (post.files ?? []).filter(
    (file) => !photos.includes(file)
  );
  const content = post.content?.trim();
  const commentList = comments.data?.pages.flatMap((page) => page.items);
  const commentTotal = comments.data?.pages[0]?.total ?? post.comments_num;

  const actions = (
    <>
      <ShareButton title={title} />
      {isOwner && (
        <PostOwnerMenu
          post={post}
          onEdit={() => setEditing(true)}
          onDeleted={() => navigate('/post', { replace: true })}
        />
      )}
    </>
  );

  return (
    <div className={page.page}>
      <div className={page.content}>
        <article className={page.article}>
          <div className={page.topRow}>
            <Link to='/post' className={page.backLink}>
              <ChevronLeft aria-hidden='true' />
              {t('component.topnav.post')}
            </Link>
            <span className={page.spacer} />
            {!isDesktop && <div className={page.topActions}>{actions}</div>}
          </div>

          <header className={sd.heading}>
            <AuthorRow
              author={post.user}
              viewerId={viewerId}
              meta={format.relativeTime(post.created)}
              actions={isDesktop ? actions : undefined}
            />
            <h1 className={sd.title}>{title}</h1>
          </header>

          <div className={sd.body}>
            {content && <p className={sd.text}>{content}</p>}
            <PhotoGrid
              photos={photos}
              size='detail'
              altFor={(index) => t('page.post.photo-alt', { index })}
            />
            <Attachments files={otherFiles} />
          </div>

          <div className={page.footer}>
            <LikeButton
              liked={liked.data ?? false}
              label={t('component.stats.likes', { count: post.likes_num })}
              disabled={
                viewerId <= 0 || liked.isPending || toggleLike.isPending
              }
              onToggle={() =>
                toggleLike.mutate({ id: post.id, like: !liked.data })
              }
            />
            <a href='#comments' className={buttonStyles({ variant: 'plain' })}>
              <MessageCircle aria-hidden='true' />
              {t('component.stats.comments', { count: commentTotal })}
            </a>
          </div>
        </article>

        <CommentSection
          id='comments'
          comments={commentList}
          total={commentTotal}
          status={comments.status}
          onRetry={() => void comments.refetch()}
          canWrite={viewerId > 0}
          onSubmit={(input) => createComment.mutateAsync(input)}
          serverPaging={{
            hasMore: comments.hasNextPage,
            loadingMore: comments.isFetchingNextPage,
            onLoadMore: () => void comments.fetchNextPage(),
          }}
        />
      </div>

      {isWide && (
        <aside className={page.rail}>
          <PopularSummariesRail />
        </aside>
      )}

      {isOwner && (
        <PostComposer open={editing} post={post} onOpenChange={setEditing} />
      )}
    </div>
  );
}

function DetailSkeleton() {
  const { t } = useTranslation();
  return (
    <div
      role='status'
      aria-label={t('component.base.infinite-scroll.loading')}
      className={page.skeleton}
    >
      <div className={page.skeletonLines} aria-hidden='true'>
        <Skeleton width={200} height={40} radius={20} />
        <Skeleton width='60%' height={30} />
        <Skeleton height={16} />
        <Skeleton height={16} width='90%' />
        <Skeleton height={220} radius={16} />
      </div>
    </div>
  );
}

/** 게시글 상세 (/post/:post_id) */
function PostDetailPage() {
  const { t } = useTranslation();
  const { post_id } = useParams();
  const id = Number(post_id);
  const valid = Number.isInteger(id) && id > 0;
  const query = usePost(valid ? id : 0);

  useDocumentTitle(
    query.data ? postTitle(query.data, t) : t('component.topnav.post')
  );

  const notFound = (
    <PageState
      icon={<SearchX />}
      title={t('page.post.state.not-found-title')}
      description={t('page.debate-detail.state.not-found-description')}
      actions={
        <Link to='/post' className={buttonStyles({ variant: 'secondary' })}>
          {t('page.post.state.to-list')}
        </Link>
      }
    />
  );

  if (!valid) return notFound;
  if (query.isPending) return <DetailSkeleton />;
  if (query.isError) {
    const status = httpStatus(query.error);
    if (status === 404 || status === 422) return notFound;
    return (
      <PageState
        tone='danger'
        icon={<SquarePen />}
        title={t('page.post.error')}
        description={t('page.post.error-description')}
        actions={
          <Button variant='outline' onClick={() => void query.refetch()}>
            {t('page.debate.item.retry')}
          </Button>
        }
      />
    );
  }
  return <PostDetail post={query.data} />;
}

export default PostDetailPage;
