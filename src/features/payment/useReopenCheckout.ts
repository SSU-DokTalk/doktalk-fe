import { useLocation } from 'react-router-dom';

/**
 * 결제 실패 화면의 '다시 결제하기'로 돌아왔으면 결제 창을 바로 열어요.
 * 처음 그릴 때 한 번만 읽어요 (useState 초기값으로 써요).
 */
export function useReopenCheckout() {
  const location = useLocation();
  return Boolean(
    (location.state as { openCheckout?: boolean } | null)?.openCheckout
  );
}
