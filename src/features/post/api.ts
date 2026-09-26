import {
  infiniteQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  type InfiniteData,
} from '@tanstack/react-query';
import { api } from '@/shared/api/client';
import {
  nextPageParam,
  type AttachedFile,
  type Comment,
  type Page,
  type Post,
} from '@/shared/api/models';
import { uploadFiles } from '@/shared/api/upload';

const PAGE_SIZE = 10;
const COMMENT_PAGE_SIZE = 10;

/** 피드 한 페이지 + 그중 내가 좋아요한 글 id */
export type PostFeedPage = Page<Post> & { likedIds: number[] };

/** 캐시 키. 글을 쓰거나 지우면 postKeys.all로 한 번에 다시 불러와요. */
export const postKeys = {
  all: ['posts'] as const,
  feed: (viewerId: number) => [...postKeys.all, 'feed', viewerId] as const,
  /** 한 사람의 글. 내 피드 키 아래에 둬서 좋아요를 누르면 같이 고쳐져요. */
  userFeed: (userId: number, viewerId: number) =>
    [...postKeys.feed(viewerId), 'user', userId] as const,
  feeds: () => [...postKeys.all, 'feed'] as const,
  /** 첫 화면의 최신 글 몇 개. feeds 아래라 글을 쓰면 같이 새로 불러와요. */
  recent: (size: number) => [...postKeys.feeds(), 'recent', size] as const,
  detail: (id: number) => [...postKeys.all, 'detail', id] as const,
  liked: (id: number, viewerId: number) =>
    [...postKeys.all, 'liked', id, viewerId] as const,
  comments: (id: number) => [...postKeys.all, 'comments', id] as const,
};

/**
 * 최신 게시글, userId를 주면 그 사람의 글.
 * 로그인했으면 페이지마다 좋아요 여부를 같이 불러와요.
 */
export function postFeedQuery(viewerId: number, userId?: number) {
  return infiniteQueryOptions({
    queryKey: userId
      ? postKeys.userFeed(userId, viewerId)
      : postKeys.feed(viewerId),
    queryFn: async ({ pageParam, signal }): Promise<PostFeedPage> => {
      const query = { page: pageParam, size: PAGE_SIZE };
      const page = userId
        ? await api.get('/user/{user_id}/posts', {
            path: { user_id: userId },
            query,
            signal,
          })
        : await api.get('/post/recent', { query, signal });
      const ids = page.items.map((post) => post.id);
      const likedIds =
        viewerId > 0 && ids.length > 0
          ? ((await api.get('/posts/like', {
              query: { ids },
              signal,
            })) as number[])
          : [];
      return { ...page, likedIds };
    },
    initialPageParam: 1,
    getNextPageParam: nextPageParam,
  });
}

export function usePostFeed(viewerId: number, userId?: number) {
  return useInfiniteQuery({
    ...postFeedQuery(viewerId, userId),
    enabled: userId === undefined || userId > 0,
  });
}

/** 최신 글 몇 개 (좋아요 여부 없이). 메인 화면 카드에 써요. */
export function useRecentPosts(size: number) {
  return useQuery({
    queryKey: postKeys.recent(size),
    queryFn: ({ signal }) =>
      api.get('/post/recent', { query: { page: 1, size }, signal }),
  });
}

export function usePost(id: number) {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: ({ signal }) =>
      api.get('/post/{post_id}', { path: { post_id: id }, signal }),
    enabled: id > 0,
  });
}

export function usePostLiked(id: number, viewerId: number) {
  return useQuery({
    queryKey: postKeys.liked(id, viewerId),
    queryFn: async ({ signal }) => {
      const liked = (await api.get('/posts/like', {
        query: { ids: [id] },
        signal,
      })) as number[];
      return liked.includes(id);
    },
    enabled: id > 0 && viewerId > 0,
  });
}

type FeedData = InfiniteData<PostFeedPage>;

/**
 * 좋아요 누르기·취소. 피드와 상세에 바로 반영하고 실패하면 되돌려요.
 * 피드에서는 페이지에 담긴 likedIds와 글의 likes_num을 함께 고쳐요.
 */
