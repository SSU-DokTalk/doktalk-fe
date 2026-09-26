import { useEffect, useState } from 'react';

/** 입력이 멈추고 delay(ms)가 지나야 바뀌는 값. 검색어를 칠 때마다 요청하지 않게 써요. */
export function useDebouncedValue<T>(value: T, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
