import type { ShopProduct } from "@/src/types/shop";

const productColors = ["#2563EB", "#7C3AED", "#10B981", "#F97316", "#F43F5E", "#0EA5E9"];

export function apiProductToShopProduct(raw: any, index: number): ShopProduct {
  const id = String(raw?._id ?? raw?.id ?? "");
  const name = String(raw?.name ?? "");
  const category = String(raw?.category ?? "");
  const price = Number(raw?.price ?? 0);
  const stock = Number(raw?.stock ?? 0);
  const unit = raw?.unit != null ? String(raw.unit) : "pcs";
  const color = productColors[index % productColors.length];

  return { id, name, category, price, stock, unit, color };
}