export function useTogglePostLike(viewerId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, like }: { id: number; like: boolean }) =>
      like
        ? api.post('/post/{post_id}/like', { path: { post_id: id } })
        : api.delete('/post/{post_id}/like', { path: { post_id: id } }),
    onMutate: async ({ id, like }) => {
      const feedKey = postKeys.feed(viewerId);
      const likedKey = postKeys.liked(id, viewerId);
      const detailKey = postKeys.detail(id);
      await Promise.all([
        queryClient.cancelQueries({ queryKey: feedKey }),
        queryClient.cancelQueries({ queryKey: likedKey }),
      ]);
      const previous = {
        // 전체 피드와 프로필의 글 목록을 모두 담아 둬요.
        feeds: queryClient.getQueriesData<FeedData>({ queryKey: feedKey }),
        liked: queryClient.getQueryData<boolean>(likedKey),
        detail: queryClient.getQueryData<Post>(detailKey),
      };
      const bump = (post: Post) =>
        post.id === id
          ? {
              ...post,
              likes_num: Math.max(0, post.likes_num + (like ? 1 : -1)),
            }
          : post;

      queryClient.setQueriesData<FeedData>({ queryKey: feedKey }, (data) =>
        data
          ? {
              ...data,
              pages: data.pages.map((page) => ({
                ...page,
                items: page.items.map(bump),
                likedIds: like
                  ? [...page.likedIds, id]
                  : page.likedIds.filter((likedId) => likedId !== id),
              })),
            }
          : data
      );
      queryClient.setQueryData(likedKey, like);
      queryClient.setQueryData<Post>(detailKey, (post) =>
        post ? bump(post) : post
      );
      return previous;
    },
    onError: (_error, { id }, previous) => {
      for (const [key, data] of previous?.feeds ?? []) {
        queryClient.setQueryData(key, data);
      }
      queryClient.setQueryData(postKeys.liked(id, viewerId), previous?.liked);
      queryClient.setQueryData(postKeys.detail(id), previous?.detail);
    },
  });
}

/** 댓글 (최신순, 10개씩) */
export function usePostComments(id: number) {
  return useInfiniteQuery({
    queryKey: postKeys.comments(id),
    queryFn: async ({ pageParam, signal }) =>
      (await api.get('/post/{post_id}/comments', {
        path: { post_id: id },
        query: { page: pageParam, size: COMMENT_PAGE_SIZE },
        signal,
      })) as Page<Comment>,
    initialPageParam: 1,
    getNextPageParam: nextPageParam,
    enabled: id > 0,
  });
}

export function useCreatePostComment(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { content: string; upperCommentId?: number }) =>
      api.post('/post/{post_id}/comment', {
        path: { post_id: id },
        body: {
          content: input.content,
          upper_comment_id: input.upperCommentId ?? null,
        },
      }),
    onSuccess: () => {
      queryClient.setQueryData<Post>(postKeys.detail(id), (post) =>
        post ? { ...post, comments_num: post.comments_num + 1 } : post
      );
      void queryClient.invalidateQueries({ queryKey: postKeys.comments(id) });
      void queryClient.invalidateQueries({ queryKey: postKeys.feeds() });
    },
  });
}

/* ---------- 쓰기·수정·삭제 ---------- */

export type PostInput = {
  title: string;
  content: string;
  /** 이미 올라가 있는 사진 (수정할 때) */
  existingFiles: AttachedFile[];
  /** 새로 고른 사진. 먼저 올리고 요청에 붙여요. */
  files: File[];
};

/** 사진 업로드 단계에서 실패했는지 구분해요 (안내 문구가 달라요). */
export class PostUploadError extends Error {}

async function toPostBody(input: PostInput) {
  let uploaded: AttachedFile[];
  try {
    uploaded = await uploadFiles(input.files, 'post');
  } catch (error) {
    throw new PostUploadError(String(error));
  }
  return {
    title: input.title.trim(),
    content: input.content.trim() || null,
    files: [...input.existingFiles, ...uploaded],
  };
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: PostInput) =>
      api.post('/post', { body: await toPostBody(input) }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: postKeys.feeds() }),
  });
}

export function useUpdatePost(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: PostInput) => {
      await api.put('/post/{post_id}', {
        path: { post_id: id },
        body: await toPostBody(input),
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: postKeys.detail(id) });
      void queryClient.invalidateQueries({ queryKey: postKeys.feeds() });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      api.delete('/post/{post_id}', { path: { post_id: id } }),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: postKeys.detail(id) });
      void queryClient.invalidateQueries({ queryKey: postKeys.feeds() });
    },
  });
}
