import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { IconButton, mq, Skeleton } from '@/design-system';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import * as s from './CardCarousel.css';

type CardCarouselProps<T> = {
  title: string;
  prevLabel: string;
  nextLabel: string;
  items: T[] | undefined;
  loading: boolean;
  getKey: (item: T) => number | string;
  renderItem: (item: T) => ReactNode;
};

/**
 * 추천 카드 줄. 데스크톱은 3개씩 보이고 이전·다음 버튼으로, 모바일은 손가락으로 넘겨요.
 * 비어 있으면 영역을 숨겨요.
 */
export function CardCarousel<T>({
  title,
  prevLabel,
  nextLabel,
  items,
  loading,
  getKey,
  renderItem,
}: CardCarouselProps<T>) {
  const { t } = useTranslation();
  const headingId = useId();
  const reducedMotion = useMediaQuery(mq.reducedMotion);
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
  }, [updateEdges, items]);

  if (!loading && (!items || items.length === 0)) return null;

  const scrollByPage = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({
      left: direction * track.clientWidth,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  const scrollable = !(edges.atStart && edges.atEnd);

  return (
    <section className={s.section} aria-labelledby={headingId}>
      <div className={s.head}>
        <h2 id={headingId} className={s.heading}>
          {title}
        </h2>
        {scrollable && (
          <div className={s.controls}>
            <IconButton
              variant='outline'
              size='sm'
              aria-label={prevLabel}
              disabled={edges.atStart}
              onClick={() => scrollByPage(-1)}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              variant='outline'
              size='sm'
              aria-label={nextLabel}
              disabled={edges.atEnd}
              onClick={() => scrollByPage(1)}
            >
              <ChevronRight />
            </IconButton>
          </div>
        )}
      </div>

      {loading || !items ? (
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
          {items.map((item) => (
            <li key={getKey(item)} className={s.slide}>
              {renderItem(item)}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

type CarouselCardProps = {
  to: string;
  /** 링크 이동 때 넘길 상태 (돌아갈 목록 주소) */
  state?: unknown;
  title: string;
  cover: ReactNode;
  meta?: ReactNode;
  price?: ReactNode;
};

/** 추천 카드 한 장. 카드 어디를 눌러도 이동해요. */
export function CarouselCard({
  to,
  state,
  title,
  cover,
  meta,
  price,
}: CarouselCardProps) {
  return (
    <article className={s.card}>
      {cover}
      <div className={s.cardBody}>
        <h3 className={s.cardTitle}>
          <Link to={to} state={state} className={s.link}>
            {title}
          </Link>
        </h3>
        {meta && <p className={s.cardMeta}>{meta}</p>}
        {price && <p className={s.cardPrice}>{price}</p>}
      </div>
    </article>
  );
}
