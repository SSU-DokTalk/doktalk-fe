import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { FileText, PenLine, SearchX } from 'lucide-react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { buttonStyles, EmptyState, mq } from '@/design-system';
import { RelatedDebates } from '@/features/debate/components/RelatedDebates';
import type { Summary } from '@/shared/api/models';
import { COVER_WIDTH } from '@/shared/components/FeedItem.css';
import { InfiniteFeed } from '@/shared/components/InfiniteFeed';
import { ListFilters } from '@/shared/components/ListFilters';
import * as s from '@/shared/components/ListPage.css';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import { useListParams } from '@/shared/hooks/useListParams';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import {
  maskLanguageFor,
  summaryListQuery,
  type SummaryListFilters,
} from '../api';
import { RecommendedSummaries } from '../components/RecommendedSummaries';
import {
  SummaryListItem,
  SummaryListItemSkeleton,
} from '../components/SummaryListItem';

const SORTS = ['latest', 'popular'] as const;

/** 도서 요약 목록 (/summary) */
function SummaryListPage() {
  const { t, i18n } = useTranslation();
  const isDesktop = useMediaQuery(mq.md);
  const isWide = useMediaQuery(mq.xl);
  const params = useListParams({ sorts: SORTS });

  useDocumentTitle(t('component.topnav.summary'));

  const filters: SummaryListFilters = {
    category: params.category,
    search: params.search,
    searchBy: params.search ? params.searchBy : 'bt',
    sort: params.sort,
    lang: maskLanguageFor(i18n.language),
  };

  const query = useInfiniteQuery({
    ...summaryListQuery(filters),
    placeholderData: keepPreviousData,
  });

  const coverWidth = isDesktop ? COVER_WIDTH.desktop : COVER_WIDTH.mobile;
  const getKey = useCallback((summary: Summary) => summary.id, []);

  return (
    <div className={s.page}>
      <div className={s.content}>
        <div className={s.header}>
          <div className={s.titles}>
            <h1 className={s.title}>{t('component.topnav.summary')}</h1>
            <p className={s.subtitle}>{t('page.summary.subtitle')}</p>
          </div>
          <Link
            to='/summary/create'
            className={`${buttonStyles({
              variant: 'primary',
              size: isDesktop ? 'md' : 'sm',
            })} ${s.createLink}`}
          >
            <PenLine aria-hidden='true' />
            {t('page.summary.button.write')}
          </Link>
        </div>

        <RecommendedSummaries />

        <ListFilters
          params={params}
          labels={{
            region: t('page.summary.filters'),
            searchBy: t('page.summary.search.by'),
            bookTitle: t('page.summary.search.book-title'),
            itemTitle: t('page.summary.search.item-title'),
            search: t('page.summary.search.label'),
            searchPlaceholder: t('page.summary.search.placeholder'),
            category: t('page.summary.category-label'),
            categoryAll: t('page.summary.category-all'),
            sort: t('page.summary.sort.label'),
          }}
          sortOptions={[
            { value: 'latest', label: t('page.summary.sort.latest') },
            { value: 'popular', label: t('page.summary.sort.popular') },
          ]}
        />

        <InfiniteFeed
          heading={t('page.summary.list')}
          query={query}
          getKey={getKey}
          renderItem={(summary) => (
            <SummaryListItem summary={summary} coverWidth={coverWidth} />
          )}
          renderSkeleton={() => (
            <SummaryListItemSkeleton coverWidth={coverWidth} />
          )}
          errorIcon={<FileText />}
          errorTitle={t('page.summary.item.error')}
          errorDescription={t('page.summary.item.error-description')}
          empty={
            params.isFiltered ? (
              <EmptyState
                icon={<SearchX />}
                title={t('page.summary.item.no-result')}
                description={t('page.summary.item.no-result-description')}
              />
            ) : (
              <EmptyState
                icon={<FileText />}
                title={t('page.summary.item.no-summary-item')}
                description={t('page.summary.item.empty-description')}
                actions={
                  <Link
                    to='/summary/create'
                    className={buttonStyles({ variant: 'primary' })}
                  >
                    {t('page.summary.button.write')}
                  </Link>
                }
              />
            )
          }
        />
      </div>

      {isWide && (
        <div className={s.rail}>
          <RelatedDebates title={t('page.summary.title.popular')} withMore />
        </div>
      )}
    </div>
  );
}

export default SummaryListPage;
