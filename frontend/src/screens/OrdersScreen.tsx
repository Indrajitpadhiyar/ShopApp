import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AnimatedHeader } from "@/src/components/layouts/AnimatedHeader";
import { ScreenWrapper } from "@/src/components/layouts/ScreenWrapper";
import { BillCard } from "@/src/components/billing/BillCard";
import { BillComposerModal } from "@/src/components/billing/BillComposerModal";
import { GradientButton } from "@/src/components/ui/GradientButton";
import { GlassCard } from "@/src/components/ui/GlassCard";
import { useTheme } from "@/src/hooks/useTheme";
import { formatCurrency } from "@/src/utils/formatters";
import { useListBillsQuery } from "@/src/store/api";
import { mapApiBillToBill } from "@/src/utils/mapBill";

export function BillsScreen() {
  const { data } = useListBillsQuery({ page: 1, limit: 100 });
  const { theme } = useTheme();
  const [billOpen, setBillOpen] = useState(false);

  const bills = useMemo(() => (data?.bills ?? []).map(mapApiBillToBill), [data?.bills]);
  const todayTotal = bills.reduce((sum, bill) => sum + bill.total, 0);

  return (
    <ScreenWrapper>
      <AnimatedHeader eyebrow="Counter" title="Bills" />
      <GlassCard className="mb-5">
        <View style={styles.summaryRow}>
          <View>
            <Text style={[styles.summaryLabel, { color: theme.colors.muted }]}>All-time (loaded)</Text>
            <Text style={[styles.summaryValue, { color: theme.colors.text }]}>{formatCurrency(todayTotal)}</Text>
            <Text style={[styles.summaryNote, { color: theme.colors.muted }]}>{bills.length} bills in database</Text>
          </View>
          <Ionicons name="receipt" size={38} color={theme.accent.orange} />
        </View>
      </GlassCard>
      <GradientButton label="Make new bill" icon={<Ionicons name="add-circle" size={18} color="#FFF" />} onPress={() => setBillOpen(true)} />
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent bills</Text>
      {bills.map((bill) => (
        <BillCard key={bill.id} bill={bill} />
      ))}
      <BillComposerModal visible={billOpen} onClose={() => setBillOpen(false)} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: "800",
  },
  summaryValue: {
    marginTop: 8,
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: -1,
  },
  summaryNote: {
    marginTop: 6,
    fontSize: 13,
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: "900",
  },
});
