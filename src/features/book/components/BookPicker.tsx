import { Search } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BookCover, Button, Spinner, TextField } from '@/design-system';
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue';
import { bookProviderFor, useBookSearch } from '../api';
import * as s from './BookPicker.css';

export type PickedBook = {
  isbn: number;
  title: string;
  author?: string | null;
  publisher?: string | null;
  image?: string | null;
};

type BookPickerProps = {
  label: string;
  placeholder: string;
  value: PickedBook | null;
  onChange: (book: PickedBook | null) => void;
  error?: string;
};

const bookMeta = (book: PickedBook) =>
  [book.author?.replace(/\^/g, ', '), book.publisher]
    .filter(Boolean)
    .join(' · ');

/**
 * 도서 고르기. 검색 결과를 입력칸 아래 목록으로 보여주고,
 * 고르면 표지 카드와 "변경" 버튼으로 바뀌어요.
 */
export function BookPicker({
  label,
  placeholder,
  value,
  onChange,
  error,
}: BookPickerProps) {
  const { t, i18n } = useTranslation();
  const labelId = useId();
  const [query, setQuery] = useState('');
  const debounced = useDebouncedValue(query.trim(), 400);
  const search = useBookSearch(debounced, bookProviderFor(i18n.language));
  const inputRef = useRef<HTMLInputElement>(null);
  const changeRef = useRef<HTMLButtonElement>(null);
  const focusAfterChange = useRef<'input' | 'change' | null>(null);

  // 고르거나 변경을 누른 뒤에 포커스를 알맞은 곳으로 옮겨요.
  useEffect(() => {
    if (focusAfterChange.current === 'change') changeRef.current?.focus();
    if (focusAfterChange.current === 'input') inputRef.current?.focus();
    focusAfterChange.current = null;
  }, [value]);

  if (value) {
    return (
      <div role='group' aria-labelledby={labelId} className={s.root}>
        <span id={labelId} className={s.label}>
          {label}
        </span>
        <div className={s.selected}>
          <BookCover
            title={value.title}
            author={value.author ?? undefined}
            src={value.image}
            width={40}
          />
          <span className={s.bookText}>
            <span className={s.bookTitle}>{value.title}</span>
            <span className={s.bookMeta}>{bookMeta(value)}</span>
          </span>
          <Button
            ref={changeRef}
            variant='ghost'
            size='sm'
            onClick={() => {
              focusAfterChange.current = 'input';
              onChange(null);
            }}
          >
            {t('component.book-picker.change')}
          </Button>
        </div>
      </div>
    );
  }

  const books = search.data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div className={s.root}>
      <TextField
        ref={inputRef}
        label={label}
        type='search'
        size='md'
        placeholder={placeholder}
        startIcon={<Search aria-hidden='true' />}
        value={query}
        error={error}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          // 폼이 제출되지 않게 막아요. 검색은 입력하는 대로 돼요.
          if (event.key === 'Enter') event.preventDefault();
        }}
      />
      {debounced && (
        <>
          {search.isPending && (
            <p className={s.status}>
              <Spinner
                label={t('component.base.infinite-scroll.loading')}
                showLabel
              />
            </p>
          )}
          {search.isError && !search.data && (
            <p className={s.error}>{t('component.book-picker.error')}</p>
          )}
          {search.isSuccess && books.length === 0 && (
            <p role='status' className={s.status}>
              {t('component.book-picker.empty')}
            </p>
          )}
          {books.length > 0 && (
            <ul
              aria-label={t('component.book-picker.results')}
              className={s.results}
            >
              {books.map((book) => (
                <li key={book.isbn}>
                  <button
                    type='button'
                    className={s.result}
                    onClick={() => {
                      focusAfterChange.current = 'change';
                      onChange({
                        isbn: book.isbn,
                        title: book.title,
                        author: book.author,
                        publisher: book.publisher,
                        image: book.image,
                      });
                      setQuery('');
                    }}
                  >
                    <BookCover
                      title={book.title}
                      author={book.author ?? undefined}
                      src={book.image}
                      width={36}
                    />
                    <span className={s.bookText}>
                      <span className={s.bookTitle}>{book.title}</span>
                      <span className={s.bookMeta}>{bookMeta(book)}</span>
                    </span>
                  </button>
                </li>
              ))}
              {search.hasNextPage && (
                <li>
                  <Button
                    variant='ghost'
                    size='sm'
                    fullWidth
                    loading={search.isFetchingNextPage}
                    onClick={() => void search.fetchNextPage()}
                  >
                    {t('component.book-picker.more')}
                  </Button>
                </li>
              )}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
