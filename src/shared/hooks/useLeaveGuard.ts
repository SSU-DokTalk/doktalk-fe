import { useEffect } from 'react';

/** 저장하지 않은 내용이 있을 때 창을 닫거나 새로 고치면 한 번 더 물어봐요. */
export function useLeaveGuard(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [active]);
}
