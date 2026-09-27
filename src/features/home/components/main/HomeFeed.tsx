import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { ChevronRight, FileText, MessagesSquare, PenLine } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { EmptyState, mq, Tabs, visuallyHidden } from '@/design-system';
import {
  DebateListItem,
  DebateListItemSkeleton,
} from '@/features/debate/components/DebateListItem';
import { usePostFeed } from '@/features/post/api';
import { PostRow, PostRowSkeleton } from '@/features/post/components/PostRow';
import { maskLanguageFor, summaryListQuery } from '@/features/summary/api';
import {
  SummaryListItem,
  SummaryListItemSkeleton,
} from '@/features/summary/components/SummaryListItem';
import { CategoryChips } from '@/shared/components/CategoryChips';
import { COVER_WIDTH } from '@/shared/components/FeedItem.css';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { useOpenDebates } from '../../useOpenDebates';
import * as s from './Main.css';

type FeedTab = 'debates' | 'posts' | 'summaries';
const VISIBLE = 5;

/** 목록 화면 주소에 카테고리를 이어 붙여요. */
const withCategory = (path: string, category: number) =>
  category ? `${path}?category=${category}` : path;

function FeedList<T>({
  items,
  pending,
  skeleton,
  empty,
  getKey,
  render,
}: {
  items: T[];
  pending: boolean;
  skeleton: ReactNode;
  empty: ReactNode;
  getKey: (item: T) => number;
  render: (item: T) => ReactNode;
}) {
  const { t } = useTranslation();
  if (pending) {
    return (
      <div
        role='status'
        aria-label={t('component.base.infinite-scroll.loading')}
      >
        {skeleton}
        {skeleton}
        {skeleton}
      </div>
    );
  }
  if (items.length === 0) return <div className={s.state}>{empty}</div>;
  return (
    <ul className={s.items}>
      {items.slice(0, VISIBLE).map((item) => (
        <li key={getKey(item)}>{render(item)}</li>
      ))}
    </ul>
  );
}

function MoreLink({ to, label }: { to: string; label: string }) {
  return (
    <Link to={to} className={s.more}>
      {label}
      <ChevronRight aria-hidden='true' className={s.moreIcon} />
    </Link>
  );
}

function DebatesPanel({ coverWidth }: { coverWidth: number }) {
  const { t } = useTranslation();
  const [category, setCategory] = useState(0);
  const { query, debates } = useOpenDebates(category, 'latest');

  return (
    <>
      <CategoryChips
        value={category}
        onChange={setCategory}
        label={t('page.debate.category-label')}
        allLabel={t('page.debate.category-all')}
        size='sm'
        scroll
        className={s.chips}
      />
      <FeedList
        items={debates}
        pending={query.isPending}
        skeleton={<DebateListItemSkeleton coverWidth={coverWidth} />}
        empty={
          <EmptyState
            icon={<MessagesSquare />}
            title={t('page.home.debates.empty')}
            description={t('page.home.debates.empty-description')}
          />
        }
        getKey={(debate) => debate.id}
        render={(debate) => (
          <DebateListItem debate={debate} coverWidth={coverWidth} />
        )}
      />
      <MoreLink
        to={withCategory('/debate', category)}
        label={t('page.home.main.more.debates')}
      />
    </>
  );
}

function PostsPanel({ viewerId }: { viewerId: number }) {
  const { t } = useTranslation();
  const query = usePostFeed(viewerId);
  const posts = query.data?.pages[0]?.items ?? [];

  return (
    <>
      <FeedList
        items={posts}
        pending={query.isPending}
        skeleton={<PostRowSkeleton />}
        empty={
          <EmptyState icon={<PenLine />} title={t('page.home.posts.empty')} />
        }
        getKey={(post) => post.id}
        render={(post) => <PostRow post={post} />}
      />
      <MoreLink to='/post' label={t('page.home.main.more.posts')} />
    </>
  );
}

function SummariesPanel({ coverWidth }: { coverWidth: number }) {
  const { t, i18n } = useTranslation();
  const [category, setCategory] = useState(0);
  const query = useInfiniteQuery({
    ...summaryListQuery({
      category,
      search: '',
      searchBy: 'bt',
      sort: 'latest',
      lang: maskLanguageFor(i18n.language),
    }),
    placeholderData: keepPreviousData,
  });
  const summaries = query.data?.pages[0]?.items ?? [];

  return (
    <>
      <CategoryChips
        value={category}
        onChange={setCategory}
        label={t('page.summary.category-label')}
        allLabel={t('page.summary.category-all')}
        size='sm'
        scroll
        className={s.chips}
      />
      <FeedList
        items={summaries}
        pending={query.isPending}
        skeleton={<SummaryListItemSkeleton coverWidth={coverWidth} />}
        empty={
          <EmptyState
            icon={<FileText />}
            title={t('page.home.summaries.empty')}
          />
        }
        getKey={(summary) => summary.id}
        render={(summary) => (
          <SummaryListItem summary={summary} coverWidth={coverWidth} />
        )}
      />
      <MoreLink
        to={withCategory('/summary', category)}
        label={t('page.home.main.more.summaries')}
      />
    </>
  );
}

/** 메인 피드: 추천 토론방 · 게시글 · 도서 요약을 탭으로 바꿔 봐요. */
export function HomeFeed({ viewerId }: { viewerId: number }) {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery(mq.md);
  const [tab, setTab] = useState<FeedTab>('debates');
  const coverWidth = isDesktop ? COVER_WIDTH.desktop : COVER_WIDTH.mobile;

  return (
    <section aria-labelledby='home-feed-title' className={s.feed}>
      <h2 id='home-feed-title' className={visuallyHidden}>
        {t('page.home.main.feed')}
      </h2>
      <Tabs.Root
        value={tab}
        onValueChange={(value) => setTab(value as FeedTab)}
      >
        <Tabs.List
          aria-label={t('page.home.main.feed')}
          size={isDesktop ? 'lg' : 'md'}
          divider
          fill={!isDesktop}
          className={s.feedTabs}
        >
          <Tabs.Tab value='debates'>{t('page.home.main.tab.debates')}</Tabs.Tab>
          <Tabs.Tab value='posts'>{t('page.home.main.tab.posts')}</Tabs.Tab>
          <Tabs.Tab value='summaries'>
            {t('page.home.main.tab.summaries')}
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value='debates'>
          <DebatesPanel coverWidth={coverWidth} />
        </Tabs.Panel>
        <Tabs.Panel value='posts'>
          <PostsPanel viewerId={viewerId} />
        </Tabs.Panel>
        <Tabs.Panel value='summaries'>
          <SummariesPanel coverWidth={coverWidth} />
        </Tabs.Panel>
      </Tabs.Root>
    </section>
  );
}
