# 화면 기능 (`src/features`)

새 디자인으로 옮긴 화면은 도메인별 폴더에 둬요.

```
src/features/<도메인>/
  api.ts          서버 요청과 캐시 키, 쿼리 훅
  components/     그 도메인에서만 쓰는 화면 조각 (+ .css.ts, .stories.tsx)
  pages/          라우트에 연결하는 페이지
src/shared/       여러 도메인이 같이 쓰는 것 (API 클라이언트, 날짜·가격 표시, 훅)
```

- 화면 조각은 디자인 시스템(`@/design-system`) 컴포넌트를 조합해서 만들어요. 스타일은 옆에 둔 `.css.ts`(vanilla-extract)에만 쓰고, 값은 토큰(`@/design-system/tokens`)으로만 적어요. 규칙은 `src/design-system/README.md`에 있어요.
- 한 도메인이 다른 도메인의 조각을 가져다 쓸 수 있어요 (예: 토론 목록 옆 `summary/components/PopularSummaries`).
- 여러 화면에 같은 마크업이 생기면 공용 조각으로 올려요.
  - `shared/components/Stat`: 좋아요·댓글 수 (아이콘 + 숫자, 스크린 리더는 문장으로 읽어요)
  - `post/components/WritePrompt`: 글쓰기 창을 여는 줄 (게시글 목록, 홈, 내 프로필)
  - `shared/files.ts`: 올리는 파일 규칙(형식·크기·개수)과 검사(`checkPicked`)

## 페이지 조각 (코드 스플리팅)

- 라우트에 연결하는 페이지는 `src/pages.ts`에 `page(() => import('...'))`로 등록해요. 화면마다 JS·CSS 조각이 따로 만들어져서, 첫 화면은 셸과 지금 보는 페이지만 받아요.
- 첫 화면을 그린 뒤 브라우저가 한가할 때 나머지 페이지 조각을 미리 받아 둬요 (데이터 절약 모드·2G에서는 받지 않아요).
- 레이아웃의 `RouteBoundary`(`src/shell`)가 조각을 받는 동안의 로딩과 오류 화면을 맡아요. 새 배포로 예전 조각이 사라져서 못 받으면 한 번 새로고침해요.
- 라이브러리(node_modules)는 `vendor` 조각 하나로 묶여서 배포가 바뀌어도 브라우저 캐시에 남아요.

## 서버 요청

```ts
import { api } from '@/shared/api/client';

const page = await api.get('/debate', { query: { sortby: 'latest', page: 1 } });
await api.post('/debate/{debate_id}/like', { path: { debate_id: 3 } });
```

- 경로·파라미터·응답 타입은 백엔드 명세에서 만든 `src/shared/api/schema.d.ts`로 검사해요. 백엔드 API가 바뀌면 `yarn api:types`로 다시 만들어요 (기본값은 로컬 백엔드 `http://localhost:8000/openapi.json`, 다른 주소나 파일을 인자로 줄 수 있어요).
- 백엔드에 `response_model`이 없는 API는 응답 타입이 `unknown`이에요. 쓰는 쪽에서 타입을 적고, 가능하면 백엔드에 `response_model`을 추가해요.
- 요청은 기존 axios를 거쳐서 로그인 헤더와 토큰 재발급(`features/auth/TokenRefresher`)이 그대로 적용돼요. 로그인 토큰은 `features/auth/api.ts`의 `setAccessToken`·`clearTokens`로만 넣고 빼요.
- 모델 타입은 `@/shared/api/models`의 짧은 이름(`Debate`, `Summary` …)을 써요.

## 캐시 (TanStack Query)

- 도메인마다 `api.ts`에 캐시 키 모음(`debateKeys`)과 쿼리 훅을 둬요.
- 글을 쓰거나 지운 뒤에는 `queryClient.invalidateQueries({ queryKey: debateKeys.all })`처럼 도메인 단위로 다시 불러와요.
- 화면끼리 같은 값을 나눌 때도 캐시를 써요. 예를 들어 팔로우하면 `useToggleFollow`가 `userKeys.me`를 고쳐서 왼쪽 칼럼의 팔로잉 수도 같이 바뀌어요. Redux에는 로그인한 사용자(`user`)만 남아 있어요.
- 로그아웃하면 캐시를 모두 비워요 (`useAuth().logout`).
- 무한 스크롤은 `useInfiniteQuery` + `useLoadMoreOnScroll`로 만들어요. 다음 페이지만 실패해도 `status`가 `error`가 되니, 불러 둔 목록이 있으면(`data`) 목록을 유지하고 다시 시도 버튼을 보여줘요.

## 날짜·가격

- 서버 시각은 시간대 표시 없는 UTC예요. `parseServerDate`로 읽고 `useFormat()`으로 표시해요.
- 몽골어는 기기에 따라 Intl 날짜 데이터가 없어서, 요일·"n일 전" 문구는 번역 파일(`function.time.*`)에서 가져와요.
- 가격은 원화예요. `format.price()`는 한국어 `10,000원`, 다른 언어 `₩10,000`으로 보여주고, 0원은 화면에서 '무료'로 바꿔요.
