import { useTranslation } from 'react-i18next';
import { Button, type ButtonProps } from '@/design-system';
import { useIsFollowing, useToggleFollow } from '../api';

type FollowButtonProps = Pick<ButtonProps, 'size' | 'className'> & {
  targetId: number;
  viewerId: number;
};

/**
 * 팔로우 버튼. 로그인했고 다른 사람일 때만 보여요.
 * 누르면 "팔로우"와 "팔로잉"으로 문구가 바뀌어서 aria-pressed는 쓰지 않아요.
 */
export function FollowButton({
  targetId,
  viewerId,
  size = 'sm',
  className,
}: FollowButtonProps) {
  const { t } = useTranslation();
  const { data: following, isPending } = useIsFollowing(targetId, viewerId);
  const toggle = useToggleFollow(targetId, viewerId);

  if (viewerId <= 0 || targetId === viewerId) return null;

  return (
    <Button
      size={size}
      variant={following ? 'tonal' : 'outline'}
      className={className}
      disabled={isPending || toggle.isPending}
      onClick={() => toggle.mutate(!following)}
    >
      {following
        ? t('component.follow.following')
        : t('component.follow.follow')}
    </Button>
  );
}
