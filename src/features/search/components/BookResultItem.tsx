import { Library } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BookCover, mq, Skeleton } from '@/design-system';
import type { BookResult } from '@/features/book/api';
import { LibraryActions } from '@/features/library/components';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { authorText, pubdateText } from '../display';
import * as s from './BookResultItem.css';

type BookResultItemProps = {
  book: BookResult;
  inLibrary: boolean;
  viewerId: number;
};

/** 도서 검색 결과 한 권 */
export function BookResultItem({
  book,
  inLibrary,
  viewerId,
}: BookResultItemProps) {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery(mq.md);
  const meta = [
    authorText(book.author),
    book.publisher,
    pubdateText(book.pubdate),
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <article className={s.item}>
      <BookCover
        className={s.cover}
        title={book.title}
        author={authorText(book.author)}
        src={book.image}
        width={isDesktop ? 96 : 72}
      />
      <div className={s.text}>
        <h2 className={s.title}>{book.title}</h2>
        {meta && <span className={s.meta}>{meta}</span>}
        {book.description && (
          <p className={s.description}>{book.description}</p>
        )}
        <span className={s.count}>
          <Library aria-hidden='true' />
          {t('page.search.library.count', { count: book.in_library_num ?? 0 })}
        </span>
      </div>
      <div className={s.actions}>
        <LibraryActions
          isbn={book.isbn}
          title={book.title}
          inLibrary={inLibrary}
          viewerId={viewerId}
        />
      </div>
    </article>
  );
}

export function BookResultSkeleton() {
  return (
    <div className={s.item} aria-hidden='true'>
      <Skeleton
        className={s.cover}
        width={72}
        height={104}
        radius='2px 5px 5px 2px'
      />
      <div className={s.text}>
        <Skeleton width='60%' height={20} />
        <Skeleton width='40%' height={14} />
        <Skeleton height={14} />
      </div>
    </div>
  );
}
