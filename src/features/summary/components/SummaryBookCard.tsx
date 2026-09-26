import { BookmarkCheck, BookmarkPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BookCover, Button } from '@/design-system';
import type { Summary } from '@/shared/api/models';
import { useInLibrary, useToggleLibrary } from '@/features/library/api';
import * as s from './SummaryDetail.css';

/** 요약한 책 + 내 서재에 담기 */
export function SummaryBookCard({
  book,
  viewerId,
}: {
  book: Summary['book'];
  viewerId: number;
}) {
  const { t } = useTranslation();
  const inLibrary = useInLibrary(book.isbn, viewerId);
  const toggle = useToggleLibrary(viewerId);
  const added = inLibrary.data === true;

  return (
    <div className={s.book}>
      <BookCover
        title={book.title}
        author={book.author ?? undefined}
        src={book.image}
        width={72}
      />
      <div className={s.bookText}>
        <span className={s.bookLabel}>
          {t('page.summary-detail.book-label')}
        </span>
        <span className={s.bookTitle}>{book.title}</span>
        {book.author && (
          <span className={s.bookAuthor}>
            {[book.author.replace(/\^/g, ', '), book.publisher]
              .filter(Boolean)
              .join(' · ')}
          </span>
        )}
      </div>
      {viewerId > 0 && (
        <Button
          variant={added ? 'tonal' : 'outline'}
          size='sm'
          aria-pressed={added}
          disabled={inLibrary.isPending || toggle.isPending}
          onClick={() => toggle.mutate({ isbn: book.isbn, add: !added })}
        >
          {added ? (
            <BookmarkCheck aria-hidden='true' />
          ) : (
            <BookmarkPlus aria-hidden='true' />
          )}
          {t('page.summary-detail.library.add')}
        </Button>
      )}
      {toggle.isError && (
        <p role='alert' className={s.alert}>
          {t('page.summary-detail.library.error')}
        </p>
      )}
    </div>
  );
}
