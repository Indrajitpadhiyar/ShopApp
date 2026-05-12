import type { Bill } from "@/src/types/shop";

export function mapApiBillToBill(doc: any): Bill {
  const created = doc?.createdAt ? new Date(doc.createdAt) : new Date();
  return {
    id: doc?.displayId || String(doc?._id ?? ""),
    customerName: String(doc?.customerName ?? "Walk-in customer"),
    customerPhone: String(doc?.customerPhone ?? ""),
    items: Array.isArray(doc?.items) ? doc.items : [],
    total: Number(doc?.total ?? 0),
    createdAt: created.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }),
    createdAtIso: created.toISOString(),
  };
}
