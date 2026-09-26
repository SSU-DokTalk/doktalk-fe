import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/**
 * 목록 끝의 표시 요소가 화면에 가까워지면 다음 페이지를 불러와요.
 * 반환값을 목록 끝 요소의 ref로 넘겨요.
 *
 * ```tsx
 * const loadMoreRef = useLoadMoreOnScroll({
 *   enabled: hasNextPage && !isFetchingNextPage,
 *   onLoadMore: fetchNextPage,
 * });
 * <div ref={loadMoreRef} />
 * ```
 */
export function useLoadMoreOnScroll({
  enabled,
  onLoadMore,
  rootMargin = '480px',
}: {
  enabled: boolean;
  onLoadMore: () => void;
  rootMargin?: string;
}) {
  const [node, setNode] = useState<Element | null>(null);
  const onLoadMoreRef = useRef(onLoadMore);

  useLayoutEffect(() => {
    onLoadMoreRef.current = onLoadMore;
  });

  useEffect(() => {
    if (!node || !enabled) return;
    // 다시 켜질 때마다 새로 관찰해서, 불러온 뒤에도 끝이 보이면 이어서 불러와요.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          onLoadMoreRef.current();
        }
      },
      { rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node, enabled, rootMargin]);

  return setNode;
}
