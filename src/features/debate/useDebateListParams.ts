import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORY_OPTIONS } from '@/shared/categories';
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue';
import type { DebateListFilters, DebateSearchBy, DebateSort } from './api';

const SEARCH_DELAY = 400;

/** 오늘 (내 시간대 기준 YYYY-MM-DD) */
function today() {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

const isIsoDate = (value: string | null): value is string =>
  value !== null && /^\d{4}-\d{2}-\d{2}$/.test(value);

const isCategory = (value: number) =>
  CATEGORY_OPTIONS.some((option) => option.value === value);

/**
 * 토론방 목록의 검색·필터 상태를 주소(?q=&by=&category=&sort=&from=)에 담아요.
 * 상세로 갔다가 뒤로 오면 같은 조건과 불러 둔 목록이 그대로 보여요.
 * 기본값은 주소에 적지 않아요.
 */
export function useDebateListParams() {
  const [params, setParams] = useSearchParams();

  const categoryParam = Number(params.get('category'));
  const category = isCategory(categoryParam) ? categoryParam : 0;
  const searchBy: DebateSearchBy = params.get('by') === 'it' ? 'it' : 'bt';
  const sortParam = params.get('sort');
  const sort: DebateSort =
    sortParam === 'popular' || sortParam === 'from' ? sortParam : 'latest';
  const fromParam = params.get('from');
  const fromDate = isIsoDate(fromParam) ? fromParam : today();
  const search = params.get('q')?.trim() ?? '';

  const update = useCallback(
    (changes: Record<string, string | null>) => {
      setParams(
        (previous) => {
          const next = new URLSearchParams(previous);
          for (const [key, value] of Object.entries(changes)) {
            if (value) next.set(key, value);
            else next.delete(key);
          }
          return next;
        },
        { replace: true }
      );
    },
    [setParams]
  );

  // 입력칸은 바로 바뀌고, 주소(=검색 요청)는 입력이 멈춘 뒤에 바뀌어요.
  const [searchText, setSearchText] = useState(search);
  const syncedSearch = useRef(search);

  // 뒤로 가기처럼 바깥에서 검색어가 바뀌면 입력칸도 맞춰요.
  useEffect(() => {
    if (search === syncedSearch.current) return;
    syncedSearch.current = search;
    setSearchText(search);
  }, [search]);

  const debouncedText = useDebouncedValue(searchText.trim(), SEARCH_DELAY);
  useEffect(() => {
    if (debouncedText === syncedSearch.current) return;
    syncedSearch.current = debouncedText;
    update({ q: debouncedText || null });
  }, [debouncedText, update]);

  const submitSearch = useCallback(() => {
    const value = searchText.trim();
    if (value === syncedSearch.current) return;
    syncedSearch.current = value;
    update({ q: value || null });
  }, [searchText, update]);

  /** API 요청 조건. 검색어가 없으면 검색 기준은 캐시 키에서 빼요. */
  const filters: DebateListFilters = {
    category,
    search,
    searchBy: search ? searchBy : 'bt',
    sort,
    from: sort === 'from' ? fromDate.replace(/-/g, '.') : undefined,
  };

  return {
    filters,
    /** 조건을 하나라도 바꿨는지 (빈 목록 문구를 고를 때 써요) */
    isFiltered: category !== 0 || search !== '' || sort !== 'latest',
    category,
    searchBy,
    sort,
    fromDate,
    searchText,
    setSearchText,
    submitSearch,
    setCategory: (value: number) =>
      update({ category: value ? String(value) : null }),
    setSearchBy: (value: DebateSearchBy) =>
      update({ by: value === 'bt' ? null : value }),
    setSort: (value: DebateSort) =>
      update({
        sort: value === 'latest' ? null : value,
        from: value === 'from' ? fromDate : null,
      }),
    setFromDate: (value: string) => update({ from: value }),
  };
}
