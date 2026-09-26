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

/** fastapi-pagination의 Page 응답 */
export type Page<T> = {
  items: T[];
  total: number | null;
  page: number | null;
  size: number | null;
  pages?: number | null;
};

/** 무한 스크롤의 다음 페이지 번호. 마지막 페이지면 undefined예요. */
export function nextPageParam(last: Page<unknown>): number | undefined {
  const page = last.page ?? 1;
  const pages = last.pages ?? 0;
  return page < pages ? page + 1 : undefined;
}
