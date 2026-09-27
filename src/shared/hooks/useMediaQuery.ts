import { useCallback, useSyncExternalStore } from 'react';

/**
 * 미디어 쿼리가 맞는지 알려줘요. `useMediaQuery(mq.md)`
 * 모양은 CSS로 바꾸고, 컴포넌트의 size prop처럼 JS에서 골라야 할 때만 써요.
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', onChange);
      return () => list.removeEventListener('change', onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}
