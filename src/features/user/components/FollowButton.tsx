import { Check, UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button, type ButtonProps } from '@/design-system';
import { useIsFollowing, useToggleFollow } from '../api';

type FollowButtonProps = Pick<
  ButtonProps,
  'size' | 'className' | 'fullWidth'
> & {
  targetId: number;
  viewerId: number;
  /**
   * default: 작성자 줄의 작은 버튼.
   * strong: 프로필·팔로우 목록 버튼. 팔로우는 남색 채움, 팔로잉은 흰 버튼에 체크.
   */
  emphasis?: 'default' | 'strong';
};

/**
 * 팔로우 버튼. 로그인했고 다른 사람일 때만 보여요.
 * 누르면 "팔로우"와 "팔로잉"으로 문구가 바뀌어서 aria-pressed는 쓰지 않아요.
 */
export function FollowButton({
  targetId,
  viewerId,
  size = 'sm',
  emphasis = 'default',
  fullWidth,
  className,
}: FollowButtonProps) {
  const { t } = useTranslation();
  const { data: following, isPending } = useIsFollowing(targetId, viewerId);
  const toggle = useToggleFollow(targetId, viewerId);

  if (viewerId <= 0 || targetId === viewerId) return null;

  const strong = emphasis === 'strong';
  const variant = strong
    ? following
      ? 'neutral'
      : 'primary'
    : following
      ? 'tonal'
      : 'outline';

  return (
    <Button
      size={size}
      variant={variant}
      fullWidth={fullWidth}
      className={className}
      startIcon={
        strong ? (
          following ? (
            <Check aria-hidden='true' />
          ) : (
            <UserPlus aria-hidden='true' />
          )
        ) : undefined
      }
      // 누르는 중에 disabled로 바꾸면 키보드 포커스가 사라져서, 클릭만 무시해요.
      disabled={isPending}
      onClick={() => {
        if (!toggle.isPending) toggle.mutate(!following);
      }}
    >
      {following
        ? t('component.follow.following')
        : t('component.follow.follow')}
    </Button>
  );
}
