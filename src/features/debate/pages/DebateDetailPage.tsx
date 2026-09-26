import {
  ChevronLeft,
  LogIn,
  MessageCircle,
  MessagesSquare,
  SearchX,
} from 'lucide-react';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Button, buttonStyles, mq, Skeleton } from '@/design-system';
import { CommentSection } from '@/features/comment/components/CommentSection';
import { httpStatus } from '@/shared/api/client';
import type { Debate } from '@/shared/api/models';
import { Attachments } from '@/shared/components/Attachments';
import { LikeButton } from '@/shared/components/LikeButton';
import { PageState } from '@/shared/components/PageState';
import { ShareButton } from '@/shared/components/ShareButton';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import { useScrollToHash } from '@/shared/hooks/useScrollToHash';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { useAuth } from '@/shell/hooks';
import {
  useCreateDebateComment,
  useDebate,
  useDebateComments,
  useDebateLiked,
  useDebatePurchase,
  useToggleDebateLike,
} from '../api';
import { DebateHero } from '../components/DebateHero';
import { DebateJoinCard } from '../components/DebateJoinCard';
import { DebateOwnerMenu } from '../components/DebateOwnerMenu';
import { RelatedDebates } from '../components/RelatedDebates';
import * as s from '@/shared/components/DetailPage.css';
import { useAuthHref } from '@/features/auth/redirect';

/** 목록에서 왔으면 그 목록(검색 조건 포함)으로 돌아가요. */
function useBackToList() {
  const location = useLocation();
  const from = (location.state as { from?: unknown } | null)?.from;
  const isListPath =
    typeof from === 'string' &&
    (from === '/debate' || from.startsWith('/debate?'));
  return isListPath ? from : '/debate';
}

function DebateDetail({ debate }: { debate: Debate }) {
  const { t } = useTranslation();
  const { user, isLoggedIn } = useAuth();
  const viewerId = isLoggedIn ? (user.id ?? 0) : 0;
  const isHost = viewerId > 0 && viewerId === debate.user.id;
  const isDesktop = useMediaQuery(mq.md);
  const isWide = useMediaQuery(mq.xl);
  const introId = useId();
  const backTo = useBackToList();

  const purchase = useDebatePurchase(debate.id, isHost ? 0 : viewerId);
  const liked = useDebateLiked(debate.id, viewerId);
  const toggleLike = useToggleDebateLike(debate.id, viewerId);
  const comments = useDebateComments(debate.id, true);
  useScrollToHash(comments.status !== 'pending');
  const createComment = useCreateDebateComment(debate.id);

  const content = debate.content?.trim();
  const files = debate.files ?? [];
  const actions = (
    <>
      <ShareButton title={debate.title} />
      {isHost && <DebateOwnerMenu debate={debate} />}
    </>
  );
  const joinCard = (variant: 'rail' | 'inline') => (
    <DebateJoinCard
      debate={debate}
      viewerId={viewerId}
      isHost={isHost}
      variant={variant}
    />
  );

  return (
    <div className={s.page}>
      <div className={s.content}>
        <article className={s.article}>
          <div className={s.topRow}>
            <Link to={backTo} className={s.backLink}>
              <ChevronLeft aria-hidden='true' />
              {t('component.topnav.debate')}
            </Link>
            <span className={s.spacer} />
            {!isDesktop && <div className={s.topActions}>{actions}</div>}
          </div>

          <DebateHero
            debate={debate}
            viewerId={viewerId}
            canSeeLink={isHost || Boolean(purchase.data)}
            actions={isDesktop ? actions : undefined}
          />

          {!isWide && joinCard('inline')}

          {(content || files.length > 0) && (
            <section aria-labelledby={introId} className={s.intro}>
              <h2 id={introId} className={s.sectionTitle}>
                {t('page.debate-detail.intro')}
              </h2>
              {content && <p className={s.introText}>{content}</p>}
              <Attachments files={files} />
            </section>
          )}

          <div className={s.footer}>
            <LikeButton
              liked={liked.data ?? false}
              label={t('page.debate-detail.like', { count: debate.likes_num })}
              disabled={
                viewerId <= 0 || liked.isPending || toggleLike.isPending
              }
              onToggle={() => toggleLike.mutate(!liked.data)}
            />
            <a href='#comments' className={buttonStyles({ variant: 'plain' })}>
              <MessageCircle aria-hidden='true' />
              {t('page.debate-detail.comments', {
                count: comments.data?.length ?? debate.comments_num,
              })}
            </a>
          </div>
        </article>

        <CommentSection
          id='comments'
          comments={comments.data}
          total={debate.comments_num}
          status={comments.status}
          onRetry={() => void comments.refetch()}
          canWrite={viewerId > 0}
          onSubmit={(input) => createComment.mutateAsync(input)}
        />
      </div>

      {isWide && (
        <aside className={s.rail}>
          {joinCard('rail')}
          <RelatedDebates excludeId={debate.id} />
        </aside>
      )}
    </div>
  );
}

