/** Shared shop types (UI + billing). Product rows from API are mapped to `ShopProduct` for cards. */

export type BillItem = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  unit?: string;
};

export type Bill = {
  id: string;
  customerName: string;
  customerPhone: string;
  items: BillItem[];
  total: number;
  /** Display string */
  createdAt: string;
  /** ISO timestamp for sorting / charts */
  createdAtIso: string;
};

/** Product as shown in grid/cards (includes derived `color` and string `id`). */
export type ShopProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  unit?: string;
  color: string;
};

export type CustomerLeader = {
  name: string;
  segment: string;
  spend: string;
  progress: number;
};
