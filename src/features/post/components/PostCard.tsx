import { MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Avatar, buttonStyles, Skeleton } from '@/design-system';
import type { Post } from '@/shared/api/models';
import { Attachments } from '@/shared/components/Attachments';
import { LikeButton } from '@/shared/components/LikeButton';
import { PhotoGrid } from '@/shared/components/PhotoGrid';
import { photosOf } from '@/shared/files';
import { ShareButton } from '@/shared/components/ShareButton';
import { parseServerDate, useFormat } from '@/shared/format';
import { postTitle } from '../display';
import { PostOwnerMenu } from './PostOwnerMenu';
import * as s from './PostCard.css';

type PostCardProps = {
  post: Post;
  liked: boolean;
  viewerId: number;
  likePending: boolean;
  onToggleLike: () => void;
  onEdit: () => void;
};

/** 피드의 게시글 카드 */
export function PostCard({
  post,
  liked,
  viewerId,
  likePending,
  onToggleLike,
  onEdit,
}: PostCardProps) {
  const { t } = useTranslation();
  const format = useFormat();
  const author = post.user.name || t('component.user.unknown');
  const photos = photosOf(post.files);
  const otherFiles = (post.files ?? []).filter(
    (file) => !photos.includes(file)
  );
  const content = post.content?.trim();
  const to = `/post/${post.id}`;
  const title = postTitle(post, t);

  return (
    <article className={s.card}>
      <div className={s.head}>
        <Avatar name={author} src={post.user.profile} size={40} />
        <Link to={`/user/${post.user.id}`} className={s.author}>
          <span className={s.authorName}>{author}</span>
          <time
            dateTime={parseServerDate(post.created).toISOString()}
            className={s.time}
          >
            {format.relativeTime(post.created)}
          </time>
        </Link>
        {viewerId > 0 && viewerId === post.user.id && (
          <PostOwnerMenu post={post} onEdit={onEdit} />
        )}
      </div>

      <div className={s.text}>
        <h2 className={s.title}>
          <Link to={to} className={s.titleLink}>
            {title}
          </Link>
        </h2>
        {content && (
          <Link to={to} tabIndex={-1} aria-hidden='true' className={s.excerpt}>
            {content}
          </Link>
        )}
      </div>

      <PhotoGrid
        photos={photos}
        size='feed'
        max={2}
        altFor={(index) => t('page.post.photo-alt', { index })}
        moreLabel={(count) => t('page.post.more-photos', { count })}
      />
      <Attachments files={otherFiles} />

      <div className={s.actions}>
        <LikeButton
          liked={liked}
          label={t('component.stats.likes', { count: post.likes_num })}
          disabled={viewerId <= 0 || likePending}
          onToggle={onToggleLike}
        />
        <Link
          to={`${to}#comments`}
          className={buttonStyles({ variant: 'plain' })}
        >
          <MessageCircle aria-hidden='true' />
          {t('component.stats.comments', { count: post.comments_num })}
        </Link>
        <ShareButton title={title} url={`${window.location.origin}${to}`} />
      </div>
    </article>
  );
}

/** 첫 페이지를 불러오는 동안 보여주는 자리 */
export function PostCardSkeleton() {
  return (
    <div className={s.card} aria-hidden='true'>
      <div className={s.head}>
        <Skeleton width={40} height={40} radius='50%' />
        <Skeleton width={120} height={14} />
      </div>
      <Skeleton width='60%' height={20} />
      <Skeleton height={14} />
      <Skeleton width='80%' height={14} />
    </div>
  );
}
