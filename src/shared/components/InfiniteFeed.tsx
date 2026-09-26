import type { InfiniteData } from '@tanstack/react-query';
import { useId, useMemo, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, EmptyState, Spinner, visuallyHidden } from '@/design-system';
import { useLoadMoreOnScroll } from '@/shared/hooks/useLoadMoreOnScroll';
import * as s from './InfiniteFeed.css';

/** useInfiniteQuery 결과 중 목록에 필요한 부분 */
type FeedQuery<T> = {
  data: InfiniteData<{ items: T[] }> | undefined;
  refetch: () => unknown;
  hasNextPage: boolean;
  fetchNextPage: () => unknown;
  isFetchingNextPage: boolean;
  isFetchNextPageError: boolean;
  isPlaceholderData: boolean;
  isPending: boolean;
};

type InfiniteFeedProps<T> = {
  /** 목록 제목 (화면에는 숨기고 스크린 리더가 읽어요) */
  heading: string;
  query: FeedQuery<T>;
  getKey: (item: T) => number;
  renderItem: (item: T) => ReactNode;
  /** 첫 페이지를 불러오는 동안 3번 보여줄 자리 */
  renderSkeleton: () => ReactNode;
  /** 결과가 없을 때 */
  empty: ReactNode;
  errorTitle: string;
  errorDescription: string;
  errorIcon: ReactNode;
  /** rows: 흰 카드 안에 줄로(기본), cards: 글마다 따로 카드 */
  variant?: 'rows' | 'cards';
};

/**
 * 무한 스크롤 목록. 첫 로딩·오류·빈 목록·다음 페이지 로딩·다음 페이지 오류를 한곳에서 다뤄요.
 * 페이지 사이에 새 글이 생기면 같은 글이 두 번 올 수 있어서 id로 걸러요.
 */
export function InfiniteFeed<T>({
  heading,
  query,
  getKey,
  renderItem,
  renderSkeleton,
  empty,
  errorTitle,
  errorDescription,
  errorIcon,
  variant = 'rows',
}: InfiniteFeedProps<T>) {
  const { t } = useTranslation();
  const headingId = useId();
  const loadingLabel = t('component.base.infinite-scroll.loading');
  const retryLabel = t('page.debate.item.retry');
  const { data } = query;

  const items = useMemo(() => {
    const seen = new Set<number>();
    const unique: T[] = [];
    for (const page of data?.pages ?? []) {
      for (const item of page.items) {
        const key = getKey(item);
        if (seen.has(key)) continue;
        seen.add(key);
        unique.push(item);
      }
    }
    return unique;
  }, [data, getKey]);

  const loadMoreRef = useLoadMoreOnScroll({
    enabled:
      data !== undefined &&
      !query.isPlaceholderData &&
      query.hasNextPage &&
      !query.isFetchingNextPage &&
      !query.isFetchNextPageError,
    onLoadMore: () => void query.fetchNextPage(),
  });

  const renderBody = () => {
    if (query.isPending) {
      return (
        <div role='status' aria-label={loadingLabel}>
          {[0, 1, 2].map((index) => (
            <div key={index}>{renderSkeleton()}</div>
          ))}
        </div>
      );
    }

    // 다음 페이지만 실패해도 query는 error 상태예요. 불러 둔 목록이 없을 때만 오류 화면을 보여줘요.
    if (!data) {
      return (
        <EmptyState
          tone='danger'
          icon={errorIcon}
          title={errorTitle}
          description={errorDescription}
          actions={
            <Button variant='outline' onClick={() => void query.refetch()}>
              {retryLabel}
            </Button>
          }
        />
      );
    }

    if (items.length === 0) return empty;

    return (
      <>
        <ul className={variant === 'cards' ? s.cardItems : s.items}>
          {items.map((item) => (
            <li key={getKey(item)}>{renderItem(item)}</li>
          ))}
        </ul>
        <div ref={loadMoreRef} />
        {query.isFetchingNextPage && (
          <div className={s.status}>
            <Spinner label={loadingLabel} showLabel />
          </div>
        )}
        {query.isFetchNextPageError && (
          <div className={s.status}>
            <Button
              variant='outline'
              onClick={() => void query.fetchNextPage()}
            >
              {retryLabel}
            </Button>
          </div>
        )}
      </>
    );
  };

  return (
    <section
      aria-labelledby={headingId}
      aria-busy={query.isPlaceholderData || undefined}
      className={variant === 'cards' ? s.cards : s.list}
    >
      <h2 id={headingId} className={visuallyHidden}>
        {heading}
      </h2>
      {variant === 'cards' &&
      (query.isPending || !data || items.length === 0) ? (
        <div className={s.stateCard}>{renderBody()}</div>
      ) : (
        renderBody()
      )}
    </section>
  );
}
