import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { api } from '@/shared/api/client';
import {
  nextPageParam,
  type Page,
  type PublicUser,
  type User,
  type UserBrief,
} from '@/shared/api/models';
import { uploadFiles } from '@/shared/api/upload';
import { useAppDispatch } from '@/stores/hooks';
import { setUser } from '@/stores/user';

export type FollowListKind = 'followers' | 'followings';

const FOLLOW_PAGE_SIZE = 20;

export const userKeys = {
  all: ['users'] as const,
  /** 로그인한 나. 팔로워 수·자기소개까지 있어요. */
  me: (viewerId: number) => [...userKeys.all, 'me', viewerId] as const,
  detail: (id: number) => [...userKeys.all, 'detail', id] as const,
  /** viewerId가 targetId를 팔로우하는지 */
  following: (targetId: number, viewerId: number) =>
    [...userKeys.all, 'following', targetId, viewerId] as const,
  follows: (id: number, kind: FollowListKind) =>
    [...userKeys.all, kind, id] as const,
};

export function useMe(viewerId: number) {
  return useQuery({
    queryKey: userKeys.me(viewerId),
    queryFn: ({ signal }) => api.get('/user/me', { signal }),
    enabled: viewerId > 0,
  });
}

export function useUser(id: number) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: ({ signal }) =>
      api.get('/user/{user_id}', { path: { user_id: id }, signal }),
    enabled: id > 0,
  });
}

/** 팔로워·팔로잉 목록. 탈퇴한 사람은 빼요. 로그인해야 볼 수 있어요. */
export function useFollowList(
  userId: number,
  kind: FollowListKind,
  enabled: boolean
) {
  return useInfiniteQuery({
    queryKey: userKeys.follows(userId, kind),
    queryFn: async ({ pageParam, signal }): Promise<Page<UserBrief>> => {
      const options = {
        path: { user_id: userId },
        query: { page: pageParam, size: FOLLOW_PAGE_SIZE },
        signal,
      };
      const people =
        kind === 'followers'
          ? await api
              .get('/user/{user_id}/followers', options)
              .then((page) => ({
                ...page,
                items: page.items.map((item) => item.follower),
              }))
          : await api
              .get('/user/{user_id}/followings', options)
              .then((page) => ({
                ...page,
                items: page.items.map((item) => item.following),
              }));
      return {
        ...people,
        items: people.items.filter(
          (person): person is UserBrief => !!person && !person.is_deleted
        ),
      };
    },
    initialPageParam: 1,
    getNextPageParam: nextPageParam,
    enabled: enabled && userId > 0,
  });
}

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

const bumpCount = <T extends PublicUser>(
  user: T | undefined,
  field: 'follower_num' | 'following_num',
  delta: number
) => (user ? { ...user, [field]: Math.max(0, user[field] + delta) } : user);

/**
 * 팔로우·언팔로우. 버튼과 두 사람의 팔로워·팔로잉 수를 바로 바꾸고 실패하면 되돌려요.
 * 열려 있는 팔로우 목록은 순서가 바뀌지 않게 그대로 두고, 다음에 열 때 다시 불러와요.
 */
export function useToggleFollow(targetId: number, viewerId: number) {
  const queryClient = useQueryClient();
  const followingKey = userKeys.following(targetId, viewerId);
  const targetKey = userKeys.detail(targetId);
  const meKey = userKeys.me(viewerId);

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
      await Promise.all(
        [followingKey, targetKey, meKey].map((queryKey) =>
          queryClient.cancelQueries({ queryKey })
        )
      );
      const previous = {
        following: queryClient.getQueryData<boolean>(followingKey),
        target: queryClient.getQueryData<PublicUser>(targetKey),
        me: queryClient.getQueryData<User>(meKey),
      };
      const delta = follow ? 1 : -1;
      queryClient.setQueryData(followingKey, follow);
      queryClient.setQueryData<PublicUser>(targetKey, (user) =>
        bumpCount(user, 'follower_num', delta)
      );
      queryClient.setQueryData<User>(meKey, (user) =>
        bumpCount(user, 'following_num', delta)
      );
      return previous;
    },
    onError: (_error, _follow, previous) => {
      queryClient.setQueryData(followingKey, previous?.following);
      queryClient.setQueryData(targetKey, previous?.target);
      queryClient.setQueryData(meKey, previous?.me);
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: targetKey });
      void queryClient.invalidateQueries({ queryKey: meKey });
      for (const queryKey of [
        userKeys.follows(targetId, 'followers'),
        userKeys.follows(viewerId, 'followings'),
      ]) {
        void queryClient.invalidateQueries({ queryKey, refetchType: 'none' });
      }
    },
  });
}

/* ---------- 프로필 편집 ---------- */

export const NAME_MAX = 40;
export const INTRODUCTION_MAX = 255;

export type ProfileInput = {
  name: string;
  introduction: string;
  /** 지금 사진 주소. 바꾸지 않으면 그대로 보내요 (빠지면 서버가 사진을 지워요). */
  currentPhoto: string | null;
  /** 새로 고른 사진. 저장할 때 먼저 올려요. */
  photo: File | null;
  removePhoto: boolean;
};

/** 사진 업로드 단계에서 실패했는지 구분해요 (안내 문구가 달라요). */
export class ProfileUploadError extends Error {}

/**
 * 프로필 저장. 서버는 사진·이름·소개를 한 번에 덮어써요.
 * 저장하면 앱 전체의 내 이름·사진(Redux)과, 작성자 정보가 담긴 목록을 새로 고쳐요.
 */
export function useUpdateProfile(viewerId: number) {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (input: ProfileInput) => {
      let profile = input.removePhoto ? null : input.currentPhoto;
      if (input.photo) {
        try {
          const [uploaded] = await uploadFiles([input.photo], 'profile');
          profile = uploaded.url;
        } catch (error) {
          throw new ProfileUploadError(String(error));
        }
      }
      return api.patch('/user/me', {
        body: {
          profile,
          name: input.name.trim(),
          introduction: input.introduction.trim() || null,
        },
      });
    },
    onSuccess: (user) => {
      queryClient.setQueryData(userKeys.me(viewerId), user);
      dispatch(
        setUser({
          id: user.id,
          name: user.name ?? undefined,
          profile: user.profile ?? undefined,
          role: user.role,
        })
      );
      void queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] !== userKeys.all[0],
      });
    },
  });
}
