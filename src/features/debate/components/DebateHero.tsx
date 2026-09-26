import { BookOpen, Clock, Link2, MapPin, Users, Wifi } from 'lucide-react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Avatar, Badge, BookCover, bookCoverStage, mq } from '@/design-system';
import { FollowButton } from '@/features/user/components/FollowButton';
import type { Debate } from '@/shared/api/models';
import { useFormat } from '@/shared/format';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { categoryLabelKeys } from '@/shared/categories';
import { placeKindText } from '../display';
import * as s from './DebateHero.css';

/** http(s) 주소만 링크로 걸어요. */
const isWebUrl = (value: string) => /^https?:\/\//i.test(value);

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className={s.infoRow}>
      {icon}
      <dt className={s.infoLabel}>{label}</dt>
      <dd className={s.infoValue}>{children}</dd>
    </div>
  );
}

type DebateHeroProps = {
  debate: Debate;
  viewerId: number;
  /** 온라인 링크를 보여줄지 (개설자·참여자) */
  canSeeLink: boolean;
  /** 작성자 줄 오른쪽 버튼 (데스크톱의 공유·옵션) */
  actions?: ReactNode;
};

/** 표지, 카테고리, 제목, 개설자, 모임 정보 */
export function DebateHero({
  debate,
  viewerId,
  canSeeLink,
  actions,
}: DebateHeroProps) {
  const { t } = useTranslation();
  const format = useFormat();
  const isDesktop = useMediaQuery(mq.md);
  const hostName = debate.user.name || t('component.user.unknown');
  const placeKind = placeKindText(debate, t);
  const location = debate.location?.trim();
  const bookText = [debate.book.title, debate.book.author]
    .filter(Boolean)
    .join(' · ');

  return (
    <header className={s.hero}>
      <div className={s.stageBand}>
        <div className={`${bookCoverStage} ${s.stage}`}>
          <BookCover
            title={debate.book.title}
            author={debate.book.author ?? undefined}
            src={debate.book.image}
            width={isDesktop ? 132 : 118}
          />
        </div>
      </div>

      <div className={s.body}>
        <div className={s.badges}>
          {categoryLabelKeys(debate.category).map((key) => (
            <Badge key={key} tone='info' shape='pill' size='lg'>
              {t(key)}
            </Badge>
          ))}
          {placeKind && (
            <Badge
              tone='outline'
              shape='pill'
              size='lg'
              icon={
                location ? (
                  <MapPin aria-hidden='true' />
                ) : (
                  <Wifi aria-hidden='true' />
                )
              }
            >
              {placeKind}
            </Badge>
          )}
        </div>

        <h1 className={s.title}>{debate.title}</h1>

        <div className={s.hostRow}>
          <Avatar name={hostName} src={debate.user.profile} size={40} />
          <Link to={`/user/${debate.user.id}`} className={s.hostLink}>
            <span className={s.hostName}>{hostName}</span>
            <span className={s.hostMeta}>
              {format.relativeTime(debate.created)} ·{' '}
              {t('page.debate-detail.host-label')}
            </span>
          </Link>
          <FollowButton
            targetId={debate.user.id}
            viewerId={viewerId}
            size={isDesktop ? 'sm' : 'md'}
          />
          <span className={s.spacer} />
          {actions && <div className={s.actions}>{actions}</div>}
        </div>

        <dl className={s.info}>
          {debate.held_at && (
            <InfoRow
              icon={<Clock aria-hidden='true' />}
              label={t('page.debate-detail.info.time')}
            >
              {format.meetingDateTime(debate.held_at)}
            </InfoRow>
          )}
          {debate.limit > 0 && (
            <InfoRow
              icon={<Users aria-hidden='true' />}
              label={t('page.debate-detail.info.limit')}
            >
              {t('page.debate-detail.info.limit-value', {
                count: debate.limit,
              })}
            </InfoRow>
          )}
          {location && (
            <InfoRow
              icon={<MapPin aria-hidden='true' />}
              label={t('page.debate-detail.info.location')}
            >
              {location}
            </InfoRow>
          )}
          {debate.link && (
            <InfoRow
              icon={<Link2 aria-hidden='true' />}
              label={t('page.debate-detail.info.link')}
            >
              {!canSeeLink ? (
                <span className={s.infoMuted}>
                  {t('page.debate-detail.info.link-locked')}
                </span>
              ) : isWebUrl(debate.link) ? (
                <a
                  href={debate.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={s.infoLink}
                >
                  {debate.link.replace(/^https?:\/\//i, '')}
                </a>
              ) : (
                debate.link
              )}
            </InfoRow>
          )}
          <InfoRow
            icon={<BookOpen aria-hidden='true' />}
            label={t('page.debate-detail.info.book')}
          >
            {bookText}
          </InfoRow>
        </dl>
      </div>
    </header>
  );
}
