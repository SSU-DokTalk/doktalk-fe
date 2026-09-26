import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { MessagesSquare, Plus, SearchX } from 'lucide-react';
import { useId, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Button,
  buttonStyles,
  EmptyState,
  mq,
  Spinner,
  visuallyHidden,
} from '@/design-system';
import { PopularSummaries } from '@/features/summary/components/PopularSummaries';
import type { Debate } from '@/shared/api/models';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import { useLoadMoreOnScroll } from '@/shared/hooks/useLoadMoreOnScroll';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { debateListQuery } from '../api';
import { DebateFilters } from '../components/DebateFilters';
import {
  DebateListItem,
  DebateListItemSkeleton,
} from '../components/DebateListItem';
import { COVER_WIDTH } from '../components/DebateListItem.css';
import { RecommendedDebates } from '../components/RecommendedDebates';
import { useDebateListParams } from '../useDebateListParams';
import * as s from './DebateListPage.css';

/** 독서 토론 목록 (/debate) */
function DebateListPage() {
  const { t } = useTranslation();
  const listHeadingId = useId();
  const isDesktop = useMediaQuery(mq.md);
  const isWide = useMediaQuery(mq.xl);
  const params = useDebateListParams();

  useDocumentTitle(t('component.topnav.debate'));

  const {
    data,
    status,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
    isPlaceholderData,
  } = useInfiniteQuery({
    ...debateListQuery(params.filters),
    placeholderData: keepPreviousData,
  });

  // 페이지 사이에 새 글이 생기면 같은 글이 두 번 올 수 있어서 id로 걸러요.
  const debates = useMemo(() => {
    const seen = new Set<number>();
    const unique: Debate[] = [];
    for (const page of data?.pages ?? []) {
      for (const debate of page.items) {
        if (seen.has(debate.id)) continue;
        seen.add(debate.id);
        unique.push(debate);
      }
    }
    return unique;
  }, [data]);

  const loadMoreRef = useLoadMoreOnScroll({
    enabled:
      data !== undefined &&
      !isPlaceholderData &&
      hasNextPage &&
      !isFetchingNextPage &&
      !isFetchNextPageError,
    onLoadMore: () => void fetchNextPage(),
  });

  const coverWidth = isDesktop ? COVER_WIDTH.desktop : COVER_WIDTH.mobile;
  const loadingLabel = t('component.base.infinite-scroll.loading');

  const renderList = () => {
    if (status === 'pending') {
      return (
        <div role='status' aria-label={loadingLabel}>
          {[0, 1, 2].map((index) => (
            <DebateListItemSkeleton key={index} coverWidth={coverWidth} />
          ))}
        </div>
      );
    }

    // 다음 페이지만 실패했을 때도 status가 error가 돼요. 불러 둔 목록이 없을 때만 오류 화면을 보여줘요.
    if (!data) {
      return (
        <EmptyState
          tone='danger'
          icon={<MessagesSquare />}
          title={t('page.debate.item.error')}
          description={t('page.debate.item.error-description')}
          actions={
            <Button variant='outline' onClick={() => void refetch()}>
              {t('page.debate.item.retry')}
            </Button>
          }
        />
      );
    }

    if (debates.length === 0) {
      return params.isFiltered ? (
        <EmptyState
          icon={<SearchX />}
          title={t('page.debate.item.no-result')}
          description={t('page.debate.item.no-result-description')}
        />
      ) : (
        <EmptyState
          icon={<MessagesSquare />}
          title={t('page.debate.item.no-debate-item')}
          description={t('page.debate.item.empty-description')}
          actions={
            <Link
              to='/debate/create'
              className={buttonStyles({ variant: 'primary' })}
            >
              {t('page.debate.button.create')}
            </Link>
          }
        />
      );
    }

    return (
      <>
        <ul className={s.items}>
          {debates.map((debate) => (
            <li key={debate.id}>
              <DebateListItem debate={debate} coverWidth={coverWidth} />
            </li>
          ))}
        </ul>
        <div ref={loadMoreRef} />
        {isFetchingNextPage && (
          <div className={s.listStatus}>
            <Spinner label={loadingLabel} showLabel />
          </div>
        )}
        {isFetchNextPageError && (
          <div className={s.listStatus}>
            <Button variant='outline' onClick={() => void fetchNextPage()}>
              {t('page.debate.item.retry')}
            </Button>
          </div>
        )}
      </>
    );
  };

  return (
    <div className={s.page}>
      <div className={s.content}>
        <div className={s.header}>
          <div className={s.titles}>
            <h1 className={s.title}>{t('component.topnav.debate')}</h1>
            <p className={s.subtitle}>{t('page.debate.subtitle')}</p>
          </div>
          <Link
            to='/debate/create'
            className={`${buttonStyles({
              variant: 'primary',
              size: isDesktop ? 'md' : 'sm',
            })} ${s.createLink}`}
          >
            <Plus aria-hidden='true' />
            {t('page.debate.button.create')}
          </Link>
        </div>

        <RecommendedDebates />

        <DebateFilters
          searchBy={params.searchBy}
          onSearchByChange={params.setSearchBy}
          searchText={params.searchText}
          onSearchTextChange={params.setSearchText}
          onSearchSubmit={params.submitSearch}
          category={params.category}
          onCategoryChange={params.setCategory}
          sort={params.sort}
          onSortChange={params.setSort}
          fromDate={params.fromDate}
          onFromDateChange={params.setFromDate}
        />

        <section
          aria-labelledby={listHeadingId}
          aria-busy={isPlaceholderData || undefined}
          className={s.list}
        >
          <h2 id={listHeadingId} className={visuallyHidden}>
            {t('page.debate.list')}
          </h2>
          {renderList()}
        </section>
      </div>

      {isWide && (
        <div className={s.rail}>
          <PopularSummaries />
        </div>
      )}
    </div>
  );
}

export default DebateListPage;
