import { BookOpen, ChevronDown, Plus, X } from 'lucide-react';
import {
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  BookCover,
  Button,
  buttonStyles,
  EmptyState,
  IconButton,
  mq,
  Skeleton,
  visuallyHidden,
} from '@/design-system';
import { authorText } from '@/features/search/display';
import { useFormat } from '@/shared/format';
import * as section from '@/shared/components/Section.css';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import {
  LIBRARY_PAGE_SIZE,
  useLibraryBooks,
  useRemoveFromLibrary,
} from '../api';
import * as s from './LibraryShelf.css';

type LibraryShelfProps = {
  userId: number;
  /** 내 서재면 편집(빼기)과 모바일 '책 담기' 칸을 보여줘요. */
  editable: boolean;
  /** 모바일 탭 안에서는 탭 이름이 제목을 대신해서 숨겨요. */
  hideHeading?: boolean;
};

function ShelfSkeleton() {
  const { t } = useTranslation();
  return (
    <ul
      role='status'
      aria-label={t('component.base.infinite-scroll.loading')}
      className={s.grid}
    >
      {Array.from({ length: 6 }, (_, index) => (
        <li key={index} className={s.book}>
          <Skeleton height='auto' radius={4} className={s.coverSkeleton} />
          <Skeleton width='80%' height={16} />
          <Skeleton width='50%' height={12} />
        </li>
      ))}
    </ul>
  );
}

/** 읽고 있는 책 (서재). 최근에 담은 순으로 24권씩 보여줘요. */
export function LibraryShelf({
  userId,
  editable,
  hideHeading = false,
}: LibraryShelfProps) {
  const { t } = useTranslation();
  const format = useFormat();
  const isDesktop = useMediaQuery(mq.md);
  const headingId = useId();
  const query = useLibraryBooks(userId);
  const remove = useRemoveFromLibrary(userId);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [removeError, setRemoveError] = useState(false);
  const removeButtons = useRef(new Map<number, HTMLButtonElement>());
  const editButton = useRef<HTMLButtonElement>(null);
  /** 빼는 중인 책과, 그 뒤에 포커스를 옮길 옆 책 */
  const pendingFocus = useRef<{ removed: number; next?: number } | null>(null);

  const books = useMemo(
    () => query.data?.pages.flatMap((page) => page.items) ?? [],
    [query.data]
  );
  const total = query.data?.pages[0]?.total ?? books.length;
  const remaining = Math.max(0, total - books.length);

  // 빠진 책의 버튼이 사라지면 포커스가 길을 잃어서, 목록에서 빠진 뒤 옆 책의 빼기 버튼으로 옮겨요.
  useLayoutEffect(() => {
    const pending = pendingFocus.current;
    if (!pending || books.some((item) => item.isbn === pending.removed)) {
      return;
    }
    pendingFocus.current = null;
    const target =
      pending.next !== undefined
        ? removeButtons.current.get(pending.next)
        : undefined;
    (target ?? editButton.current)?.focus();
  }, [books]);

  const handleRemove = (isbn: number, title: string) => {
    const index = books.findIndex((item) => item.isbn === isbn);
    const next = books[index + 1] ?? books[index - 1];
    pendingFocus.current = { removed: isbn, next: next?.isbn };
    setRemoveError(false);
    remove.mutate(isbn, {
      onSuccess: () => setMessage(t('page.profile.library.removed', { title })),
      onError: () => setRemoveError(true),
    });
  };

  const heading = (
    <h2
      id={headingId}
      className={hideHeading ? visuallyHidden : section.sectionTitle}
    >
      {t('page.profile.library.books')}
      {query.data && (
        <span className={section.sectionCount}>{format.number(total)}</span>
      )}
    </h2>
  );

  let body: ReactNode;
  if (query.isPending) {
    body = <ShelfSkeleton />;
  } else if (!query.data) {
    body = (
      <div className={s.state}>
        <EmptyState
          tone='danger'
          icon={<BookOpen />}
          title={t('page.profile.library.error')}
          description={t('page.profile.state.error-description')}
          actions={
            <Button variant='outline' onClick={() => void query.refetch()}>
              {t('page.debate.item.retry')}
            </Button>
          }
        />
      </div>
    );
  } else if (books.length === 0) {
    body = (
      <div className={s.state}>
        {editable ? (
          <EmptyState
            icon={<BookOpen />}
            title={t('page.profile.library.empty')}
            description={t('page.profile.library.empty-description')}
            actions={
              <Link
                to='/search'
                className={buttonStyles({ variant: 'primary' })}
              >
                {t('page.mypage.library.go-to-search')}
              </Link>
            }
          />
        ) : (
          <EmptyState
            icon={<BookOpen />}
            title={t('page.profile.library.empty-user')}
          />
        )}
      </div>
    );
  } else {
    body = (
      <>
        {removeError && (
          <p role='alert' className={s.error}>
            {t('page.profile.library.remove-error')}
          </p>
        )}
        <ul className={s.grid}>
          {editable && !isDesktop && (
            <li>
              <Link to='/search' className={s.addTile}>
                <span className={s.addBox}>
                  <span aria-hidden='true' className={s.addIcon}>
                    <Plus />
                  </span>
                  {t('page.profile.library.add')}
                </span>
                <span className={s.addHint}>
                  {t('page.profile.library.add-hint')}
                </span>
              </Link>
            </li>
          )}
          {books.map((item) => {
            const author = authorText(item.book.author);
            return (
              <li key={item.isbn} className={s.book}>
                <BookCover
                  title={item.book.title}
                  author={author || undefined}
                  src={item.book.image}
                  width='fill'
                >
                  {editing && (
                    <IconButton
                      ref={(node) => {
                        if (node) removeButtons.current.set(item.isbn, node);
                        else removeButtons.current.delete(item.isbn);
                      }}
                      variant='overlay'
                      size='md'
                      aria-label={t('page.profile.library.remove', {
                        title: item.book.title,
                      })}
                      className={s.remove}
                      onClick={() => handleRemove(item.isbn, item.book.title)}
                    >
                      <X />
                    </IconButton>
                  )}
                </BookCover>
                <span className={s.bookText}>
                  <span className={s.bookTitle}>{item.book.title}</span>
                  {author && <span className={s.bookAuthor}>{author}</span>}
                </span>
              </li>
            );
          })}
        </ul>
        {remaining > 0 && (
          <div className={section.moreRow}>
            <Button
              variant='ghost'
              loading={query.isFetchingNextPage}
              endIcon={<ChevronDown aria-hidden='true' />}
              onClick={() => void query.fetchNextPage()}
            >
              {t('page.profile.library.more', {
                count: Math.min(remaining, LIBRARY_PAGE_SIZE),
              })}
            </Button>
          </div>
        )}
      </>
    );
  }

  return (
    <section aria-labelledby={headingId} className={section.section}>
      <div className={s.head}>
        {heading}
        {hideHeading && (
          <span className={s.sortNote}>{t('page.profile.library.recent')}</span>
        )}
        {editable && books.length > 0 && (
          <Button
            ref={editButton}
            variant='ghost'
            size='sm'
            onClick={() => setEditing((value) => !value)}
          >
            {editing
              ? t('page.profile.library.done')
              : t('page.profile.library.edit')}
          </Button>
        )}
      </div>
      {body}
      <p role='status' className={visuallyHidden}>
        {message}
      </p>
    </section>
  );
}
