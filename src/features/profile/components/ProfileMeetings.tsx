import clsx from 'clsx';
import { ChevronDown, ChevronRight, MessagesSquare, Plus } from 'lucide-react';
import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Badge,
  BookCover,
  Button,
  buttonStyles,
  EmptyState,
  Skeleton,
  visuallyHidden,
} from '@/design-system';
import { placeText, seatsText } from '@/features/debate/display';
import { useFormat } from '@/shared/format';
import { daysUntil, useMyMeetings, type Meeting } from '../useMyMeetings';
import { CreatePrompt } from './CreatePrompt';
import { MeetingAction, MeetingDate } from './MeetingParts';
import * as m from './ProfileMeetings.css';
import * as s from '@/shared/components/Section.css';

const PAST_STEP = 5;

function RoleBadge({
  role,
  muted,
}: {
  role: Meeting['role'];
  muted?: boolean;
}) {
  const { t } = useTranslation();
  const tone = muted ? 'neutral' : role === 'host' ? 'solid' : 'info';
  return (
    <Badge tone={tone} size='sm'>
      {t(`page.profile.meetings.${role === 'host' ? 'host' : 'guest'}`)}
    </Badge>
  );
}

function UpcomingMeeting({ meeting }: { meeting: Meeting }) {
  const { t } = useTranslation();
  const format = useFormat();
  const { debate, at } = meeting;
  const days = at ? daysUntil(at) : null;
  const meta = [
    at ? format.time(at) : null,
    placeText(debate, t),
    seatsText(debate, t),
    debate.price > 0 ? format.price(debate.price) : t('component.stats.free'),
  ].filter(Boolean);

  return (
    <li className={m.upcoming}>
      <MeetingDate date={at} className={m.dateArea} />
      <Link to={`/debate/${debate.id}`} className={m.body}>
        <span className={m.badges}>
          <RoleBadge role={meeting.role} />
          {days !== null && (
            <span className={m.dday}>
              {days === 0
                ? t('page.profile.meetings.today')
                : t('page.profile.meetings.d-day', { count: days })}
            </span>
          )}
        </span>
        <span className={m.title}>{debate.title}</span>
        <span className={m.meta}>
          {at && (
            <span className={visuallyHidden}>{format.meetingDate(at)} </span>
          )}
          {meta.join(' · ')}
        </span>
      </Link>
      <MeetingAction debate={debate} className={m.action} />
    </li>
  );
}

function PastMeeting({ meeting }: { meeting: Meeting }) {
  const { t } = useTranslation();
  const format = useFormat();
  const { debate, at } = meeting;
  const meta = [at ? format.meetingDate(at) : null, placeText(debate, t)]
    .filter(Boolean)
    .join(' · ');

  return (
    <li>
      <Link to={`/debate/${debate.id}`} className={m.past}>
        <BookCover
          title={debate.book.title}
          src={debate.book.image}
          width={44}
        />
        <span className={m.pastText}>
          <span className={m.pastTitle}>{debate.title}</span>
          <span className={m.meta}>{meta}</span>
        </span>
        <RoleBadge role={meeting.role} muted />
        <ChevronRight aria-hidden='true' className={m.chevron} />
      </Link>
    </li>
  );
}

function MeetingsSkeleton() {
  const { t } = useTranslation();
  return (
    <div
      role='status'
      aria-label={t('component.base.infinite-scroll.loading')}
      className={s.section}
    >
      <Skeleton width={120} height={24} />
      {[0, 1].map((index) => (
        <div key={index} className={m.upcoming}>
          <Skeleton width='100%' height={66} radius={12} />
          <div className={m.body}>
            <Skeleton width={80} height={20} />
            <Skeleton width='70%' height={22} />
            <Skeleton width='50%' height={18} />
          </div>
        </div>
      ))}
    </div>
  );
}

/** 토론방 탭: 토론방 만들기 안내, 다가오는 모임, 지난 모임 */
export function ProfileMeetings({ viewerId }: { viewerId: number }) {
  const { t } = useTranslation();
  const upcomingId = useId();
  const pastId = useId();
  const meetings = useMyMeetings(viewerId);
  const [pastCount, setPastCount] = useState(PAST_STEP);

  const renderBody = () => {
    if (meetings.isPending) return <MeetingsSkeleton />;
    if (meetings.isError) {
      return (
        <div className={s.state}>
          <EmptyState
            tone='danger'
            icon={<MessagesSquare />}
            title={t('page.profile.meetings.error')}
            description={t('page.profile.state.error-description')}
            actions={
              <Button variant='outline' onClick={meetings.retry}>
                {t('page.debate.item.retry')}
              </Button>
            }
          />
        </div>
      );
    }

    const shownPast = meetings.past.slice(0, pastCount);
    return (
      <>
        <section aria-labelledby={upcomingId} className={s.section}>
          <h2 id={upcomingId} className={s.sectionTitle}>
            {t('page.profile.meetings.upcoming')}
            <span className={s.sectionCount}>{meetings.upcoming.length}</span>
          </h2>
          {meetings.isPartial && (
            <p role='status' className={m.notice}>
              {t('page.profile.meetings.partial-error')}
            </p>
          )}
          {meetings.upcoming.length > 0 ? (
            <ul className={m.list}>
              {meetings.upcoming.map((meeting) => (
                <UpcomingMeeting key={meeting.debate.id} meeting={meeting} />
              ))}
            </ul>
          ) : (
            <div className={m.empty}>
              <p className={m.emptyTitle}>
                {t('page.profile.meetings.empty-upcoming')}
              </p>
              <p className={m.emptyDescription}>
                {t('page.profile.meetings.empty-upcoming-description')}
              </p>
              <Link
                to='/debate'
                className={clsx(
                  buttonStyles({ variant: 'tonal', size: 'sm' }),
                  m.emptyLink
                )}
              >
                {t('page.profile.meetings.browse')}
              </Link>
            </div>
          )}
        </section>

        <section aria-labelledby={pastId} className={s.section}>
          <h2 id={pastId} className={s.sectionTitle}>
            {t('page.profile.meetings.past')}
            <span className={s.sectionCount}>{meetings.past.length}</span>
          </h2>
          {shownPast.length > 0 ? (
            <ul className={m.list}>
              {shownPast.map((meeting) => (
                <PastMeeting key={meeting.debate.id} meeting={meeting} />
              ))}
            </ul>
          ) : (
            <div className={m.empty}>
              <p className={m.emptyTitle}>
                {t('page.profile.meetings.empty-past')}
              </p>
            </div>
          )}
          {meetings.past.length > pastCount && (
            <div className={s.moreRow}>
              <Button
                variant='ghost'
                endIcon={<ChevronDown aria-hidden='true' />}
                onClick={() => setPastCount((count) => count + PAST_STEP)}
              >
                {t('page.profile.meetings.more-past')}
              </Button>
            </div>
          )}
        </section>
      </>
    );
  };

  return (
    <>
      <CreatePrompt
        icon={<MessagesSquare />}
        actionIcon={<Plus aria-hidden='true' />}
        title={t('page.profile.meetings.prompt-title')}
        description={t('page.profile.meetings.prompt-description')}
        to='/debate/create'
        label={t('page.debate.button.create')}
        shortLabel={t('page.profile.meetings.create-short')}
      />
      {renderBody()}
    </>
  );
}
