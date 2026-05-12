import { useMemo } from "react";
import { AnimatedSalesCard } from "@/src/components/dashboard/AnimatedSalesCard";
import { RevenueChart } from "@/src/components/dashboard/RevenueChart";
import { StatsOverview } from "@/src/components/dashboard/StatsOverview";
import { QuickActions } from "@/src/components/dashboard/QuickActions";
import { ActivityTimeline } from "@/src/components/dashboard/ActivityTimeline";
import { AnimatedHeader } from "@/src/components/layouts/AnimatedHeader";
import { ScreenWrapper } from "@/src/components/layouts/ScreenWrapper";
import { useListBillsQuery, useListProductsQuery } from "@/src/store/api";
import { mapApiBillToBill } from "@/src/utils/mapBill";
import { computeStatsFromData, recentActivitiesFromData, weeklyBillTotals } from "@/src/utils/dashboardFromApi";
import { formatCurrency } from "@/src/utils/formatters";

export function DashboardScreen() {
  const { data: productRes } = useListProductsQuery({ page: 1, limit: 500 });
  const { data: billRes } = useListBillsQuery({ page: 1, limit: 200 });

  const bills = useMemo(() => (billRes?.bills ?? []).map(mapApiBillToBill), [billRes?.bills]);
  const products = productRes?.products ?? [];

  const stockValue = useMemo(() => products.reduce((s, p) => s + Number(p.price ?? 0) * Number(p.stock ?? 0), 0), [products]);

  const stats = useMemo(
    () => computeStatsFromData({ bills, stockValue, productCount: products.length }),
    [bills, products.length, stockValue],
  );

  const chartHeights = useMemo(() => weeklyBillTotals(bills), [bills]);

  const totalSales = bills.reduce((s, b) => s + b.total, 0);
  const progress = Math.min(1, bills.length / 25);

  const lowStock = useMemo(
    () =>
      products
        .filter((p) => Number(p.stock) < 12)
        .map((p) => ({ name: String(p.name), stock: Number(p.stock), unit: p.unit ? String(p.unit) : "pcs" })),
    [products],
  );

  const activities = useMemo(() => recentActivitiesFromData(bills, lowStock), [bills, lowStock]);

  return (
    <ScreenWrapper>
      <AnimatedHeader eyebrow="Today at Lucky Electrical" title="Shop counter" />
      <AnimatedSalesCard label="Cash sales (bills)" value={formatCurrency(totalSales)} progress={progress} delta={`${bills.length} bills`} />
      <QuickActions />
      <StatsOverview stats={stats} />
      <RevenueChart heightsPct={chartHeights} />
      <ActivityTimeline activities={activities} />
    </ScreenWrapper>
  );
}
