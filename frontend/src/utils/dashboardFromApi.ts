import type { Bill } from "@/src/types/shop";
import { formatCurrency } from "@/src/utils/formatters";

export type StatCard = { label: string; value: string; delta: string; tone: "blue" | "emerald" | "orange" | "purple" };

export function computeStatsFromData(params: { bills: Bill[]; stockValue: number; productCount: number }): StatCard[] {
  const totalSales = params.bills.reduce((s, b) => s + b.total, 0);
  const uniqueCustomers = new Set(params.bills.map((b) => b.customerName.trim() || "Walk-in")).size;

  return [
    { label: "Cash sales", value: formatCurrency(totalSales), delta: params.bills.length ? `${params.bills.length} bills` : "—", tone: "blue" },
    { label: "Bills", value: String(params.bills.length), delta: "Total saved", tone: "emerald" },
    { label: "Stock value", value: formatCurrency(params.stockValue), delta: `${params.productCount} SKUs`, tone: "orange" },
    { label: "Customers", value: String(uniqueCustomers), delta: "Unique names", tone: "purple" },
  ];
}

/** Last 7 calendar days (local) normalized to max 100 for chart bars. */
export function weeklyBillTotals(bills: { createdAtIso: string; total: number }[]): number[] {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - 6);
  start.setHours(0, 0, 0, 0);

  const dayTotals = new Map<string, number>();
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const key = d.toDateString();
    dayTotals.set(key, 0);
  }

  for (const bill of bills) {
    const parsed = Date.parse(bill.createdAtIso);
    if (Number.isNaN(parsed)) continue;
    const d = new Date(parsed);
    const key = d.toDateString();
    if (dayTotals.has(key)) {
      dayTotals.set(key, (dayTotals.get(key) ?? 0) + bill.total);
    }
  }

  const values = [...dayTotals.values()];
  const max = Math.max(...values, 1);
  return values.map((v) => Math.round((v / max) * 100));
}

export type ActivityRow = { title: string; meta: string; time: string };

export function recentActivitiesFromData(bills: Bill[], productNamesLowStock: { name: string; stock: number; unit?: string }[]): ActivityRow[] {
  const out: ActivityRow[] = [];

  for (const bill of bills.slice(0, 3)) {
    out.push({
      title: "Counter bill",
      meta: `${bill.id} • ${formatCurrency(bill.total)}`,
      time: bill.createdAt,
    });
  }

  for (const p of productNamesLowStock.slice(0, 2)) {
    out.push({
      title: "Low stock",
      meta: `${p.name} has ${p.stock} ${p.unit ?? "pcs"} left`,
      time: "—",
    });
  }

  return out.slice(0, 6);
}
