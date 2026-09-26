import { CalendarDays, Search } from 'lucide-react';
import {
  Chip,
  ChipGroup,
  mq,
  SegmentedControl,
  Select,
  TextField,
} from '@/design-system';
import { CATEGORY_OPTIONS } from '@/shared/categories';
import type { ListParams, SearchBy } from '@/shared/hooks/useListParams';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { useTranslation } from 'react-i18next';
import * as s from './ListFilters.css';

/** 날짜순의 가장 이른 날짜 (서비스 시작) */
const MIN_FROM_DATE = '2025-01-01';

export type ListFiltersLabels = {
  /** 구역 이름 (검색과 필터) */
  region: string;
  searchBy: string;
  bookTitle: string;
  itemTitle: string;
  search: string;
  searchPlaceholder: string;
  category: string;
  categoryAll: string;
  sort: string;
  fromDate?: string;
};

type ListFiltersProps<S extends string> = {
  params: ListParams<S>;
  labels: ListFiltersLabels;
  sortOptions: readonly { value: S; label: string }[];
};

/** 목록 위의 검색 기준·검색어, 카테고리(하나만), 정렬(+기준 날짜) */
export function ListFilters<S extends string>({
  params,
  labels,
  sortOptions,
}: ListFiltersProps<S>) {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery(mq.md);
  const chipSize = isDesktop ? 'sm' : 'md';

  return (
    <section aria-label={labels.region} className={s.filters}>
      <form
        role='search'
        aria-label={labels.search}
        className={s.searchRow}
        onSubmit={(event) => {
          event.preventDefault();
          params.submitSearch();
        }}
      >
        <Select
          label={labels.searchBy}
          hideLabel
          size='sm'
          value={params.searchBy}
          onChange={(event) =>
            params.setSearchBy(event.target.value as SearchBy)
          }
          fieldClassName={s.searchBy}
        >
          <option value='bt'>{labels.bookTitle}</option>
          <option value='it'>{labels.itemTitle}</option>
        </Select>
        <TextField
          label={labels.search}
          hideLabel
          type='search'
          size='sm'
          enterKeyHint='search'
          placeholder={labels.searchPlaceholder}
          startIcon={<Search aria-hidden='true' />}
          value={params.searchText}
          onChange={(event) => params.setSearchText(event.target.value)}
          fieldClassName={s.searchField}
        />
      </form>

      <ChipGroup
        aria-label={labels.category}
        scroll={!isDesktop}
        className={s.chips}
      >
        <Chip
          size={chipSize}
          pressed={params.category === 0}
          onPressedChange={() => params.setCategory(0)}
        >
          {labels.categoryAll}
        </Chip>
        {CATEGORY_OPTIONS.map((option) => (
          <Chip
            key={option.key}
            size={chipSize}
            pressed={params.category === option.value}
            onPressedChange={(pressed) =>
              params.setCategory(pressed ? option.value : 0)
            }
          >
            {t(option.labelKey)}
          </Chip>
        ))}
      </ChipGroup>

      <div className={s.sortRow}>
        <SegmentedControl
          aria-label={labels.sort}
          size={isDesktop ? 'md' : 'sm'}
          options={sortOptions}
          value={params.sort}
          onValueChange={params.setSort}
        />
        {params.usesDate && labels.fromDate && (
          <TextField
            label={labels.fromDate}
            hideLabel
            type='date'
            size='sm'
            min={MIN_FROM_DATE}
            startIcon={<CalendarDays aria-hidden='true' />}
            value={params.fromDate}
            onChange={(event) => {
              if (event.target.value) params.setFromDate(event.target.value);
            }}
            fieldClassName={s.dateField}
          />
        )}
      </div>
    </section>
  );
}
