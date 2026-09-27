import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BookCover, buttonStyles } from '@/design-system';
import { useMyLibrary } from '@/features/library/api';
import * as s from './MyLibraryRail.css';

/** 오른쪽 칸의 내 서재 요약 (로그인했을 때만) */
export function MyLibraryRail({ viewerId }: { viewerId: number }) {
  const { t } = useTranslation();
  const headingId = useId();
  const { data } = useMyLibrary(viewerId);
  if (viewerId <= 0 || !data) return null;
  const total = data.total ?? data.items.length;

  return (
    <section aria-labelledby={headingId} className={s.rail}>
      <div className={s.head}>
        <h2 id={headingId} className={s.heading}>
          {t('page.search.rail.title')}
        </h2>
        <span className={s.count}>
          {t('page.search.rail.count', { count: total })}
        </span>
      </div>
      {data.items.length > 0 ? (
        <ul className={s.covers}>
          {data.items.map((item) => (
            <li key={item.isbn}>
              <BookCover
                title={item.book.title}
                src={item.book.image}
                width={56}
                alt={item.book.title}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className={s.empty}>{t('page.search.rail.empty')}</p>
      )}
      <Link
        to='/mypage/library'
        className={buttonStyles({ variant: 'tonal', fullWidth: true })}
      >
        {t('page.search.rail.link')}
      </Link>
    </section>
  );
}
