import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { MessagesSquare, Plus, SearchX } from 'lucide-react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { buttonStyles, EmptyState, mq } from '@/design-system';
import { PopularSummaries } from '@/features/summary/components/PopularSummaries';
import type { Debate } from '@/shared/api/models';
import { COVER_WIDTH } from '@/shared/components/FeedItem.css';
import { InfiniteFeed } from '@/shared/components/InfiniteFeed';
import { ListFilters } from '@/shared/components/ListFilters';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import { useListParams } from '@/shared/hooks/useListParams';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { debateListQuery, type DebateListFilters } from '../api';
import {
  DebateListItem,
  DebateListItemSkeleton,
} from '../components/DebateListItem';
import { RecommendedDebates } from '../components/RecommendedDebates';
import * as s from '@/shared/components/ListPage.css';

const SORTS = ['latest', 'popular', 'from'] as const;

/** 독서 토론 목록 (/debate) */
function DebateListPage() {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery(mq.md);
  const isWide = useMediaQuery(mq.xl);
  const params = useListParams({ sorts: SORTS, dateSort: 'from' });

  useDocumentTitle(t('component.topnav.debate'));

  /** API 요청 조건. 검색어가 없으면 검색 기준은 캐시 키에서 빼요. */
  const filters: DebateListFilters = {
    category: params.category,
    search: params.search,
    searchBy: params.search ? params.searchBy : 'bt',
    sort: params.sort,
    from: params.usesDate ? params.fromDate.replace(/-/g, '.') : undefined,
  };

  const query = useInfiniteQuery({
    ...debateListQuery(filters),
    placeholderData: keepPreviousData,
  });

  const coverWidth = isDesktop ? COVER_WIDTH.desktop : COVER_WIDTH.mobile;
  const getKey = useCallback((debate: Debate) => debate.id, []);

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

        <ListFilters
          params={params}
          labels={{
            region: t('page.debate.filters'),
            searchBy: t('page.debate.search.by'),
            bookTitle: t('page.debate.search.book-title'),
            itemTitle: t('page.debate.search.item-title'),
            search: t('page.debate.search.label'),
            searchPlaceholder: t('page.debate.search.placeholder'),
            category: t('page.debate.category-label'),
            categoryAll: t('page.debate.category-all'),
            sort: t('page.debate.sort.label'),
            fromDate: t('page.debate.sort.from-date'),
          }}
          sortOptions={[
            { value: 'latest', label: t('page.debate.sort.latest') },
            { value: 'popular', label: t('page.debate.sort.popular') },
            { value: 'from', label: t('page.debate.sort.from') },
          ]}
        />

        <InfiniteFeed
          heading={t('page.debate.list')}
          query={query}
          getKey={getKey}
          renderItem={(debate) => (
            <DebateListItem debate={debate} coverWidth={coverWidth} />
          )}
          renderSkeleton={() => (
            <DebateListItemSkeleton coverWidth={coverWidth} />
          )}
          errorIcon={<MessagesSquare />}
          errorTitle={t('page.debate.item.error')}
          errorDescription={t('page.debate.item.error-description')}
          empty={
            params.isFiltered ? (
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
            )
          }
        />
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
