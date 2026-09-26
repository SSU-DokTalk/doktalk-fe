import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { BookCover, mq } from '@/design-system';
import { CardCarousel, CarouselCard } from '@/shared/components/CardCarousel';
import { useFormat } from '@/shared/format';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { maskLanguageFor, usePopularSummaries } from '../api';

/** 추천 요약 (좋아요가 많은 5개). 불러오지 못하면 숨겨요. */
export function RecommendedSummaries() {
  const { t, i18n } = useTranslation();
  const format = useFormat();
  const location = useLocation();
  const isDesktop = useMediaQuery(mq.md);
  const { data, isPending, isError } = usePopularSummaries(
    maskLanguageFor(i18n.language)
  );

  if (isError) return null;

  return (
    <CardCarousel
      title={t('page.summary.title.recommend')}
      prevLabel={t('page.summary.recommend.prev')}
      nextLabel={t('page.summary.recommend.next')}
      items={data}
      loading={isPending}
      getKey={(summary) => summary.id}
      renderItem={(summary) => (
        <CarouselCard
          to={`/summary/${summary.id}`}
          state={{ from: location.pathname + location.search }}
          title={summary.title}
          cover={
            <BookCover
              title={summary.book.title}
              author={summary.book.author ?? undefined}
              src={summary.book.image}
              width={isDesktop ? 60 : 56}
            />
          }
          meta={summary.user.name || t('component.user.unknown')}
          price={
            summary.price > 0
              ? format.price(summary.price)
              : t('component.stats.free')
          }
        />
      )}
    />
  );
}
