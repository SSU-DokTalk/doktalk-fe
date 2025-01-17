export type LoginUserInfoType = {
  email: string;
  password: string;
};

export type CreatePurchaseReq = {
  product_type: "D" | "S";
  product_id: number;
  content: string;
  price: number;
  quantity: number;
};
