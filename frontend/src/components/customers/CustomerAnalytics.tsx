import { StyleSheet, Text, View } from "react-native";
import { GlassCard } from "@/src/components/ui/GlassCard";
import { useTheme } from "@/src/hooks/useTheme";

type Props = {
  uniqueCustomers: number;
  billsCount: number;
};

export function CustomerAnalytics({ uniqueCustomers, billsCount }: Props) {
  const { theme } = useTheme();
  const repeatPct = billsCount > 0 ? Math.round((1 - uniqueCustomers / billsCount) * 100) : 0;

  return (
    <GlassCard className="mb-5">
      <Text style={[styles.title, { color: theme.colors.text }]}>Customer health</Text>
      <View style={styles.metrics}>
        <Metric label="Unique customers" value={String(uniqueCustomers)} />
        <Metric label="Bills logged" value={String(billsCount)} />
        <Metric label="Repeat mix" value={`${Math.min(99, Math.max(0, repeatPct))}%`} />
      </View>
    </GlassCard>
  );

  function Metric({ label, value }: { label: string; value: string }) {
    return (
      <View>
        <Text style={[styles.metricLabel, { color: theme.colors.muted }]}>{label}</Text>
        <Text style={[styles.metricValue, { color: theme.colors.text }]}>{value}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "900",
  },
  metrics: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.7,
    textTransform: "uppercase",
  },
  metricValue: {
    marginTop: 5,
    fontSize: 24,
    fontWeight: "900",
  },
});
