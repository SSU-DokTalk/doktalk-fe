import clsx from 'clsx';
import { ChevronRight, Heart, MessageCircle, PenLine } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Avatar, buttonStyles, Skeleton } from '@/design-system';
import { authPath } from '@/features/auth/redirect';
import { useRecentPosts } from '@/features/post/api';
import { postTitle } from '@/features/post/display';
import type { Post } from '@/shared/api/models';
import { photosOf } from '@/shared/files';
import { parseServerDate, useFormat } from '@/shared/format';
import { useAuth } from '@/shell/hooks';
import * as shell from '@/shell/shell.css';
import * as landing from './Landing.css';
import * as s from './RecentPosts.css';
import { Stat } from '@/shared/components/Stat';

const COUNT = 3;

function PostTile({ post }: { post: Post }) {
  const { t } = useTranslation();
  const format = useFormat();
  const author = post.user.name || t('component.user.unknown');
  const [photo] = photosOf(post.files);
  const content = post.content?.trim();

  return (
    <Link to={`/post/${post.id}`} className={s.card}>
      {photo && (
        <img src={photo.url} alt='' loading='lazy' className={s.photo} />
      )}
      <span className={s.body}>
        <span className={s.title}>{postTitle(post, t)}</span>
        {content && <span className={s.excerpt}>{content}</span>}
        <span className={s.meta}>
          <Avatar name={author} src={post.user.profile} size={28} />
          <span className={s.author}>{author}</span>
          <time dateTime={parseServerDate(post.created).toISOString()}>
            {format.relativeTime(post.created)}
          </time>
          <span className={s.spacer} />
          <Stat
            icon={Heart}
            size='lg'
            label={t('component.stats.likes', { count: post.likes_num })}
            className={s.stat}
          >
            {post.likes_num}
          </Stat>
          <Stat
            icon={MessageCircle}
            size='lg'
            label={t('component.stats.comments', { count: post.comments_num })}
            className={s.stat}
          >
            {post.comments_num}
          </Stat>
        </span>
      </span>
    </Link>
  );
}

/** 최근 게시글 3개. 로그아웃이면 글쓰기는 로그인한 뒤 쓰기 창으로 이어져요. */
export function RecentPosts() {
  const { t } = useTranslation();
  const { isLoggedIn } = useAuth();
  const { data, isPending, isError } = useRecentPosts(COUNT);
  const writePath = '/post?write=1';

  if (isError || (!isPending && (data?.items ?? []).length === 0)) return null;

  return (
    <section
      aria-labelledby='home-recent-posts'
      className={clsx(shell.container, landing.section)}
    >
      <div className={landing.sectionHead}>
        <div className={landing.sectionTitles}>
          <h2 id='home-recent-posts' className={landing.sectionTitle}>
            {t('component.topnav.post')}
          </h2>
          <p className={landing.sectionDescription}>
            {t('page.home.posts.description')}
          </p>
        </div>
        <div className={landing.sectionTools}>
          <Link
            to={isLoggedIn ? writePath : authPath('login', writePath)}
            className={buttonStyles({ size: 'md' })}
          >
            <PenLine aria-hidden='true' />
            {t('page.home.posts.write')}
          </Link>
          <Link
            to='/post'
            aria-label={t('page.home.posts.see-all')}
            className={landing.seeAll}
          >
            {t('page.home.see-all')}
            <ChevronRight aria-hidden='true' className={landing.seeAllIcon} />
          </Link>
        </div>
      </div>

      <ul
        className={s.grid}
        role={isPending ? 'status' : undefined}
        aria-label={
          isPending ? t('component.base.infinite-scroll.loading') : undefined
        }
      >
        {isPending
          ? Array.from({ length: COUNT }, (_, index) => (
              <li key={index}>
                <Skeleton height={260} radius={20} />
              </li>
            ))
          : data?.items.map((post) => (
              <li key={post.id}>
                <PostTile post={post} />
              </li>
            ))}
      </ul>
    </section>
  );
}
