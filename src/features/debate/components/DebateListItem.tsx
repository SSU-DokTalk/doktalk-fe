import { Heart, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Badge,
  BookCover,
  Skeleton,
  visuallyHidden,
} from '@/design-system';
import type { Debate } from '@/shared/api/models';
import { parseServerDate, useFormat } from '@/shared/format';
import { categoryText, placeText } from '../display';
import * as s from './DebateListItem.css';

type DebateListItemProps = {
  debate: Debate;
  /** 표지 너비(px). 스타일과 맞춰 COVER_WIDTH 값을 넘겨요. */
  coverWidth: number;
};

/** 토론방 목록의 한 줄. 카드 어디를 눌러도 상세로 가요. */
export function DebateListItem({ debate, coverWidth }: DebateListItemProps) {
  const { t } = useTranslation();
  const format = useFormat();

  const hostName = debate.user.name || t('component.user.unknown');
  const category = categoryText(debate.category, t);
  const place = placeText(debate, t);
  const content = debate.content?.trim();

  const meta = [
    debate.held_at && (
      <time key='when' dateTime={parseServerDate(debate.held_at).toISOString()}>
        {format.meetingDateTime(debate.held_at)}
      </time>
    ),
    place,
    debate.limit > 0 && t('page.debate.item.limit', { count: debate.limit }),
  ].filter(Boolean);

  return (
    <article className={s.item}>
      <h3 className={s.title}>
        <Link to={`/debate/${debate.id}`} className={s.link}>
          {debate.title}
        </Link>
      </h3>

      <div className={s.header}>
        <span className={s.host}>
          <Avatar name={hostName} src={debate.user.profile} size={24} />
          <span className={s.hostName}>{hostName}</span>
          <time
            dateTime={parseServerDate(debate.created).toISOString()}
            className={s.time}
          >
            {format.relativeTime(debate.created)}
          </time>
        </span>
        {category && <p className={s.category}>{category}</p>}
      </div>

      {content && <p className={s.body}>{content}</p>}

      {meta.length > 0 && (
        <ul className={s.meta}>
          {meta.map((node, index) => (
            <li key={index} className={s.metaItem}>
              {node}
            </li>
          ))}
        </ul>
      )}

      <p className={s.stats}>
        <span className={s.stat}>
          <Heart aria-hidden='true' />
          <span className={visuallyHidden}>
            {t('page.debate.item.likes', { count: debate.likes_num })}
          </span>
          <span aria-hidden='true'>{format.number(debate.likes_num)}</span>
        </span>
        <span className={s.stat}>
          <MessageCircle aria-hidden='true' />
          <span className={visuallyHidden}>
            {t('page.debate.item.comments', { count: debate.comments_num })}
          </span>
          <span aria-hidden='true'>{format.number(debate.comments_num)}</span>
        </span>
        <span className={s.priceSlot}>
          {debate.price > 0 ? (
            <span className={s.priceText}>{format.price(debate.price)}</span>
          ) : (
            <Badge tone='info' size='md'>
              {t('page.debate.item.free')}
            </Badge>
          )}
        </span>
      </p>

      <BookCover
        className={s.cover}
        title={debate.book.title}
        author={debate.book.author ?? undefined}
        src={debate.book.image}
        width={coverWidth}
      />
    </article>
  );
}

/** 첫 페이지를 불러오는 동안 보여주는 자리. 바깥 묶음에 role="status"를 달아요. */
export function DebateListItemSkeleton({ coverWidth }: { coverWidth: number }) {
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
      <span className={s.meta}>
        <Skeleton width='48%' height={12} />
      </span>
      <span className={s.stats}>
        <Skeleton width={120} height={12} />
      </span>
      <Skeleton
        className={s.cover}
        width={coverWidth}
        height={Math.round(coverWidth * 1.45)}
        radius='2px 5px 5px 2px'
      />
    </div>
  );
}
