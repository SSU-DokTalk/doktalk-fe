import axios, { isAxiosError } from 'axios';
import type { paths } from './schema';

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

/** 해당 메서드가 있는 경로만 골라요. */
type PathsWith<M extends Method> = {
  [P in keyof paths]: paths[P][M] extends undefined ? never : P;
}[keyof paths];

type Operation<P extends keyof paths, M extends Method> = NonNullable<
  paths[P][M]
>;

type QueryOf<Op> = Op extends { parameters: { query?: infer Q } } ? Q : never;
type PathParamsOf<Op> = Op extends { parameters: { path: infer Q } }
  ? Q
  : never;
type BodyOf<Op> = Op extends { requestBody?: infer Body }
  ? Body extends { content: { 'application/json': infer B } }
    ? B
    : never
  : never;
type ResponseOf<Op> = Op extends {
  responses: { 200: { content: { 'application/json': infer R } } };
}
  ? R
  : void;

export type RequestOptions<Op> = {
  query?: QueryOf<Op>;
  path?: PathParamsOf<Op>;
  body?: BodyOf<Op>;
  signal?: AbortSignal;
};

/** '/debate/{debate_id}' → '/debate/3' */
function fillPath(template: string, params: object | undefined) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const value = (params as Record<string, unknown> | undefined)?.[key];
    if (value === undefined || value === null) {
      throw new Error(`경로 파라미터 ${key}가 없어요: ${template}`);
    }
    return encodeURIComponent(String(value));
  });
}

async function request<M extends Method, P extends PathsWith<M>>(
  method: M,
  path: P,
  options: RequestOptions<Operation<P, M>> = {}
): Promise<ResponseOf<Operation<P, M>>> {
  const { data } = await axios.request({
    method,
    url: `/api${fillPath(path, options.path ?? undefined)}`,
    params: options.query,
    data: options.body,
    signal: options.signal,
    // FastAPI는 배열을 ids=1&ids=2로 받아요. axios 기본값은 ids[]=1&ids[]=2예요.
    paramsSerializer: { indexes: null },
  });
  return data;
}

/**
 * 백엔드 명세(schema.d.ts)로 경로·파라미터·응답 타입을 검사하는 API 호출이에요.
 * 로그인 헤더와 토큰 재발급은 기존 axios 설정(TokenRefresher)을 그대로 써요.
 *
 * ```ts
 * const page = await api.get('/debate', { query: { sortby: 'latest', page: 1 } });
 * await api.post('/debate/{debate_id}/like', { path: { debate_id: 3 } });
 * ```
 *
 * 백엔드에 response_model이 없는 API는 응답 타입이 unknown이라 쓰는 쪽에서 타입을 적어요.
 */
export const api = {
  get: <P extends PathsWith<'get'>>(
    path: P,
    options?: RequestOptions<Operation<P, 'get'>>
  ) => request('get', path, options),
  post: <P extends PathsWith<'post'>>(
    path: P,
    options?: RequestOptions<Operation<P, 'post'>>
  ) => request('post', path, options),
  put: <P extends PathsWith<'put'>>(
    path: P,
    options?: RequestOptions<Operation<P, 'put'>>
  ) => request('put', path, options),
  patch: <P extends PathsWith<'patch'>>(
    path: P,
    options?: RequestOptions<Operation<P, 'patch'>>
  ) => request('patch', path, options),
  delete: <P extends PathsWith<'delete'>>(
    path: P,
    options?: RequestOptions<Operation<P, 'delete'>>
  ) => request('delete', path, options),
};

/** 요청 실패의 HTTP 상태 코드 (네트워크 오류면 undefined) */
export function httpStatus(error: unknown): number | undefined {
  return isAxiosError(error) ? error.response?.status : undefined;
}

/** 서버가 알려 준 오류 코드. FastAPI detail이 문자열이면 그대로, 객체면 detail.code예요. */
export function apiErrorCode(error: unknown): string | undefined {
  if (!isAxiosError(error)) return undefined;
  const data: unknown = error.response?.data;
  const detail = (data as { detail?: unknown } | undefined)?.detail;
  if (typeof detail === 'string') return detail;
  const code = (detail as { code?: unknown } | null | undefined)?.code;
  return typeof code === 'string' ? code : undefined;
}
