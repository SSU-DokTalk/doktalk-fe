import { CalendarDays, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  Chip,
  ChipGroup,
  mq,
  SegmentedControl,
  Select,
  TextField,
} from '@/design-system';
import { CATEGORY_OPTIONS } from '@/shared/categories';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import type { DebateSearchBy, DebateSort } from '../api';
import * as s from './DebateFilters.css';

/** 날짜순의 가장 이른 날짜 (서비스 시작) */
const MIN_FROM_DATE = '2025-01-01';

export type DebateFiltersProps = {
  searchBy: DebateSearchBy;
  onSearchByChange: (value: DebateSearchBy) => void;
  /** 입력 중인 검색어 */
  searchText: string;
  onSearchTextChange: (value: string) => void;
  /** Enter를 누르면 기다리지 않고 바로 검색해요. */
  onSearchSubmit: () => void;
  /** 카테고리 비트마스크 하나. 0이면 전체 */
  category: number;
  onCategoryChange: (value: number) => void;
  sort: DebateSort;
  onSortChange: (value: DebateSort) => void;
  /** 날짜순 기준 날짜 (YYYY-MM-DD) */
  fromDate: string;
  onFromDateChange: (value: string) => void;
};

/** 검색 기준·검색어, 카테고리, 정렬 */
export function DebateFilters({
  searchBy,
  onSearchByChange,
  searchText,
  onSearchTextChange,
  onSearchSubmit,
  category,
  onCategoryChange,
  sort,
  onSortChange,
  fromDate,
  onFromDateChange,
}: DebateFiltersProps) {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery(mq.md);
  const chipSize = isDesktop ? 'sm' : 'md';

  const sortOptions = [
    { value: 'latest', label: t('page.debate.sort.latest') },
    { value: 'popular', label: t('page.debate.sort.popular') },
    { value: 'from', label: t('page.debate.sort.from') },
  ] as const;

  return (
    <section aria-label={t('page.debate.filters')} className={s.filters}>
      <form
        role='search'
        aria-label={t('page.debate.search.label')}
        className={s.searchRow}
        onSubmit={(event) => {
          event.preventDefault();
          onSearchSubmit();
        }}
      >
        <Select
          label={t('page.debate.search.by')}
          hideLabel
          size='sm'
          value={searchBy}
          onChange={(event) =>
            onSearchByChange(event.target.value as DebateSearchBy)
          }
          fieldClassName={s.searchBy}
        >
          <option value='bt'>{t('page.debate.search.book-title')}</option>
          <option value='it'>{t('page.debate.search.item-title')}</option>
        </Select>
        <TextField
          label={t('page.debate.search.label')}
          hideLabel
          type='search'
          size='sm'
          enterKeyHint='search'
          placeholder={t('page.debate.search.placeholder')}
          startIcon={<Search aria-hidden='true' />}
          value={searchText}
          onChange={(event) => onSearchTextChange(event.target.value)}
          fieldClassName={s.searchField}
        />
      </form>

      <ChipGroup
        aria-label={t('page.debate.category-label')}
        scroll={!isDesktop}
        className={s.chips}
      >
        <Chip
          size={chipSize}
          pressed={category === 0}
          onPressedChange={() => onCategoryChange(0)}
        >
          {t('page.debate.category-all')}
        </Chip>
        {CATEGORY_OPTIONS.map((option) => (
          <Chip
            key={option.key}
            size={chipSize}
            pressed={category === option.value}
            onPressedChange={(pressed) =>
              onCategoryChange(pressed ? option.value : 0)
            }
          >
            {t(option.labelKey)}
          </Chip>
        ))}
      </ChipGroup>

      <div className={s.sortRow}>
        <SegmentedControl
          aria-label={t('page.debate.sort.label')}
          size={isDesktop ? 'md' : 'sm'}
          options={sortOptions}
          value={sort}
          onValueChange={onSortChange}
        />
        {sort === 'from' && (
          <TextField
            label={t('page.debate.sort.from-date')}
            hideLabel
            type='date'
            size='sm'
            min={MIN_FROM_DATE}
            startIcon={<CalendarDays aria-hidden='true' />}
            value={fromDate}
            onChange={(event) => {
              if (event.target.value) onFromDateChange(event.target.value);
            }}
            fieldClassName={s.dateField}
          />
        )}
      </div>
    </section>
  );
}
