/**
 * 임시 저장. 이 브라우저(localStorage)에만 남아요.
 * 저장소를 쓸 수 없는 환경(사생활 보호 모드 등)에서는 조용히 넘어가요.
 */
export function createDraftStore<T extends object>(key: string, empty: T) {
  return {
    load(): T | null {
      try {
        const raw = window.localStorage.getItem(key);
        if (!raw) return null;
        return { ...empty, ...JSON.parse(raw) };
      } catch {
        return null;
      }
    },
    /** 저장했으면 true */
    save(values: T): boolean {
      try {
        window.localStorage.setItem(key, JSON.stringify(values));
        return true;
      } catch {
        return false;
      }
    },
    clear() {
      try {
        window.localStorage.removeItem(key);
      } catch {
        // 저장소를 쓸 수 없으면 지울 것도 없어요.
      }
    },
  };
}

/** 폼 제출 뒤 첫 번째 오류 칸(없으면 fallback)으로 포커스를 옮겨요. */
export function focusFirstInvalid(
  form: HTMLFormElement | null,
  fallback?: HTMLElement | null
) {
  requestAnimationFrame(() => {
    const first = form?.querySelector<HTMLElement>(
      '[aria-invalid="true"], [data-invalid-focus]'
    );
    (first ?? fallback)?.focus();
  });
}
