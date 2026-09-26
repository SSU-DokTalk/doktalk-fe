import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/api/client';
import { useAppDispatch } from '@/stores/hooks';
import { updateGlobalState } from '@/stores/globalStates';

export const userKeys = {
  all: ['users'] as const,
  /** viewerId가 targetId를 팔로우하는지 */
  following: (targetId: number, viewerId: number) =>
    [...userKeys.all, 'following', targetId, viewerId] as const,
};

export function useIsFollowing(targetId: number, viewerId: number) {
  return useQuery({
    queryKey: userKeys.following(targetId, viewerId),
    queryFn: ({ signal }) =>
      api.get('/user/is-following/{target_user_id}', {
        path: { target_user_id: targetId },
        signal,
      }),
    enabled: targetId > 0 && viewerId > 0 && targetId !== viewerId,
  });
}

/** 팔로우·언팔로우. 왼쪽 칼럼의 팔로잉 수도 다시 불러오게 해요. */
export function useToggleFollow(targetId: number, viewerId: number) {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const key = userKeys.following(targetId, viewerId);

  return useMutation({
    mutationFn: (follow: boolean) =>
      follow
        ? api.post('/user/follow/{target_user_id}', {
            path: { target_user_id: targetId },
          })
        : api.delete('/user/follow/{target_user_id}', {
            path: { target_user_id: targetId },
          }),
    onMutate: async (follow) => {
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<boolean>(key);
      queryClient.setQueryData(key, follow);
      return { previous };
    },
    onError: (_error, _follow, context) => {
      queryClient.setQueryData(key, context?.previous);
    },
    onSuccess: () => {
      // 기존 화면(마이페이지·셸)은 이 플래그를 보고 팔로워 수를 다시 불러와요.
      dispatch(updateGlobalState({ isFollowerUpdated: true }));
    },
  });
}
