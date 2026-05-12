import { StyleSheet, Text, View } from "react-native";
import type { StatCard } from "@/src/utils/dashboardFromApi";
import { GlassCard } from "@/src/components/ui/GlassCard";
import { useTheme } from "@/src/hooks/useTheme";

type Props = { stats: StatCard[] };

export function StatsOverview({ stats }: Props) {
  const { theme } = useTheme();

  if (!stats.length) {
    return (
      <View style={styles.grid}>
        <Text style={{ color: theme.colors.muted }}>Loading stats…</Text>
      </View>
    );
  }

  function toneColor(tone: StatCard["tone"]) {
    if (tone === "emerald") return theme.accent.emerald;
    if (tone === "orange") return theme.accent.orange;
    if (tone === "purple") return theme.accent.blue;
    return theme.accent.blue;
  }

  return (
    <View style={styles.grid}>
      {stats.map((item, index) => (
        <GlassCard key={item.label} delay={index * 80} style={styles.card}>
          <Text style={[styles.label, { color: theme.colors.muted }]}>{item.label}</Text>
          <Text style={[styles.value, { color: theme.colors.text }]}>{item.value}</Text>
          <Text style={[styles.delta, { color: toneColor(item.tone) }]}>{item.delta}</Text>
        </GlassCard>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    marginBottom: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  card: {
    width: "48%",
  },
  label: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  value: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: "900",
  },
  delta: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "800",
  },
});
