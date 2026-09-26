import { ChevronLeft, FileText, MessageCircle, SearchX } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Badge, Button, buttonStyles, mq, Skeleton } from '@/design-system';
import { CommentSection } from '@/features/comment/components/CommentSection';
import { ProductCheckout } from '@/features/payment/components/ProductCheckout';
import { httpStatus } from '@/shared/api/client';
import type { Summary } from '@/shared/api/models';
import { categoryLabelKeys } from '@/shared/categories';
import { Attachments } from '@/shared/components/Attachments';
import { AuthorRow } from '@/shared/components/AuthorRow';
import { CoverRailList } from '@/shared/components/CoverRailList';
import * as page from '@/shared/components/DetailPage.css';
import { LikeButton } from '@/shared/components/LikeButton';
import { PageState } from '@/shared/components/PageState';
import { ShareButton } from '@/shared/components/ShareButton';
import { useFormat } from '@/shared/format';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import {
  maskLanguageFor,
  useCreateSummaryComment,
  usePopularSummaries,
  useSummary,
  useSummaryComments,
  useSummaryLiked,
  useToggleSummaryLike,
} from '../api';
import { SummaryBookCard } from '../components/SummaryBookCard';
import * as s from '../components/SummaryDetail.css';
import { SummaryOwnerMenu } from '../components/SummaryOwnerMenu';
import { SummaryPaywall } from '../components/SummaryPaywall';
import { SummaryPurchaseCard } from '../components/SummaryPurchaseCard';
import { useSummaryAccess } from '../useSummaryAccess';

/** 목록에서 왔으면 그 목록(검색 조건 포함)으로 돌아가요. */
function useBackToList() {
  const location = useLocation();
  const from = (location.state as { from?: unknown } | null)?.from;
  const isListPath =
    typeof from === 'string' &&
    (from === '/summary' || from.startsWith('/summary?'));
  return isListPath ? from : '/summary';
}

function PopularSummariesRail({ excludeId }: { excludeId: number }) {
  const { t, i18n } = useTranslation();
  const format = useFormat();
  const { data } = usePopularSummaries(maskLanguageFor(i18n.language));
  const items = (data ?? [])
    .filter((item) => item.id !== excludeId)
    .slice(0, 3);

  return (
    <CoverRailList
      title={t('page.debate.title.popular')}
      items={items.map((item) => ({
        key: item.id,
        to: `/summary/${item.id}`,
        title: item.title,
        cover: { title: item.book.title, src: item.book.image },
        meta:
          item.price > 0 ? format.price(item.price) : t('component.stats.free'),
      }))}
    />
  );
}