type StateKind = 'login' | 'not-found' | 'error';

function DetailState({
  kind,
  onRetry,
}: {
  kind: StateKind;
  onRetry?: () => void;
}) {
  const { t } = useTranslation();
  const loginHref = useAuthHref();
  const backTo = useBackToList();
  const toList = (
    <Link to={backTo} className={buttonStyles({ variant: 'secondary' })}>
      {t('page.debate-detail.state.to-list')}
    </Link>
  );

  if (kind === 'login') {
    return (
      <PageState
        icon={<LogIn />}
        title={t('page.debate-detail.state.login-title')}
        description={t('page.debate-detail.state.login-description')}
        actions={
          <>
            <Link
              to={loginHref}
              className={buttonStyles({ variant: 'primary' })}
            >
              {t('component.topnav.login')}
            </Link>
            {toList}
          </>
        }
      />
    );
  }

  if (kind === 'not-found') {
    return (
      <PageState
        icon={<SearchX />}
        title={t('page.debate-detail.state.not-found-title')}
        description={t('page.debate-detail.state.not-found-description')}
        actions={toList}
      />
    );
  }

  return (
    <PageState
      tone='danger'
      icon={<MessagesSquare />}
      title={t('page.debate.item.error')}
      description={t('page.debate.item.error-description')}
      actions={
        <Button variant='outline' onClick={onRetry}>
          {t('page.debate.item.retry')}
        </Button>
      }
    />
  );
}

function DetailSkeleton() {
  const { t } = useTranslation();
  return (
    <div
      role='status'
      aria-label={t('component.base.infinite-scroll.loading')}
      className={s.skeleton}
    >
      <div className={s.skeletonHero} aria-hidden='true'>
        <Skeleton width={200} height={272} radius={20} />
        <div className={s.skeletonLines}>
          <Skeleton width={120} height={24} radius={12} />
          <Skeleton width='80%' height={28} />
          <Skeleton width={180} height={40} radius={20} />
          <Skeleton height={140} radius={16} />
        </div>
      </div>
    </div>
  );
}

/** 독서 토론 상세 (/debate/:debate_id) */
function DebateDetailPage() {
  const { t } = useTranslation();
  const { debate_id } = useParams();
  const id = Number(debate_id);
  const valid = Number.isInteger(id) && id > 0;
  const query = useDebate(valid ? id : 0);

  useDocumentTitle(query.data?.title ?? t('component.topnav.debate'));

  if (!valid) return <DetailState kind='not-found' />;
  if (query.isPending) return <DetailSkeleton />;
  if (query.isError) {
    const status = httpStatus(query.error);
    if (status === 401) return <DetailState kind='login' />;
    if (status === 404 || status === 422) {
      return <DetailState kind='not-found' />;
    }
    return <DetailState kind='error' onRetry={() => void query.refetch()} />;
  }
  return <DebateDetail debate={query.data} />;
}

export default DebateDetailPage;
