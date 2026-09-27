import clsx from 'clsx';
import { ChevronRight, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Badge,
  BookCover,
  mq,
  Skeleton,
  visuallyHidden,
} from '@/design-system';
import { maskLanguageFor, usePopularSummaries } from '@/features/summary/api';
import { bookLine } from '@/features/summary/display';
import type { Summary } from '@/shared/api/models';
import { categoryText } from '@/shared/categories';
import { useFormat } from '@/shared/format';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import * as shell from '@/shell/shell.css';
import * as s from './PopularSummariesSection.css';
import * as landing from './Landing.css';

function Price({ summary }: { summary: Summary }) {
  const { t } = useTranslation();
  const format = useFormat();
  if (summary.price <= 0) {
    return (
      <Badge tone='info' size='md'>
        {t('component.stats.free')}
      </Badge>
    );
  }
  return <span className={s.rowPrice}>{format.price(summary.price)}</span>;
}

function TopSummary({ summary }: { summary: Summary }) {
  const { t } = useTranslation();
  const format = useFormat();
  const isDesktop = useMediaQuery(mq.md);
  const category = categoryText(summary.category, t);
  const preview = summary.free_content?.trim();

  return (
    <Link to={`/summary/${summary.id}`} className={s.top}>
      <BookCover
        title={summary.book.title}
        author={summary.book.author?.replace(/\^/g, ', ')}
        src={summary.book.image}
        width={isDesktop ? 150 : 96}
      />
      <span className={s.topBody}>
        <span className={s.rankRow}>
          <span className={s.rankBadge}>
            <span aria-hidden='true'>1</span>
            <span className={visuallyHidden}>
              {t('page.home.summaries.rank', { rank: 1 })}
            </span>
          </span>
          {category && <span className={s.category}>{category}</span>}
        </span>
        <span className={s.topTitle}>{summary.title}</span>
        <span className={s.bookLine}>{bookLine(summary.book)}</span>
        {preview && <span className={s.excerpt}>{preview}</span>}
        <span className={s.topFoot}>
          {summary.price > 0 ? (
            <span className={s.price}>
              <Lock aria-hidden='true' className={s.lockIcon} />
              {format.price(summary.price)}
            </span>
          ) : (
            <Badge tone='info' size='md'>
              {t('component.stats.free')}
            </Badge>
          )}
          <span className={s.fakeButton}>
            {t('page.home.summaries.preview')}
          </span>
        </span>
      </span>
    </Link>
  );
}

function SectionSkeleton() {
  const { t } = useTranslation();
  return (
    <div
      role='status'
      aria-label={t('component.base.infinite-scroll.loading')}
      className={s.layout}
    >
      <Skeleton height={260} radius={24} />
      <div className={s.list}>
        {[0, 1, 2].map((index) => (
          <Skeleton key={index} height={108} radius={16} />
        ))}
      </div>
    </div>
  );
}

/** 많이 읽는 요약: 1위는 크게, 2~4위는 순위 목록으로 */
export function PopularSummariesSection() {
  const { t, i18n } = useTranslation();
  const { data, isPending, isError } = usePopularSummaries(
    maskLanguageFor(i18n.language)
  );

  if (isError || (!isPending && (data ?? []).length === 0)) return null;
  const [first, ...rest] = data ?? [];

  return (
    <div className={landing.band}>
      <section
        aria-labelledby='home-popular-summaries'
        className={clsx(shell.container, landing.section)}
      >
        <div className={landing.sectionHead}>
          <div className={landing.sectionTitles}>
            <h2 id='home-popular-summaries' className={landing.sectionTitle}>
              {t('page.home.summaries.title')}
            </h2>
            <p className={landing.sectionDescription}>
              {t('page.home.summaries.description')}
            </p>
          </div>
          <Link
            to='/summary?sort=popular'
            aria-label={t('page.home.summaries.see-all')}
            className={landing.seeAll}
          >
            {t('page.home.see-all')}
            <ChevronRight aria-hidden='true' className={landing.seeAllIcon} />
          </Link>
        </div>

        {isPending || !first ? (
          <SectionSkeleton />
        ) : (
          <div className={s.layout}>
            <TopSummary summary={first} />
            {rest.length > 0 && (
              <ol start={2} className={s.list}>
                {rest.slice(0, 3).map((summary, index) => (
                  <li key={summary.id}>
                    <Link to={`/summary/${summary.id}`} className={s.row}>
                      <span className={s.rank}>
                        <span aria-hidden='true'>{index + 2}</span>
                        <span className={visuallyHidden}>
                          {t('page.home.summaries.rank', { rank: index + 2 })}
                        </span>
                      </span>
                      <BookCover
                        title={summary.book.title}
                        src={summary.book.image}
                        width={56}
                      />
                      <span className={s.rowText}>
                        <span className={s.rowTitle}>{summary.title}</span>
                        <span className={s.rowMeta}>
                          {bookLine(summary.book)}
                        </span>
                      </span>
                      <Price summary={summary} />
                    </Link>
                  </li>
                ))}
              </ol>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
