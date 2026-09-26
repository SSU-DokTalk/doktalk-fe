import { PenLine, SquarePen } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, EmptyState } from '@/design-system';
import { usePostFeed, useTogglePostLike } from '@/features/post/api';
import {
  PostCard,
  PostCardSkeleton,
} from '@/features/post/components/PostCard';
import { PostComposer } from '@/features/post/components/PostComposer';
import * as prompt from '@/features/post/components/WritePrompt.css';
import type { Post, User } from '@/shared/api/models';
import { InfiniteFeed } from '@/shared/components/InfiniteFeed';
import * as s from './ProfileSections.css';

/** 게시글 탭. 내 프로필이면 맨 위에서 바로 글을 쓰고, 새 글은 목록 맨 위에 보여요. */
export function ProfilePosts({
  user,
  viewerId,
}: {
  user: User;
  viewerId: number;
}) {
  const { t } = useTranslation();
  const isMine = viewerId > 0 && viewerId === user.id;
  const query = usePostFeed(viewerId, user.id);
  const toggleLike = useTogglePostLike(viewerId);
  const [composing, setComposing] = useState(false);
  const [editing, setEditing] = useState<Post | undefined>();
  const likedIds = new Set(query.data?.pages.flatMap((page) => page.likedIds));
  const getKey = useCallback((post: Post) => post.id, []);
  const name = user.name || t('component.user.unknown');

  return (
    <>
      {isMine && (
        <div className={`${prompt.prompt} ${s.flatPrompt}`}>
          <Avatar name={name} src={user.profile} size={40} />
          <button
            type='button'
            aria-haspopup='dialog'
            className={prompt.field}
            onClick={() => setComposing(true)}
          >
            {t('component.card.write-post.placeholder')}
          </button>
        </div>
      )}

      <InfiniteFeed
        variant='cards'
        heading={t('page.profile.posts.heading')}
        query={query}
        getKey={getKey}
        renderItem={(post) => (
          <PostCard
            post={post}
            viewerId={viewerId}
            liked={likedIds.has(post.id)}
            likePending={toggleLike.isPending}
            onToggleLike={() =>
              toggleLike.mutate({ id: post.id, like: !likedIds.has(post.id) })
            }
            onEdit={() => setEditing(post)}
          />
        )}
        renderSkeleton={() => <PostCardSkeleton />}
        errorIcon={<SquarePen />}
        errorTitle={t('page.profile.posts.error')}
        errorDescription={t('page.profile.state.error-description')}
        empty={
          <EmptyState
            icon={<PenLine />}
            title={t('page.profile.posts.empty')}
            description={
              isMine ? t('page.profile.posts.empty-description') : undefined
            }
          />
        }
      />

      {isMine && (
        <PostComposer
          open={composing || editing !== undefined}
          post={editing}
          onOpenChange={(open) => {
            if (open) return;
            setComposing(false);
            setEditing(undefined);
          }}
        />
      )}
    </>
  );
}
