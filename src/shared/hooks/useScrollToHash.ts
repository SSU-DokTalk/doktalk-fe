import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 주소에 #댓글 같은 해시가 있으면 내용이 준비된 뒤 그 위치로 스크롤해요.
 * 앱 안에서 이동하면 브라우저가 해시로 스크롤해 주지 않아서 직접 옮겨요.
 */
export function useScrollToHash(ready: boolean) {
  const { hash } = useLocation();

  useEffect(() => {
    if (!ready || !hash) return;
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    target?.scrollIntoView({ block: 'start' });
  }, [ready, hash]);
}
