import axios from 'axios';
import cookie from 'react-cookies';
import { useEffect } from 'react';
import { useAppDispatch } from '@/stores/hooks';
import { queryClient } from '@/shared/api/queryClient';
import { unsetUser } from './stores/user';

function TokenRefresher({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const refreshAPI = axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const interceptor = axios.interceptors.response.use(
      // 성공적인 응답 처리
      (response) => {
        return response;
      },
      // 응답 에러 처리
      async (error) => {
        const { config } = error;
        // 네트워크 오류처럼 응답이 없으면 그대로 넘겨요.
        if (!error.response) return Promise.reject(error);
        const { status } = error.response;
        const errorCode = error.response.data?.errorCode;

        // access_token 재발급
        if (status === 401) {
          if (errorCode == 'MD1002') {
            const res = await axios
              .post(
                `/api/user/access-token`,
                {},
                {
                  params: {
                    refresh_token: cookie.load('Authorization'),
                  },
                }
              )
              .then(async (res) => {
                // 새 토큰 저장
                const token = res.headers.authorization;
                axios.defaults.headers.common['Authorization'] = token;

                // 새로 응답받은 데이터로 실패한 요청 재시도
                config.headers['Authorization'] = token;
                return refreshAPI(config);
              });
            return res;
          }
          // 잘못됐거나 만료된 refresh_token인 경우 모든 token 초기화
          axios.defaults.headers.common['Authorization'] = '';
          cookie.remove('Authorization', { path: '/' });
          await dispatch(unsetUser());
          // 로그아웃처럼 이전 사람의 캐시도 비워요.
          queryClient.clear();
        }

        // 다른 모든 오류에 대해 처리를 거부하고 오류를 다시 throw
        return Promise.reject(error);
      }
    );
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [dispatch]);
  return <>{children}</>;
}

export default TokenRefresher;
