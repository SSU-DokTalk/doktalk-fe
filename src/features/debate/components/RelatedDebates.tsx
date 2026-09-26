import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BookCover } from '@/design-system';
import { useFormat } from '@/shared/format';
import { usePopularDebates } from '../api';
import { placeKindText } from '../display';
import * as s from './RelatedDebates.css';

/** 상세 오른쪽 칸의 추천 토론방 (지금 보는 토론방은 빼요) */
export function RelatedDebates({ currentId }: { currentId: number }) {
  const { t } = useTranslation();
  const format = useFormat();
  const headingId = useId();
  const { data } = usePopularDebates();
  const debates = (data ?? []).filter((d) => d.id !== currentId).slice(0, 3);

  if (debates.length === 0) return null;

  return (
    <section aria-labelledby={headingId} className={s.section}>
      <h2 id={headingId} className={s.heading}>
        {t('page.debate.title.recommend')}
      </h2>
      <ul className={s.list}>
        {debates.map((debate) => {
          const meta = [
            debate.held_at && format.meetingDate(debate.held_at),
            placeKindText(debate, t),
            debate.price > 0
              ? format.price(debate.price)
              : t('page.debate.item.free'),
          ]
            .filter(Boolean)
            .join(' · ');
          return (
            <li key={debate.id} className={s.item}>
              <BookCover
                title={debate.book.title}
                src={debate.book.image}
                width={40}
              />
              <div className={s.body}>
                <Link to={`/debate/${debate.id}`} className={s.link}>
                  {debate.title}
                </Link>
                <span className={s.meta}>{meta}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
