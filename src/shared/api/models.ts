import type { components } from './schema';

type Schemas = components['schemas'];

/** 서버가 돌려주는 모델. 이름만 짧게 바꿔서 써요. */
export type Debate = Schemas['BasicDebateRes'];
export type Summary = Schemas['BasicSummaryRes'];
export type Post = Schemas['BasicPostRes'];
export type Book = Schemas['BookSchema'];
export type UserBrief = Schemas['BasicUserSchema'];
export type User = Schemas['UserSchema'];
export type Purchase = Schemas['PurchaseSchema'];
export type AttachedFile = Schemas['FileDto'];

/**
 * 댓글. 백엔드 댓글 목록 API에 response_model이 없어서 직접 적었어요.
 * 백엔드에 모델이 생기면 schema.d.ts의 타입으로 바꿔요.
 */
export type Comment = {
  id: number;
  user_id: number;
  upper_comment_id?: number | null;
  content?: string | null;
  comments_num: number;
  likes_num: number;
  created: string;
  updated: string;
  user: UserBrief;
};

/** fastapi-pagination의 Page 응답 */
export type Page<T> = {
  items: T[];
  total: number | null;
  page: number | null;
  size: number | null;
  pages?: number | null;
};

/** 무한 스크롤의 다음 페이지 번호. 마지막 페이지면 undefined예요. */
export function nextPageParam(last: {
  page?: number | null;
  pages?: number | null;
}): number | undefined {
  const page = last.page ?? 1;
  const pages = last.pages ?? 0;
  return page < pages ? page + 1 : undefined;
}
