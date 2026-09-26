import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api/client';
import type { Page, Purchase } from '@/shared/api/models';

/** 서버가 한 번에 주는 최대 개수 (fastapi-pagination 기본 상한) */
const MAX_PAGE_SIZE = 100;
/** 너무 많을 때 요청이 끝없이 이어지지 않게 막아요 (최대 1,000건). */
const MAX_PAGES = 10;
/** 서비스가 열리기 전 날짜. 구매 전체를 볼 때 시작점으로 써요. */
const SERVICE_START = new Date(Date.UTC(2020, 0, 1));
const DAY = 24 * 60 * 60 * 1000;

export const purchaseKeys = {
  all: ['purchases'] as const,
  /** month는 0부터 (Date와 같아요) */
  month: (viewerId: number, year: number, month: number) =>
    [...purchaseKeys.all, 'month', viewerId, year, month] as const,
  history: (viewerId: number) =>
    [...purchaseKeys.all, 'history', viewerId] as const,
};

/**
 * from~to 사이의 내 구매를 끝까지 불러와요. 취소한 구매도 같이 와요(is_deleted).
 * 서버는 시간대 없는 UTC로 비교해서, 내 시간대의 경계를 UTC(Z)로 바꿔 보내요.
 */
async function fetchPurchases(from: Date, to: Date, signal: AbortSignal) {
  const items: Purchase[] = [];
  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const result = (await api.get('/user/purchase', {
      query: {
        _from: from.toISOString(),
        _to: to.toISOString(),
        size: MAX_PAGE_SIZE,
        page,
      },
      signal,
    })) as Page<Purchase>;
    items.push(...result.items);
    if (!result.pages || page >= result.pages) break;
  }
  return items;
}

/** 한 달 동안의 결제 (내 시간대 기준 1일 0시 ~ 다음 달 1일 0시) */
export function useMonthlyPurchases(
  viewerId: number,
  year: number,
  month: number
) {
  return useQuery({
    queryKey: purchaseKeys.month(viewerId, year, month),
    queryFn: ({ signal }) =>
      fetchPurchases(
        new Date(year, month, 1),
        new Date(year, month + 1, 1),
        signal
      ),
    enabled: viewerId > 0,
    placeholderData: keepPreviousData,
  });
}

/**
 * 지금까지 산 것 (취소 제외). 참여한 토론과 산 요약을 여기서 찾아요.
 * 백엔드의 purchased-debates·purchased-summaries가 아직 비어 있어서예요.
 */
export function usePurchaseHistory(viewerId: number) {
  return useQuery({
    queryKey: purchaseKeys.history(viewerId),
    queryFn: async ({ signal }) => {
      const purchases = await fetchPurchases(
        SERVICE_START,
        new Date(Date.now() + DAY),
        signal
      );
      return purchases.filter((purchase) => !purchase.is_deleted);
    },
    enabled: viewerId > 0,
  });
}

/** 구매 목록에서 한 종류(D: 토론, S: 요약)의 상품 id만 최근 순으로 */
export function productIds(
  purchases: Purchase[] | undefined,
  type: Purchase['product_type']
) {
  const ids: number[] = [];
  for (const purchase of purchases ?? []) {
    if (purchase.product_type === type && !ids.includes(purchase.product_id)) {
      ids.push(purchase.product_id);
    }
  }
  return ids;
}
