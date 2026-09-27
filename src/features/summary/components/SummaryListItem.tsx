import { Heart, Lock, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import {
  Avatar,
  Badge,
  BookCover,
  coverRatio,
  Skeleton,
} from '@/design-system';
import type { Summary } from '@/shared/api/models';
import { categoryText } from '@/shared/categories';
import * as s from '@/shared/components/FeedItem.css';
import { parseServerDate, useFormat } from '@/shared/format';
import { bookLine } from '../display';
import { Stat } from '@/shared/components/Stat';

type SummaryListItemProps = {
  summary: Summary;
  coverWidth: number;
};

/** 요약 목록의 한 줄. 카드 어디를 눌러도 상세로 가요. */
export function SummaryListItem({ summary, coverWidth }: SummaryListItemProps) {
  const { t } = useTranslation();
  const format = useFormat();
  const location = useLocation();
  const author = summary.user.name || t('component.user.unknown');
  const category = categoryText(summary.category, t);
  const preview = summary.free_content?.trim();

  return (
    <article className={`${s.item} ${s.metaFirst}`}>
      <h3 className={s.title}>
        <Link
          to={`/summary/${summary.id}`}
          state={{ from: location.pathname + location.search }}
          className={s.link}
        >
          {summary.title}
        </Link>
      </h3>

      <div className={s.header}>
        <span className={s.host}>
          <Avatar name={author} src={summary.user.profile} size={24} />
          <span className={s.hostName}>{author}</span>
          <time
            dateTime={parseServerDate(summary.created).toISOString()}
            className={s.time}
          >
            {format.relativeTime(summary.created)}
          </time>
        </span>
        {category && <p className={s.category}>{category}</p>}
      </div>

      {preview && <p className={s.body}>{preview}</p>}
      <p className={s.metaText}>{bookLine(summary.book)}</p>

      <p className={s.stats}>
        <Stat
          icon={Heart}
          label={t('component.stats.likes', { count: summary.likes_num })}
        >
          {format.number(summary.likes_num)}
        </Stat>
        <Stat
          icon={MessageCircle}
          label={t('component.stats.comments', { count: summary.comments_num })}
        >
          {format.number(summary.comments_num)}
        </Stat>
        <span className={s.priceSlot}>
          {summary.price > 0 ? (
            <span className={s.priceText}>
              <Lock aria-hidden='true' />
              {format.price(summary.price)}
            </span>
          ) : (
            <Badge tone='info' size='md'>
              {t('component.stats.free')}
            </Badge>
          )}
        </span>
      </p>

      <BookCover
        className={s.cover}
        title={summary.book.title}
        author={summary.book.author ?? undefined}
        src={summary.book.image}
        width={coverWidth}
      />
    </article>
  );
}

export function SummaryListItemSkeleton({
  coverWidth,
}: {
  coverWidth: number;
}) {
  return (
    <div className={s.item} aria-hidden='true'>
      <span className={s.header}>
        <span className={s.host}>
          <Skeleton width={24} height={24} radius='50%' />
          <Skeleton width={96} height={12} />
        </span>
      </span>
      <span className={s.title}>
        <Skeleton width='72%' height={18} />
      </span>
      <span className={s.metaText}>
        <Skeleton width='40%' height={12} />
      </span>
      <span className={s.stats}>
        <Skeleton width={120} height={12} />
      </span>
      <Skeleton
        className={s.cover}
        width={coverWidth}
        height={Math.round(coverWidth * coverRatio)}
        radius='2px 5px 5px 2px'
      />
    </div>
  );
}
