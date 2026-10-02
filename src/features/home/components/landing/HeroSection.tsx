import clsx from 'clsx';
import { ArrowRight, BookOpen, CalendarDays, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BookCover, bookCoverStage, buttonStyles, mq } from '@/design-system';
import { usePopularDebates } from '@/features/debate/api';
import { placeText, seatsText } from '@/features/debate/display';
import type { Debate } from '@/shared/api/models';
import { parseServerDate, useFormat } from '@/shared/format';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import * as shell from '@/shell/shell.css';
import { useOpenDebates } from '../../useOpenDebates';
import * as s from './Landing.css';

/**
 * 추천 카드에 보일 토론방: 인기 토론방 가운데 모임 전이고 자리가 남은 첫 번째,
 * 없으면 최근에 열린 모집 중 토론방. 둘 다 없으면 카드를 빼요.
 */
function useFeaturedDebate(): Debate | undefined {
  const { data } = usePopularDebates();
  const { debates: open } = useOpenDebates(0, 'latest');
  const now = Date.now();
  return (
    data?.find(
      (debate) =>
        !debate.is_full &&
        debate.held_at &&
        parseServerDate(debate.held_at).getTime() > now
    ) ?? open[0]
  );
}

function FeaturedDebate({ debate }: { debate: Debate }) {
  const { t } = useTranslation();
  const format = useFormat();
  const isDesktop = useMediaQuery(mq.md);
  const where = [placeText(debate, t), seatsText(debate, t)]
    .filter(Boolean)
    .join(' · ');

  return (
    <Link to={`/debate/${debate.id}`} className={s.featured}>
      <span className={clsx(bookCoverStage, s.featuredStage)}>
        <BookCover
          title={debate.book.title}
          author={debate.book.author ?? undefined}
          src={debate.book.image}
          width={isDesktop ? 124 : 84}
        />
      </span>
      <span className={s.featuredBody}>
        <span className={s.featuredLabel}>{t('page.home.hero.featured')}</span>
        <span className={s.featuredTitle}>{debate.title}</span>
        <span className={s.featuredMeta}>
          {debate.held_at && (
            <span className={s.metaLine}>
              <CalendarDays aria-hidden='true' className={s.metaIcon} />
              {format.meetingDateTime(debate.held_at)}
            </span>
          )}
          {where && (
            <span className={s.metaLine}>
              <MapPin aria-hidden='true' className={s.metaIcon} />
              {where}
            </span>
          )}
        </span>
        <span className={s.featuredFoot}>
          <span className={s.featuredPrice}>
            {debate.price > 0
              ? format.price(debate.price)
              : t('component.stats.free')}
          </span>
          <span className={s.fakeButton}>{t('page.home.hero.join')}</span>
        </span>
      </span>
    </Link>
  );
}

/** 로그아웃 첫 화면: 소개 문구, 둘러보기 버튼, 추천 토론방 카드 */
export function HeroSection() {
  const { t } = useTranslation();
  const featured = useFeaturedDebate();

  return (
    <section aria-labelledby='home-hero-title' className={s.hero}>
      <div
        className={clsx(
          shell.container,
          s.heroInner,
          !featured && s.heroInnerSingle
        )}
      >
        <div className={s.heroText}>
          <span className={s.badge}>
            <BookOpen aria-hidden='true' className={s.badgeIcon} />
            {t('page.home.hero.badge')}
          </span>
          <h1 id='home-hero-title' className={s.heroTitle}>
            {t('page.home.hero.title-1')}
            <br />
            <span className={s.heroAccent}>{t('page.home.hero.title-2')}</span>
          </h1>
          <p className={s.heroDescription}>{t('footer.company.description')}</p>
        </div>

        {featured && (
          <div className={s.heroCardArea}>
            <FeaturedDebate debate={featured} />
          </div>
        )}

        <div className={s.heroActions}>
          <Link to='/debate' className={buttonStyles({ size: 'lg' })}>
            {t('page.home.hero.browse-debates')}
            <ArrowRight aria-hidden='true' />
          </Link>
          <Link
            to='/summary'
            className={buttonStyles({ variant: 'neutral', size: 'lg' })}
          >
            {t('page.home.hero.browse-summaries')}
          </Link>
        </div>
      </div>
    </section>
  );
}
