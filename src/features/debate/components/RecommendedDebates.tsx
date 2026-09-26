import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BookCover, IconButton, mq, Skeleton } from '@/design-system';
import type { Debate } from '@/shared/api/models';
import { useFormat } from '@/shared/format';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { usePopularDebates } from '../api';
import { placeKindText } from '../display';
import * as s from './RecommendedDebates.css';

function RecommendedDebateCard({
  debate,
  coverWidth,
}: {
  debate: Debate;
  coverWidth: number;
}) {
  const { t } = useTranslation();
  const format = useFormat();
  const meta = [
    debate.held_at && format.meetingDate(debate.held_at),
    placeKindText(debate, t),
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <article className={s.card}>
      <BookCover
        title={debate.book.title}
        author={debate.book.author ?? undefined}
        src={debate.book.image}
        width={coverWidth}
      />
      <div className={s.cardBody}>
        <h3 className={s.cardTitle}>
          <Link to={`/debate/${debate.id}`} className={s.link}>
            {debate.title}
          </Link>
        </h3>
        {meta && <p className={s.cardMeta}>{meta}</p>}
        <p className={s.cardPrice}>
          {debate.price > 0
            ? format.price(debate.price)
            : t('page.debate.item.free')}
        </p>
      </div>
    </article>
  );
}

/**
 * 추천 토론방 (좋아요·댓글이 많은 5개).
 * 데스크톱은 3개씩 보이고 이전·다음 버튼으로, 모바일은 손가락으로 넘겨요.
 * 불러오지 못했거나 비어 있으면 영역을 숨겨요.
 */
export function RecommendedDebates() {
  const { t } = useTranslation();
  const headingId = useId();
  const isDesktop = useMediaQuery(mq.md);
  const reducedMotion = useMediaQuery(mq.reducedMotion);
  const { data, isPending, isError } = usePopularDebates();

  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ atStart: true, atEnd: true });

  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setEdges({
      atStart: track.scrollLeft <= 1,
      atEnd: track.scrollLeft >= max - 1,
    });
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener('resize', updateEdges);
    return () => window.removeEventListener('resize', updateEdges);
  }, [updateEdges, data]);

  if (isError || data?.length === 0) return null;

  const scrollByPage = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({
      left: direction * track.clientWidth,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  const coverWidth = isDesktop ? 60 : 56;
  const scrollable = !(edges.atStart && edges.atEnd);

  return (
    <section className={s.section} aria-labelledby={headingId}>
      <div className={s.head}>
        <h2 id={headingId} className={s.heading}>
          {t('page.debate.title.recommend')}
        </h2>
        {scrollable && (
          <div className={s.controls}>
            <IconButton
              variant='outline'
              size='sm'
              aria-label={t('page.debate.recommend.prev')}
              disabled={edges.atStart}
              onClick={() => scrollByPage(-1)}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              variant='outline'
              size='sm'
              aria-label={t('page.debate.recommend.next')}
              disabled={edges.atEnd}
              onClick={() => scrollByPage(1)}
            >
              <ChevronRight />
            </IconButton>
          </div>
        )}
      </div>

      {isPending ? (
        <div
          role='status'
          aria-label={t('component.base.infinite-scroll.loading')}
          className={s.track}
        >
          {[0, 1, 2].map((index) => (
            <Skeleton key={index} height={114} radius={12} />
          ))}
        </div>
      ) : (
        <ul ref={trackRef} className={s.track} onScroll={updateEdges}>
          {data.map((debate) => (
            <li key={debate.id} className={s.slide}>
              <RecommendedDebateCard debate={debate} coverWidth={coverWidth} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
