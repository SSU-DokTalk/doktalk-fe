import { useId, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { BookCover } from '@/design-system';
import * as s from './CoverRailList.css';

export type CoverRailItem = {
  key: number | string;
  to: string;
  title: string;
  cover: { title: string; author?: string | null; src?: string | null };
  meta?: ReactNode;
};

type CoverRailListProps = {
  title: string;
  items: CoverRailItem[];
  /** 제목 옆 "더보기" 링크 */
  more?: { to: string; label: string; ariaLabel?: string };
};

/** 오른쪽 칸의 작은 표지 목록 (추천 토론방, 인기 요약 등). 비어 있으면 숨겨요. */
export function CoverRailList({ title, items, more }: CoverRailListProps) {
  const headingId = useId();
  if (items.length === 0) return null;

  return (
    <section aria-labelledby={headingId} className={s.section}>
      <div className={s.head}>
        <h2 id={headingId} className={s.heading}>
          {title}
        </h2>
        {more && (
          <Link to={more.to} aria-label={more.ariaLabel} className={s.more}>
            {more.label}
          </Link>
        )}
      </div>
      <ul className={s.list}>
        {items.map((item) => (
          <li key={item.key} className={s.item}>
            <BookCover
              title={item.cover.title}
              author={item.cover.author ?? undefined}
              src={item.cover.src}
              width={40}
            />
            <div className={s.body}>
              <Link to={item.to} className={s.link}>
                {item.title}
              </Link>
              {item.meta && <span className={s.meta}>{item.meta}</span>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
