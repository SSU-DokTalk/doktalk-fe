import { Heart, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Avatar, Skeleton, visuallyHidden } from '@/design-system';
import type { Post } from '@/shared/api/models';
import { photosOf } from '@/shared/files';
import { parseServerDate, useFormat } from '@/shared/format';
import { postTitle } from '../display';
import * as s from './PostRow.css';

/** 게시글 한 줄 (메인 화면 피드). 줄 어디를 눌러도 글로 가요. */
export function PostRow({ post }: { post: Post }) {
  const { t } = useTranslation();
  const format = useFormat();
  const author = post.user.name || t('component.user.unknown');
  const [photo] = photosOf(post.files);
  const content = post.content?.trim();

  return (
    <article className={s.row}>
      <div className={s.text}>
        <h3 className={s.title}>
          <Link to={`/post/${post.id}`} className={s.link}>
            {postTitle(post, t)}
          </Link>
        </h3>
        {content && <p className={s.excerpt}>{content}</p>}
        <p className={s.meta}>
          <Avatar name={author} src={post.user.profile} size={24} />
          <span className={s.author}>{author}</span>
          <time dateTime={parseServerDate(post.created).toISOString()}>
            {format.relativeTime(post.created)}
          </time>
          <span className={s.stat}>
            <Heart aria-hidden='true' className={s.statIcon} />
            <span className={visuallyHidden}>
              {t('component.stats.likes', { count: post.likes_num })}
            </span>
            <span aria-hidden='true'>{post.likes_num}</span>
          </span>
          <span className={s.stat}>
            <MessageCircle aria-hidden='true' className={s.statIcon} />
            <span className={visuallyHidden}>
              {t('component.stats.comments', { count: post.comments_num })}
            </span>
            <span aria-hidden='true'>{post.comments_num}</span>
          </span>
        </p>
      </div>
      {photo && (
        <img src={photo.url} alt='' loading='lazy' className={s.thumb} />
      )}
    </article>
  );
}

export function PostRowSkeleton() {
  return (
    <div className={s.row} aria-hidden='true'>
      <div className={s.text}>
        <Skeleton width='70%' height={20} />
        <Skeleton width='95%' height={16} />
        <Skeleton width='40%' height={14} />
      </div>
    </div>
  );
}
