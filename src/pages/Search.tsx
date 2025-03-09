import BookCard from '@/components/card/BookCard';
import useDebounce from '@/hooks/useDebounce';
import { BookType } from '@/types/data';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from '@/components/base/InfiniteScroll';

const sortBys: {
  name: string;
  value: 'latest' | 'popular';
}[] = [
  {
    name: 'page.search.sort.latest',
    value: 'latest',
  },
  {
    name: 'page.search.sort.popular',
    value: 'popular',
  },
];

function Search() {
  const [books, setBooks] = useState<BookType[]>([]);
  const [bookPage, setBookPage] = useState<number>(1);
  const [bookHasMore, setBookHasMore] = useState<boolean>(true);
  const [isInLibrary, setIsInLibrary] = useState<number[]>([]);

  const [search, setSearch] = useState<string>('');
  const [sortByIdx, setSortByIdx] = useState<number>(0);
  const debouncedSearch = useDebounce(search, 500);
  const prevValueRef = useRef<{
    debouncedSearch: string;
    sortByIdx: number;
  }>({ debouncedSearch: '', sortByIdx: 0 });

  const { t } = useTranslation();

  useEffect(() => {
    if (
      prevValueRef.current.debouncedSearch === debouncedSearch &&
      prevValueRef.current.sortByIdx === sortByIdx
    )
      return;
    prevValueRef.current = { debouncedSearch, sortByIdx };
  }, [debouncedSearch, sortByIdx]);

  return (
    <div id='search-page' className='px-4! md:px-0! md:w-4/5'>
      <div className='page-container'>
        <div className='page-title'>{t('page.search.title.page')}</div>
        <div className='search-bar'>
          <FontAwesomeIcon icon={faSearch} className='search-icon' />
          <input
            className='search-input'
            type='text'
            placeholder={t('page.search.search.placeholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className='result-container'>
          <div className='sort-by-container'>
            {sortBys.map((sortBy, index) => (
              <div
                key={'sortBy' + index}
                className={'sort-by-item'}
                onClick={() => setSortByIdx(index)}
                style={
                  sortByIdx === index
                    ? {
                        color: '#000080',
                      }
                    : {}
                }
              >
                {t(sortBy.name)}
              </div>
            ))}
          </div>
          <div className='result-content-container'>
            <InfiniteScroll
              api={`books?search=${debouncedSearch}&sortby=${sortBys[sortByIdx].value}`}
              likes_api={'librarys/is_in_library'}
              itemId='isbn'
              setItems={setBooks}
              page={bookPage}
              setPage={setBookPage}
              hasMore={bookHasMore}
              setHasMore={setBookHasMore}
              likes={isInLibrary}
              setLikes={setIsInLibrary}
              hasNoItem={books.length === 0}
              hasNoItemMessage={t('page.search.item.no-book-item')}
              refreshCondition={
                debouncedSearch !== prevValueRef.current.debouncedSearch ||
                sortByIdx !== prevValueRef.current.sortByIdx
              }
              dependency={[prevValueRef]}
            >
              {books.map((book, index) => {
                return (
                  <BookCard
                    key={'book' + index}
                    book={book}
                    isInLibrary={isInLibrary.includes(book.isbn)}
                    setIsInLibrary={setIsInLibrary}
                  />
                );
              })}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
