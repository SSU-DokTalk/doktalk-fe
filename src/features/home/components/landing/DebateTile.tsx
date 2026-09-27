import clsx from 'clsx';
import { CalendarDays, MapPin, Video } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Badge,
  BookCover,
  bookCoverStage,
  mq,
  Skeleton,
} from '@/design-system';
import { placeKindText } from '@/features/debate/display';
import type { Debate } from '@/shared/api/models';
import { categoryText } from '@/shared/categories';
import { parseServerDate, useFormat } from '@/shared/format';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import * as s from './DebateTile.css';

/** 첫 화면의 모집 중 토론방 카드 (큰 표지 + 카테고리·제목·일시·가격) */
export function DebateTile({ debate }: { debate: Debate }) {
  const { t } = useTranslation();
  const format = useFormat();
  const isDesktop = useMediaQuery(mq.md);
  const kind = placeKindText(debate, t);
  const online = !debate.location?.trim() && debate.is_online;
  const ended =
    Boolean(debate.held_at) &&
    parseServerDate(debate.held_at!).getTime() < Date.now();

  return (
    <Link to={`/debate/${debate.id}`} className={s.card}>
      <span className={clsx(bookCoverStage, s.stage)}>
        {ended ? (
          <Badge tone='neutral' size='md' className={s.mode}>
            {t('page.home.debates.ended')}
          </Badge>
        ) : (
          kind && (
            <Badge tone='overlay' size='md' className={s.mode}>
              {online ? (
                <Video aria-hidden='true' className={s.modeIcon} />
              ) : (
                <MapPin aria-hidden='true' className={s.modeIcon} />
              )}
              {kind}
            </Badge>
          )
        )}
        <BookCover
          title={debate.book.title}
          author={debate.book.author ?? undefined}
          src={debate.book.image}
          width={isDesktop ? 130 : 112}
        />
      </span>
      <span className={s.body}>
        <span className={s.category}>{categoryText(debate.category, t)}</span>
        <span className={s.title}>{debate.title}</span>
        {debate.held_at && (
          <span className={s.when}>
            <CalendarDays aria-hidden='true' className={s.whenIcon} />
            {format.meetingDateTime(debate.held_at)}
          </span>
        )}
        <span className={s.foot}>
          {debate.price > 0 ? (
            <span className={s.price}>{format.price(debate.price)}</span>
          ) : (
            <Badge tone='info' size='md'>
              {t('component.stats.free')}
            </Badge>
          )}
          <span className={s.limit}>
            {t('page.debate.item.limit', { count: debate.limit })}
          </span>
        </span>
      </span>
    </Link>
  );
}

export function DebateTileSkeleton() {
  return (
    <div className={s.card} aria-hidden='true'>
      <Skeleton height={240} radius={0} />
      <span className={s.body}>
        <Skeleton width={80} height={14} />
        <Skeleton width='90%' height={20} />
        <Skeleton width='60%' height={16} />
        <Skeleton width={70} height={18} />
      </span>
    </div>
  );
}
