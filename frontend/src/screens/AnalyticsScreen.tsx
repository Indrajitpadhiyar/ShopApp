import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { AnimatedHeader } from "@/src/components/layouts/AnimatedHeader";
import { ScreenWrapper } from "@/src/components/layouts/ScreenWrapper";
import { GlassCard } from "@/src/components/ui/GlassCard";
import { RevenueChart } from "@/src/components/dashboard/RevenueChart";
import { useTheme } from "@/src/hooks/useTheme";

export function AnalyticsScreen() {
  const { theme } = useTheme();

  return (
    <ScreenWrapper>
      <AnimatedHeader eyebrow="Insights" title="Analytics" />
      <GlassCard className="mb-5">
        <View style={styles.row}>
          <View>
            <Text style={[styles.label, { color: theme.colors.muted }]}>
              Conversion
            </Text>
            <Text style={[styles.value, { color: theme.colors.text }]}>
              12.8%
            </Text>
          </View>
          <Svg width={108} height={108}>
            <Circle cx={54} cy={54} r={42} stroke={theme.colors.border} strokeWidth={10} fill="transparent" />
            <Circle cx={54} cy={54} r={42} stroke={theme.accent.emerald} strokeWidth={10} fill="transparent" strokeDasharray={264} strokeDashoffset={76} strokeLinecap="round" />
          </Svg>
        </View>
      </GlassCard>
      <RevenueChart />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 14,
    fontWeight: "800",
  },
  value: {
    marginTop: 8,
    fontSize: 38,
    fontWeight: "900",
    letterSpacing: -1,
  },
});