function SummaryDetail({ summary }: { summary: Summary }) {
  const { t } = useTranslation();
  const format = useFormat();
  const isDesktop = useMediaQuery(mq.md);
  const isWide = useMediaQuery(mq.xl);
  const backTo = useBackToList();
  const access = useSummaryAccess(summary);
  const { viewerId, isOwner } = access;
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const liked = useSummaryLiked(summary.id, viewerId);
  const toggleLike = useToggleSummaryLike(summary.id, viewerId);
  const comments = useSummaryComments(summary.id);
  const createComment = useCreateSummaryComment(summary.id);

  const preview = summary.free_content?.trim();
  const free = summary.price <= 0;
  const openCheckout = () => setCheckoutOpen(true);

  const actions = (
    <>
      <ShareButton title={summary.title} />
      {isOwner && <SummaryOwnerMenu summary={summary} />}
    </>
  );

  const badge = access.unlocked
    ? free
      ? t('page.summary-detail.badge.free')
      : t('page.summary-detail.badge.purchased')
    : isOwner
      ? t('page.summary-detail.badge.own')
      : t('page.summary-detail.badge.preview');

  const renderLocked = () => {
    if (access.checking) {
      return (
        <div
          role='status'
          aria-label={t('component.base.infinite-scroll.loading')}
        >
          <Skeleton height={16} width='90%' />
        </div>
      );
    }
    if (access.charged.isError) {
      return (
        <p className={s.ownerNote}>
          {t('page.summary-detail.charged-error')}{' '}
          <Button
            variant='ghost'
            size='sm'
            onClick={() => void access.charged.refetch()}
          >
            {t('page.debate.item.retry')}
          </Button>
        </p>
      );
    }
    if (isOwner) {
      return (
        <p className={s.ownerNote}>{t('page.summary-detail.owner.note')}</p>
      );
    }
    return (
      <>
        {summary.charged_content?.trim() && (
          <p className={`${s.text} ${s.teaser}`} aria-hidden='true'>
            {summary.charged_content}
          </p>
        )}
        <SummaryPaywall
          summary={summary}
          access={access}
          onPay={openCheckout}
        />
      </>
    );
  };

  return (
    <div className={page.page}>
      <div className={page.content}>
        <article className={page.article}>
          <div className={page.topRow}>
            <Link to={backTo} className={page.backLink}>
              <ChevronLeft aria-hidden='true' />
              {t('component.topnav.summary')}
            </Link>
            <span className={page.spacer} />
            {!isDesktop && <div className={page.topActions}>{actions}</div>}
          </div>

          <header className={s.heading}>
            <div className={s.badges}>
              {categoryLabelKeys(summary.category).map((key) => (
                <Badge key={key} tone='info' shape='pill' size='lg'>
                  {t(key)}
                </Badge>
              ))}
            </div>
            <h1 className={s.title}>{summary.title}</h1>
            <AuthorRow
              author={summary.user}
              viewerId={viewerId}
              meta={format.relativeTime(summary.created)}
              actions={isDesktop ? actions : undefined}
            />
          </header>

          <SummaryBookCard book={summary.book} viewerId={viewerId} />

          <div className={s.body}>
            <Badge
              tone={access.unlocked ? 'brand' : 'info'}
              size='md'
              shape='pill'
            >
              {badge}
            </Badge>
            {preview && <p className={s.text}>{preview}</p>}
            {access.unlocked ? (
              <p className={s.text}>{access.charged.data}</p>
            ) : (
              renderLocked()
            )}
            <Attachments files={summary.files ?? []} />
          </div>

          <div className={page.footer}>
            <LikeButton
              liked={liked.data ?? false}
              label={t('component.stats.likes', { count: summary.likes_num })}
              disabled={
                viewerId <= 0 || liked.isPending || toggleLike.isPending
              }
              onToggle={() => toggleLike.mutate(!liked.data)}
            />
            <a href='#comments' className={buttonStyles({ variant: 'ghost' })}>
              <MessageCircle aria-hidden='true' />
              {t('component.stats.comments', {
                count: comments.data?.length ?? summary.comments_num,
              })}
            </a>
          </div>
        </article>

        <CommentSection
          id='comments'
          comments={comments.data}
          total={summary.comments_num}
          status={comments.status}
          onRetry={() => void comments.refetch()}
          canWrite={viewerId > 0}
          onSubmit={(input) => createComment.mutateAsync(input)}
        />
      </div>

      {isWide && (
        <aside className={page.rail}>
          <SummaryPurchaseCard
            summary={summary}
            access={access}
            onPay={openCheckout}
          />
          <PopularSummariesRail excludeId={summary.id} />
        </aside>
      )}

      {!free && !access.unlocked && !isOwner && (
        <ProductCheckout
          product={{
            type: 'S',
            id: summary.id,
            title: summary.title,
            price: summary.price,
          }}
          open={checkoutOpen}
          onOpenChange={setCheckoutOpen}
        />
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
        <Skeleton width={96} height={28} radius={14} />
        <Skeleton width='70%' height={32} />
        <Skeleton width={200} height={40} radius={20} />
        <Skeleton height={136} radius={16} />
        <Skeleton height={16} />
        <Skeleton height={16} width='85%' />
      </div>
    </div>
  );
}

/** 도서 요약 상세 (/summary/:summary_id). 로그인 없이도 미리보기를 볼 수 있어요. */
function SummaryDetailPage() {
  const { t, i18n } = useTranslation();
  const { summary_id } = useParams();
  const id = Number(summary_id);
  const valid = Number.isInteger(id) && id > 0;
  const query = useSummary(valid ? id : 0, maskLanguageFor(i18n.language));
  const backTo = useBackToList();

  useDocumentTitle(query.data?.title ?? t('component.topnav.summary'));

  const toList = (
    <Link to={backTo} className={buttonStyles({ variant: 'secondary' })}>
      {t('page.summary-detail.state.to-list')}
    </Link>
  );
  const notFound = (
    <PageState
      icon={<SearchX />}
      title={t('page.summary-detail.state.not-found-title')}
      description={t('page.debate-detail.state.not-found-description')}
      actions={toList}
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
        icon={<FileText />}
        title={t('page.summary.item.error')}
        description={t('page.summary.item.error-description')}
        actions={
          <Button variant='outline' onClick={() => void query.refetch()}>
            {t('page.debate.item.retry')}
          </Button>
        }
      />
    );
  }
  return <SummaryDetail summary={query.data} />;
}

export default SummaryDetailPage;
