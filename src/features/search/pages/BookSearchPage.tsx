import { BookSearch, SearchX, X } from 'lucide-react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import {
  Button,
  EmptyState,
  IconButton,
  mq,
  SegmentedControl,
  TextField,
} from '@/design-system';
import {
  bookProviderFor,
  useBookSearchPage,
  type BookResult,
  type BookSort,
} from '@/features/book/api';
import { InfiniteFeed } from '@/shared/components/InfiniteFeed';
import * as page from '@/shared/components/ListPage.css';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { useQueryParam } from '@/shared/hooks/useQueryParam';
import { useAuth } from '@/shell/hooks';
import {
  BookResultItem,
  BookResultSkeleton,
} from '../components/BookResultItem';
import { MyLibraryRail } from '../components/MyLibraryRail';
import * as s from './SearchPage.css';

/** 도서 검색 (/search?q=&sort=) */
function BookSearchPage() {
  const { t, i18n } = useTranslation();
  const isWide = useMediaQuery(mq.xl);
  const { user, isLoggedIn } = useAuth();
  const viewerId = isLoggedIn ? (user.id ?? 0) : 0;
  const search = useQueryParam('q');
  const [params, setParams] = useSearchParams();
  const sort: BookSort =
    params.get('sort') === 'popular' ? 'popular' : 'latest';

  const query = useBookSearchPage(
    search.value,
    bookProviderFor(i18n.language),
    sort,
    viewerId
  );

  useDocumentTitle(t('page.search.title.page'));

  const inLibrary = new Set(query.data?.pages.flatMap((p) => p.inLibrary));
  const total = query.data?.pages[0]?.total ?? 0;
  const getKey = useCallback((book: BookResult) => book.isbn, []);

  return (
    <div className={page.page}>
      <div className={page.content}>
        <div className={page.header}>
          <div className={page.titles}>
            <h1 className={page.title}>{t('page.search.title.page')}</h1>
            <p className={page.subtitle}>{t('page.search.subtitle')}</p>
          </div>
        </div>

        <form
          role='search'
          aria-label={t('page.search.label')}
          className={s.searchForm}
          onSubmit={(event) => {
            event.preventDefault();
            search.submit();
          }}
        >
          <TextField
            label={t('page.search.label')}
            hideLabel
            type='search'
            size='lg'
            enterKeyHint='search'
            placeholder={t('page.search.search.placeholder')}
            startIcon={<BookSearch aria-hidden='true' />}
            value={search.text}
            onChange={(event) => search.setText(event.target.value)}
            endSlot={
              search.text ? (
                <IconButton
                  size='sm'
                  aria-label={t('page.search.clear')}
                  onClick={search.clear}
                >
                  <X />
                </IconButton>
              ) : undefined
            }
            fieldClassName={s.searchField}
          />
          <Button type='submit' size='lg'>
            {t('page.search.submit')}
          </Button>
        </form>

        {search.value ? (
          <>
            <div className={s.resultBar}>
              <p className={s.resultCount} role='status'>
                {query.isSuccess &&
                  t('page.search.result-count', {
                    query: search.value,
                    count: total,
                  })}
              </p>
              <SegmentedControl
                aria-label={t('page.search.sort-label')}
                on='canvas'
                options={[
                  { value: 'latest', label: t('page.search.sort.latest') },
                  { value: 'popular', label: t('page.search.sort.popular') },
                ]}
                value={sort}
                onValueChange={(value) =>
                  setParams(
                    (prev) => {
                      const next = new URLSearchParams(prev);
                      if (value === 'latest') next.delete('sort');
                      else next.set('sort', value);
                      return next;
                    },
                    { replace: true }
                  )
                }
              />
            </div>
            <InfiniteFeed
              heading={t('page.search.results')}
              query={query}
              getKey={getKey}
              renderItem={(book) => (
                <BookResultItem
                  book={book}
                  inLibrary={inLibrary.has(book.isbn)}
                  viewerId={viewerId}
                />
              )}
              renderSkeleton={() => <BookResultSkeleton />}
              errorIcon={<BookSearch />}
              errorTitle={t('page.search.item.error')}
              errorDescription={t('page.debate.item.error-description')}
              empty={
                <EmptyState
                  icon={<SearchX />}
                  title={t('page.search.item.no-book-item')}
                  description={t('page.search.item.no-result-description')}
                />
              }
            />
          </>
        ) : (
          <div className={page.content}>
            <EmptyState
              icon={<BookSearch />}
              title={t('page.search.item.search-prompt')}
              description={t('page.search.subtitle')}
            />
          </div>
        )}
      </div>

      {isWide && viewerId > 0 && (
        <div className={page.rail}>
          <MyLibraryRail viewerId={viewerId} />
        </div>
      )}
    </div>
  );
}

export default BookSearchPage;
