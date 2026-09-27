import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { buttonStyles, visuallyHidden } from '@/design-system';
import { placeText } from '@/features/debate/display';
import {
  MeetingAction,
  MeetingDate,
} from '@/features/profile/components/MeetingParts';
import { useMyMeetings } from '@/features/profile/useMyMeetings';
import { useFormat } from '@/shared/format';
import * as s from './Main.css';

const VISIBLE = 2;

/** 인사와 가까운 모임 두 개. 모임 일정은 마이페이지 토론방 탭과 같은 데이터예요. */
export function UpcomingMeetings({
  viewerId,
  name,
}: {
  viewerId: number;
  name: string;
}) {
  const { t } = useTranslation();
  const format = useFormat();
  const { upcoming, isPending, isError } = useMyMeetings(viewerId);
  const shown = upcoming.slice(0, VISIBLE);

  return (
    <section aria-labelledby='home-welcome' className={s.welcome}>
      <div className={s.greeting}>
        <h1 id='home-welcome' className={s.title}>
          {t('page.home.main.greeting', { name })}
        </h1>
        {!isPending && !isError && (
          <p className={s.subtitle}>
            {upcoming.length > 0
              ? t('page.home.main.upcoming', { count: upcoming.length })
              : t('page.home.main.no-upcoming')}
          </p>
        )}
      </div>

      {shown.length > 0 && (
        <>
          <h2 className={visuallyHidden}>
            {t('page.home.main.upcoming-label')}
          </h2>
          <ul className={s.meetings}>
            {shown.map(({ debate, at }) => (
              <li key={debate.id}>
                <div className={s.meeting}>
                  <MeetingDate date={at} className={s.meetingDate} />
                  <div className={s.meetingText}>
                    <Link
                      to={`/debate/${debate.id}`}
                      className={s.meetingTitle}
                    >
                      {debate.title}
                    </Link>
                    <span className={s.meetingMeta}>
                      {at && (
                        <span className={visuallyHidden}>
                          {format.meetingDate(at)}{' '}
                        </span>
                      )}
                      {[at ? format.time(at) : null, placeText(debate, t)]
                        .filter(Boolean)
                        .join(' · ')}
                    </span>
                    <MeetingAction debate={debate} appearance='text' />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {upcoming.length > VISIBLE && (
            <Link
              to='/mypage?tab=debate'
              className={`${buttonStyles({ variant: 'ghost', size: 'sm' })} ${s.allMeetings}`}
            >
              {t('page.home.main.all-meetings')}
              <ChevronRight aria-hidden='true' />
            </Link>
          )}
        </>
      )}
    </section>
  );
}
