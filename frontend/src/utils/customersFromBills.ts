import type { Bill, CustomerLeader } from "@/src/types/shop";
import { formatCurrency } from "@/src/utils/formatters";

export function billsToCustomerLeaders(bills: Bill[], limit = 20): CustomerLeader[] {
  const byName = new Map<string, { total: number; count: number }>();
  for (const bill of bills) {
    const key = bill.customerName.trim() || "Walk-in";
    const prev = byName.get(key) || { total: 0, count: 0 };
    byName.set(key, { total: prev.total + bill.total, count: prev.count + 1 });
  }
  const maxSpend = Math.max(...[...byName.values()].map((v) => v.total), 1);
  const rows: CustomerLeader[] = [...byName.entries()].map(([name, { total, count }]) => ({
    name,
    segment: count > 1 ? "Returning" : "Retail",
    spend: formatCurrency(total),
    progress: Math.min(1, total / maxSpend),
  }));
  rows.sort((a, b) => b.progress - a.progress);
  return rows.slice(0, limit);
}
