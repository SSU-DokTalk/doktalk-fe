import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { MenuItem, Popper, Paper, ClickAwayListener } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { BookType, DebateType, SummaryType } from '@/types/data';
import { useTranslation } from 'react-i18next';
import useDebounce from '@/hooks/useDebounce';
import InfiniteScroll from '@/components/base/InfiniteScroll';
import BookSearchResult from '@/components/base/BookSearchResult';

function BookSearchDropdown({
  setBookIsbnData,
  bookTitle = '',
}: {
  setBookIsbnData:
    | Dispatch<SetStateAction<DebateType>>
    | Dispatch<SetStateAction<SummaryType>>;
  bookTitle?: string;
}): React.ReactNode {
  const [bookQuery, setBookQuery] = useState('');

  const debouncedSearch = useDebounce(bookQuery, 500);
  const prevValueRef = useRef<{
    debouncedSearch: string;
  }>({ debouncedSearch: '' });

  const [books, setBooks] = useState<BookType[]>([]);
  const [bookPage, setBookPage] = useState<number>(1);
  const [bookHasMore, setBookHasMore] = useState<boolean>(true);

  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const apiProvider =
    localStorage.getItem('lang') === 'us' ? 'google' : 'naver';

  useEffect(() => {
    setBookQuery(bookTitle);
  }, [bookTitle]);

  useEffect(() => {
    if (prevValueRef.current.debouncedSearch === debouncedSearch) return;
    prevValueRef.current = { debouncedSearch };
  }, [debouncedSearch]);

  return (
    <>
      <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
        <div className='book-dropdown grow'>
          <div className='input-box'>
            <input
              id='book'
              type='text'
              placeholder='토론할 도서를 검색해주세요'
              value={bookQuery}
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
              }}
              onChange={(e) => {
                setBookQuery(e.target.value);
              }}
              className='placeholder:text-base'
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>

          <Popper
            className='book-dropdown-menu'
            open={open}
            anchorEl={anchorEl}
            onBlur={() => setAnchorEl(null)}
            disablePortal
            placement='bottom'
            modifiers={[
              {
                name: 'flip',
                enabled: false,
              },
              {
                name: 'preventOverflow',
                enabled: false,
              },
            ]}
          >
            <Paper sx={{ maxHeight: 400, overflow: 'auto' }}>
              <InfiniteScroll
                api={`books?search=${debouncedSearch}&sortby=latest&api_provider=${apiProvider}`}
                likes_api={'librarys/is_in_library'}
                itemId='isbn'
                setItems={setBooks}
                page={bookPage}
                setPage={setBookPage}
                hasMore={bookHasMore}
                setHasMore={setBookHasMore}
                hasNoItem={books.length === 0}
                hasNoItemMessage={t('page.search.item.no-book-item')}
                refreshCondition={
                  debouncedSearch !== prevValueRef.current.debouncedSearch
                }
                dependency={[prevValueRef]}
              >
                {books.map((book, index) => (
                  <MenuItem
                    key={'book' + index}
                    className='book-thumbnail'
                    onClick={() => {
                      setBookQuery(book.title);
                      setBookIsbnData((prev: any) => {
                        return { ...prev, isbn: book.isbn };
                      });
                      setAnchorEl(null);
                    }}
                  >
                    <BookSearchResult book={book} />
                  </MenuItem>
                ))}
              </InfiniteScroll>
            </Paper>
          </Popper>
        </div>
      </ClickAwayListener>
    </>
  );
}

export default BookSearchDropdown;
