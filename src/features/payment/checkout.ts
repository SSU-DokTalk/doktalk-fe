export type ProductType = 'D' | 'S';

/**
 * 결제 창으로 떠나기 전에 결과 화면 주소(tmp)에 담아 두는 상품 정보.
 * 결과 화면은 이 상품으로 결제 확인을 요청하고, 이름과 가격을 보여줘요.
 * 가격은 보여주기만 해요. 서버가 상품 가격과 토스가 승인한 금액을 직접 확인해요.
 */
export type PendingPurchase = {
  product_type: ProductType;
  product_id: number;
  /** 상품 이름 */
  content: string;
  price: number;
};

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
      typeof data.content === 'string' &&
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
