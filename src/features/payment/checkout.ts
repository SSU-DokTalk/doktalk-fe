import type { components } from '@/shared/api/schema';

export type ProductType = 'D' | 'S';

/**
 * 결제를 마치면 만드는 구매 기록. 결제 창으로 떠나기 전에 결과 화면 주소에 담아 보내요.
 * 서버가 토스 결제를 직접 확인하게 바뀌기 전까지 쓰는 방식이에요 (별도 작업으로 남겨 둠).
 */
export type PendingPurchase = components['schemas']['CreatePurchaseReq'];

/** 한글이 들어 있어도 주소에 안전하게 담아요 (UTF-8 → base64). */
export function encodePurchase(purchase: PendingPurchase) {
  const bytes = new TextEncoder().encode(JSON.stringify(purchase));
  return btoa(String.fromCharCode(...bytes));
}

export function decodePurchase(value: string | null): PendingPurchase | null {
  if (!value) return null;
  try {
    const bytes = Uint8Array.from(atob(value), (char) => char.charCodeAt(0));
    const data = JSON.parse(new TextDecoder().decode(bytes)) as PendingPurchase;
    const valid =
      (data.product_type === 'D' || data.product_type === 'S') &&
      Number.isInteger(data.product_id) &&
      typeof data.price === 'number';
    return valid ? data : null;
  } catch {
    return null;
  }
}

/** 결제한 상품의 상세 주소 */
export const productPath = (type: ProductType, id: number) =>
  type === 'D' ? `/debate/${id}` : `/summary/${id}`;

/** 결과 화면에서 돌아갈 주소. 우리 사이트 안의 상품 상세만 받아요. */
export function safeProductPath(value: string | null, fallback: string) {
  if (value && /^\/(debate|summary)\/\d+$/.test(value)) return value;
  return fallback;
}
