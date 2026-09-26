import { useTranslation } from 'react-i18next';
import { CoverRailList } from '@/shared/components/CoverRailList';
import { useFormat } from '@/shared/format';
import { usePopularDebates } from '../api';
import { placeKindText } from '../display';

type RelatedDebatesProps = {
  /** 지금 보는 토론방은 빼요. */
  excludeId?: number;
  title?: string;
  /** 제목 옆 더보기 링크 (토론 목록으로) */
  withMore?: boolean;
};

/** 오른쪽 칸의 인기·추천 토론방 3개 */
export function RelatedDebates({
  excludeId,
  title,
  withMore = false,
}: RelatedDebatesProps) {
  const { t } = useTranslation();
  const format = useFormat();
  const { data } = usePopularDebates();
  const debates = (data ?? [])
    .filter((debate) => debate.id !== excludeId)
    .slice(0, 3);

  return (
    <CoverRailList
      title={title ?? t('page.debate.title.recommend')}
      more={
        withMore
          ? {
              to: '/debate',
              label: t('page.debate.popular.more'),
              ariaLabel: t('page.summary.popular-debates.more-label'),
            }
          : undefined
      }
      items={debates.map((debate) => ({
        key: debate.id,
        to: `/debate/${debate.id}`,
        title: debate.title,
        cover: { title: debate.book.title, src: debate.book.image },
        meta: [
          debate.held_at && format.meetingDate(debate.held_at),
          placeKindText(debate, t),
          debate.price > 0
            ? format.price(debate.price)
            : t('page.debate.item.free'),
        ]
          .filter(Boolean)
          .join(' · '),
      }))}
    />
  );
}
