import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { BookCover, mq } from '@/design-system';
import { CardCarousel, CarouselCard } from '@/shared/components/CardCarousel';
import { useFormat } from '@/shared/format';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { usePopularDebates } from '../api';
import { placeKindText } from '../display';

/** 추천 토론방 (좋아요·댓글이 많은 5개). 불러오지 못하면 숨겨요. */
export function RecommendedDebates() {
  const { t } = useTranslation();
  const format = useFormat();
  const location = useLocation();
  const isDesktop = useMediaQuery(mq.md);
  const { data, isPending, isError } = usePopularDebates();

  if (isError) return null;

  return (
    <CardCarousel
      title={t('page.debate.title.recommend')}
      prevLabel={t('page.debate.recommend.prev')}
      nextLabel={t('page.debate.recommend.next')}
      items={data}
      loading={isPending}
      getKey={(debate) => debate.id}
      renderItem={(debate) => (
        <CarouselCard
          to={`/debate/${debate.id}`}
          state={{ from: location.pathname + location.search }}
          title={debate.title}
          cover={
            <BookCover
              title={debate.book.title}
              author={debate.book.author ?? undefined}
              src={debate.book.image}
              width={isDesktop ? 60 : 56}
            />
          }
          meta={[
            debate.held_at && format.meetingDate(debate.held_at),
            placeKindText(debate, t),
          ]
            .filter(Boolean)
            .join(' · ')}
          price={
            debate.price > 0
              ? format.price(debate.price)
              : t('page.debate.item.free')
          }
        />
      )}
    />
  );
}
