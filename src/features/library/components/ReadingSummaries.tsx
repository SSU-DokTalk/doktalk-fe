import clsx from 'clsx';
import { ChevronRight, FileText } from 'lucide-react';
import { useId, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  BookCover,
  Button,
  buttonStyles,
  EmptyState,
  Skeleton,
  visuallyHidden,
} from '@/design-system';
import { productIds, usePurchaseHistory } from '@/features/payment/api';
import { maskLanguageFor, useSummariesByIds } from '@/features/summary/api';
import * as section from '@/shared/components/Section.css';
import { useFormat } from '@/shared/format';
import * as s from './ReadingSummaries.css';

function SummariesSkeleton() {
  const { t } = useTranslation();
  return (
    <ul
      role='status'
      aria-label={t('component.base.infinite-scroll.loading')}
      className={s.grid}
    >
      {[0, 1, 2].map((index) => (
        <li key={index} className={s.card}>
          <div className={s.top}>
            <Skeleton width={64} height={93} radius={4} />
            <div className={clsx(s.text, s.grow)}>
              <Skeleton width='80%' height={18} />
              <Skeleton width='50%' height={14} />
            </div>
          </div>
          <Skeleton height={36} radius={10} />
        </li>
      ))}
    </ul>
  );
}

/**
 * 읽고 있는 요약 = 산 요약 (무료로 연 것 포함).
 * 백엔드에 산 요약 목록 API가 아직 없어서 구매 기록에서 찾아요.
 */
export function ReadingSummaries({
  viewerId,
  hideHeading = false,
}: {
  viewerId: number;
  /** 모바일 탭 안에서는 탭 이름이 제목을 대신해서 숨겨요. */
  hideHeading?: boolean;
}) {
  const { t, i18n } = useTranslation();
  const format = useFormat();
  const headingId = useId();
  const history = usePurchaseHistory(viewerId);
  const ids = useMemo(() => productIds(history.data, 'S'), [history.data]);
  const result = useSummariesByIds(ids, maskLanguageFor(i18n.language));

  /** 요약마다 가장 최근에 산 날 */
  const boughtAt = useMemo(() => {
    const dates = new Map<number, string>();
    for (const purchase of history.data ?? []) {
      if (purchase.product_type !== 'S' || dates.has(purchase.product_id)) {
        continue;
      }
      dates.set(purchase.product_id, purchase.created);
    }
    return dates;
  }, [history.data]);

  const isPending = history.isPending || (ids.length > 0 && result.isPending);

  const renderBody = () => {
    if (isPending) return <SummariesSkeleton />;
    if (history.isError) {
      return (
        <div className={s.state}>
          <EmptyState
            tone='danger'
            icon={<FileText />}
            title={t('page.profile.library.summaries-error')}
            description={t('page.profile.state.error-description')}
            actions={
              <Button variant='outline' onClick={() => void history.refetch()}>
                {t('page.debate.item.retry')}
              </Button>
            }
          />
        </div>
      );
    }
    if (result.summaries.length === 0) {
      return (
        <div className={s.state}>
          <EmptyState
            icon={<FileText />}
            title={t('page.profile.library.summaries-empty')}
            description={t('page.profile.library.summaries-empty-description')}
            actions={
              <Link
                to='/summary'
                className={buttonStyles({ variant: 'tonal' })}
              >
                {t('page.profile.library.browse-summaries')}
              </Link>
            }
          />
        </div>
      );
    }
    return (
      <>
        {result.isError && (
          <p role='status' className={s.notice}>
            {t('page.profile.library.summaries-partial-error')}
          </p>
        )}
        <ul className={s.grid}>
          {result.summaries.map((summary) => {
            const bought = boughtAt.get(summary.id);
            return (
              <li key={summary.id} className={s.card}>
                <div className={s.top}>
                  <BookCover
                    title={summary.book.title}
                    src={summary.book.image}
                    width={64}
                  />
                  <div className={s.text}>
                    <span className={s.bookTitle}>{summary.book.title}</span>
                    <span className={s.by}>
                      {t('page.profile.library.summary-by', {
                        name: summary.user.name || t('component.user.unknown'),
                      })}
                    </span>
                    {bought && (
                      <span className={s.bought}>
                        {t('page.profile.library.bought', {
                          date: format.date(bought),
                        })}
                      </span>
                    )}
                  </div>
                </div>
                <Link
                  to={`/summary/${summary.id}`}
                  aria-label={t('page.profile.library.read-label', {
                    title: summary.title,
                  })}
                  className={buttonStyles({
                    variant: 'tonal',
                    size: 'sm',
                    fullWidth: true,
                  })}
                >
                  {t('page.profile.library.read')}
                  <ChevronRight aria-hidden='true' />
                </Link>
              </li>
            );
          })}
        </ul>
      </>
    );
  };

  return (
    <section aria-labelledby={headingId} className={section.section}>
      <h2
        id={headingId}
        className={hideHeading ? visuallyHidden : section.sectionTitle}
      >
        {t('page.profile.library.summaries')}
        {!isPending && !history.isError && (
          <span className={section.sectionCount}>
            {format.number(result.summaries.length)}
          </span>
        )}
      </h2>
      {renderBody()}
    </section>
  );
}
