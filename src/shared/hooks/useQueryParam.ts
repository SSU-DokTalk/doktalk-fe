import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebouncedValue } from './useDebouncedValue';

/**
 * 검색어처럼 입력하는 값을 주소(?key=)와 맞춰요.
 * 입력칸은 바로 바뀌고, 주소는 입력이 멈추거나(debounce) 제출하면 바뀌어요.
 * delay를 0으로 두면 제출할 때만 바뀌어요.
 */
export function useQueryParam(key: string, delay = 500) {
  const [params, setParams] = useSearchParams();
  const value = params.get(key)?.trim() ?? '';
  const [text, setText] = useState(value);
  const synced = useRef(value);

  const commit = useCallback(
    (next: string) => {
      synced.current = next;
      setParams(
        (previous) => {
          const updated = new URLSearchParams(previous);
          if (next) updated.set(key, next);
          else updated.delete(key);
          return updated;
        },
        { replace: true }
      );
    },
    [key, setParams]
  );

  useEffect(() => {
    if (value === synced.current) return;
    synced.current = value;
    setText(value);
  }, [value]);

  const debounced = useDebouncedValue(text.trim(), delay);
  useEffect(() => {
    if (delay <= 0 || debounced === synced.current) return;
    commit(debounced);
  }, [debounced, delay, commit]);

  return {
    /** 주소에 반영된 값 */
    value,
    text,
    setText,
    submit: () => {
      const next = text.trim();
      if (next !== synced.current) commit(next);
    },
    clear: () => {
      setText('');
      commit('');
    },
  };
}
