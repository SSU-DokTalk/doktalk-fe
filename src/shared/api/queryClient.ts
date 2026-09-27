import { QueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

/** 400번대 오류는 다시 요청해도 결과가 같아서 재시도하지 않아요. */
function shouldRetry(failureCount: number, error: unknown) {
  if (isAxiosError(error) && error.response && error.response.status < 500) {
    return false;
  }
  return failureCount < 2;
}

/**
 * 서버 데이터 캐시. 같은 데이터를 여러 화면이 같이 쓰고,
 * 글을 쓰거나 지우면 invalidateQueries로 다시 불러와요.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: shouldRetry,
      // 무한 스크롤 목록은 창을 오갈 때마다 모든 페이지를 다시 받아서 꺼 둬요.
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});
