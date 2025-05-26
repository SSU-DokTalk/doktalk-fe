export type CheckoutKey = {
  clientKey: string;
  customerKey: string;
};

export type CheckoutAmount = {
  value: number;
  currency: string; // KRW
};

export type CheckoutData = {
  orderId: string;
  orderName: string;

  customerName?: string;
  customerEmail?: string;
  customerMobilePhone?: string;
};
