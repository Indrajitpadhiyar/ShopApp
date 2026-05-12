import { StyleSheet, Text, View } from "react-native";
import { GlassCard } from "@/src/components/ui/GlassCard";
import { useTheme } from "@/src/hooks/useTheme";

const steps = ["Paid", "Packed", "Shipped", "Delivered"];

export function OrderTimeline() {
  const { theme } = useTheme();

  return (
    <GlassCard className="mb-5">
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Order flow
      </Text>
      <View style={styles.steps}>
        {steps.map((step, index) => (
          <View key={step} style={styles.step}>
            <View style={[styles.stepBadge, { backgroundColor: index < 3 ? theme.accent.blue : theme.colors.border }]}>
              <Text style={styles.stepNumber}>{index + 1}</Text>
            </View>
            <Text style={[styles.stepLabel, { color: theme.colors.muted }]}>
              {step}
            </Text>
          </View>
        ))}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
    fontSize: 18,
    fontWeight: "900",
  },
  steps: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  step: {
    alignItems: "center",
  },
  stepBadge: {
    height: 38,
    width: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
  },
  stepNumber: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
  },
  stepLabel: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "800",
  },
});
