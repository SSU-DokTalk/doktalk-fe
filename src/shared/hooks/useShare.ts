import { useCallback, useEffect, useState } from 'react';

export type ShareStatus = 'idle' | 'copied' | 'failed';

/**
 * 공유하기. 휴대폰처럼 공유 창이 있으면 띄우고, 없으면 주소를 복사해요.
 * status로 복사 결과를 잠깐 알려줘요.
 */
export function useShare() {
  const [status, setStatus] = useState<ShareStatus>('idle');

  useEffect(() => {
    if (status === 'idle') return;
    const timer = window.setTimeout(() => setStatus('idle'), 2400);
    return () => window.clearTimeout(timer);
  }, [status]);

  const share = useCallback(
    async ({ title, url }: { title: string; url: string }) => {
      if (typeof navigator.share === 'function') {
        try {
          await navigator.share({ title, url });
          return;
        } catch (error) {
          // 사용자가 공유 창을 닫은 경우
          if (error instanceof DOMException && error.name === 'AbortError') {
            return;
          }
        }
      }
      try {
        await navigator.clipboard.writeText(url);
        setStatus('copied');
      } catch {
        setStatus('failed');
      }
    },
    []
  );

  return { share, status };
}
