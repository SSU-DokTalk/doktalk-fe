import clsx from 'clsx';
import { ChevronRight, MapPin, Video } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { buttonStyles, visuallyHidden } from '@/design-system';
import type { Debate } from '@/shared/api/models';
import * as s from './MeetingParts.css';

const isWebUrl = (value: string) => /^https?:\/\//i.test(value);

/** 월·일·요일 날짜 칸. 날짜는 옆 글에도 있어서 읽지 않게 숨겨요. */
export function MeetingDate({
  date,
  className,
}: {
  date: Date | null;
  className?: string;
}) {
  const { t } = useTranslation();
  return (
    <span aria-hidden='true' className={clsx(s.date, className)}>
      {date ? (
        <>
          <span className={s.dateSmall}>
            {t(`function.time.months.${date.getMonth() + 1}`)}
          </span>
          <span className={s.dateDay}>{date.getDate()}</span>
          <span className={s.dateSmall}>
            {t(`function.time.weekdays.${date.getDay()}`)}
          </span>
        </>
      ) : (
        <span className={s.dateSmall}>
          {t('page.profile.meetings.date-tbd')}
        </span>
      )}
    </span>
  );
}

/**
 * 온라인이면 모임 링크, 오프라인이면 지도에서 장소 보기 (새 창).
 * button: 테두리 버튼 (마이페이지), text: 글자 링크 (메인 화면 카드)
 */
export function MeetingAction({
  debate,
  appearance = 'button',
  className,
}: {
  debate: Debate;
  appearance?: 'button' | 'text';
  className?: string;
}) {
  const { t } = useTranslation();
  const location = debate.location?.trim();
  const link = debate.link?.trim();
  const href = location
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`
    : link && isWebUrl(link)
      ? link
      : null;
  if (!href) return null;

  const text = appearance === 'text';
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className={clsx(
        text ? s.textAction : buttonStyles({ variant: 'secondary' }),
        className
      )}
    >
      {!text &&
        (location ? (
          <MapPin aria-hidden='true' />
        ) : (
          <Video aria-hidden='true' />
        ))}
      {t(
        location
          ? 'page.profile.meetings.open-map'
          : 'page.profile.meetings.open-link'
      )}
      <span className={visuallyHidden}>
        {' '}
        ({t('page.profile.meetings.new-window')})
      </span>
      {text && <ChevronRight aria-hidden='true' className={s.textActionIcon} />}
    </a>
  );
}
