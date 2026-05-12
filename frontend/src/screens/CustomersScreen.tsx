import { useMemo } from "react";
import { StyleSheet, Text } from "react-native";
import { AnimatedHeader } from "@/src/components/layouts/AnimatedHeader";
import { ScreenWrapper } from "@/src/components/layouts/ScreenWrapper";
import { CustomerAnalytics } from "@/src/components/customers/CustomerAnalytics";
import { CustomerCard } from "@/src/components/customers/CustomerCard";
import { useListBillsQuery } from "@/src/store/api";
import { useTheme } from "@/src/hooks/useTheme";
import { mapApiBillToBill } from "@/src/utils/mapBill";
import { billsToCustomerLeaders } from "@/src/utils/customersFromBills";

export function CustomersScreen() {
  const { theme } = useTheme();
  const { data } = useListBillsQuery({ page: 1, limit: 200 });

  const bills = useMemo(() => (data?.bills ?? []).map(mapApiBillToBill), [data?.bills]);
  const leaders = useMemo(() => billsToCustomerLeaders(bills), [bills]);
  const uniqueCustomers = useMemo(() => new Set(bills.map((b) => b.customerName.trim() || "Walk-in")).size, [bills]);

  return (
    <ScreenWrapper>
      <AnimatedHeader eyebrow="CRM" title="Customers" />
      <CustomerAnalytics uniqueCustomers={uniqueCustomers} billsCount={bills.length} />
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>From bills</Text>
      {leaders.length === 0 ? (
        <Text style={{ color: theme.colors.muted }}>No bills yet. Create a bill to see customers here.</Text>
      ) : (
        leaders.map((customer, index) => <CustomerCard key={customer.name} customer={customer} index={index} />)
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: "900",
  },
});
