import clsx from 'clsx';
import { ChevronRight, MessagesSquare } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { EmptyState, mq, SegmentedControl } from '@/design-system';
import { CategoryChips } from '@/shared/components/CategoryChips';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import * as shell from '@/shell/shell.css';
import { useOpenDebates, type OpenDebateSort } from '../../useOpenDebates';
import { DebateTile, DebateTileSkeleton } from './DebateTile';
import * as tile from './DebateTile.css';
import * as s from './Landing.css';

const VISIBLE = 4;

/** 목록 화면으로 넘길 주소 (카테고리·정렬 유지) */
function listPath(category: number, sort: OpenDebateSort) {
  const params = new URLSearchParams();
  if (category) params.set('category', String(category));
  if (sort === 'popular') params.set('sort', 'popular');
  const query = params.toString();
  return query ? `/debate?${query}` : '/debate';
}

/** 모집 중인 토론방: 카테고리·정렬을 바꿔 가며 4개씩 보여줘요. */
export function OpenDebates() {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery(mq.md);
  const [category, setCategory] = useState(0);
  const [sort, setSort] = useState<OpenDebateSort>('latest');
  const { query, debates, recent } = useOpenDebates(category, sort);
  // 모집 중인 토론방이 없으면 최근 토론방(끝난 모임 표시)으로 채워요.
  const showingOpen = debates.length > 0 || recent.length === 0;
  const shown = showingOpen ? debates : recent;

  // 불러오지 못하면 첫 화면에서는 구역을 숨겨요 (목록 화면에서 다시 시도할 수 있어요).
  if (query.isError && !query.data) return null;

  const renderGrid = () => {
    if (query.isPending) {
      return (
        <ul
          className={tile.grid}
          role='status'
          aria-label={t('component.base.infinite-scroll.loading')}
        >
          {Array.from({ length: VISIBLE }, (_, index) => (
            <li key={index} className={tile.item}>
              <DebateTileSkeleton />
            </li>
          ))}
        </ul>
      );
    }
    if (shown.length === 0) {
      return (
        <div className={s.state}>
          <EmptyState
            icon={<MessagesSquare />}
            title={t('page.home.debates.empty')}
            description={t('page.home.debates.empty-description')}
          />
        </div>
      );
    }
    return (
      <ul
        className={tile.grid}
        aria-busy={query.isPlaceholderData || undefined}
      >
        {shown.slice(0, VISIBLE).map((debate) => (
          <li key={debate.id} className={tile.item}>
            <DebateTile debate={debate} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section
      aria-labelledby='home-open-debates'
      className={clsx(shell.container, s.section)}
    >
      <div className={s.sectionHead}>
        <div className={s.sectionTitles}>
          <h2 id='home-open-debates' className={s.sectionTitle}>
            {t(
              showingOpen
                ? 'page.home.debates.title'
                : 'page.home.debates.recent-title'
            )}
          </h2>
          <p className={s.sectionDescription}>
            {t(
              showingOpen
                ? 'page.home.debates.description'
                : 'page.home.debates.recent-description'
            )}
          </p>
        </div>
        <div className={s.sectionTools}>
          <SegmentedControl
            aria-label={t('page.home.debates.sort-label')}
            size={isDesktop ? 'md' : 'sm'}
            options={[
              { value: 'latest', label: t('page.debate.sort.latest') },
              { value: 'popular', label: t('page.debate.sort.popular') },
              { value: 'soonest', label: t('page.home.debates.soonest') },
            ]}
            value={sort}
            onValueChange={setSort}
          />
          <Link
            to={listPath(category, sort)}
            aria-label={t('page.home.debates.see-all')}
            className={s.seeAll}
          >
            {t('page.home.see-all')}
            <ChevronRight aria-hidden='true' className={s.seeAllIcon} />
          </Link>
        </div>
      </div>

      <CategoryChips
        value={category}
        onChange={setCategory}
        label={t('page.debate.category-label')}
        allLabel={t('page.debate.category-all')}
        size='md'
        scroll={!isDesktop}
      />

      {renderGrid()}
    </section>
  );
}
