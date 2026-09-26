import { Heart } from 'lucide-react';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Avatar, Skeleton, visuallyHidden } from '@/design-system';
import { useFormat } from '@/shared/format';
import { usePopularSummaries } from '../api';
import * as s from './PopularSummaries.css';

/**
 * 오른쪽 칸의 인기 요약. 다른 목록 화면 옆에 붙여 써요.
 * 불러오지 못했거나 비어 있으면 숨겨요.
 */
export function PopularSummaries() {
  const { t } = useTranslation();
  const format = useFormat();
  const headingId = useId();
  const { data, isPending, isError } = usePopularSummaries();

  if (isError || data?.length === 0) return null;

  return (
    <section aria-labelledby={headingId} className={s.rail}>
      <div className={s.head}>
        <h2 id={headingId} className={s.heading}>
          {t('page.debate.title.popular')}
        </h2>
        <Link
          to='/summary'
          className={s.more}
          aria-label={t('page.debate.popular.more-label')}
        >
          {t('page.debate.popular.more')}
        </Link>
      </div>

      {isPending ? (
        <div
          role='status'
          aria-label={t('component.base.infinite-scroll.loading')}
          className={s.skeletons}
        >
          {[0, 1, 2].map((index) => (
            <Skeleton key={index} height={72} radius={8} />
          ))}
        </div>
      ) : (
        <ul className={s.list}>
          {data.map((summary) => {
            const author = summary.user.name || t('component.user.unknown');
            return (
              <li key={summary.id}>
                <article className={s.item}>
                  <h3 className={s.title}>
                    <Link to={`/summary/${summary.id}`} className={s.link}>
                      {summary.title}
                    </Link>
                  </h3>
                  {summary.free_content && (
                    <p className={s.preview}>{summary.free_content}</p>
                  )}
                  <p className={s.footer}>
                    <Avatar
                      name={author}
                      src={summary.user.profile}
                      size={20}
                    />
                    <span className={s.author}>{author}</span>
                    <span className={s.likes}>
                      <Heart aria-hidden='true' />
                      <span className={visuallyHidden}>
                        {t('page.debate.item.likes', {
                          count: summary.likes_num,
                        })}
                      </span>
                      <span aria-hidden='true'>
                        {format.number(summary.likes_num)}
                      </span>
                    </span>
                    <span className={s.price}>
                      {summary.price > 0
                        ? format.price(summary.price)
                        : t('page.debate.item.free')}
                    </span>
                  </p>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
