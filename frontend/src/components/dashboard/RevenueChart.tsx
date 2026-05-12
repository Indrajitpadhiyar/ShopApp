import { StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { useEffect } from "react";
import { GlassCard } from "@/src/components/ui/GlassCard";
import { useTheme } from "@/src/hooks/useTheme";

type Props = { heightsPct: number[] };

export function RevenueChart({ heightsPct }: Props) {
  const { theme } = useTheme();
  const heights = heightsPct.length ? heightsPct : [0, 0, 0, 0, 0, 0, 0];

  return (
    <GlassCard delay={120} className="mb-5">
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Weekly analytics</Text>
        <Text style={[styles.badge, { color: theme.accent.blue, backgroundColor: `${theme.accent.blue}18` }]}>Bills</Text>
      </View>
      <View style={styles.chart}>
        {heights.map((height, index) => (
          <ChartBar key={`bar-${index}`} height={height} delay={index * 90} />
        ))}
      </View>
    </GlassCard>
  );
}

function ChartBar({ height, delay }: { height: number; delay: number }) {
  const { theme } = useTheme();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(delay, withTiming(1, { duration: 760 }));
  }, [delay, progress]);

  const style = useAnimatedStyle(() => ({
    height: `${Math.max(14, height * progress.value)}%`,
  }));

  return (
    <View style={[styles.barTrack, { backgroundColor: theme.colors.border }]}>
      <Animated.View style={[styles.barFill, style, { backgroundColor: height > 80 ? theme.accent.orange : theme.accent.blue }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "900",
  },
  badge: {
    overflow: "hidden",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 12,
    fontWeight: "900",
  },
  chart: {
    height: 164,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  barTrack: {
    height: "100%",
    width: 34,
    justifyContent: "flex-end",
    borderRadius: 999,
  },
  barFill: {
    width: 34,
    borderRadius: 999,
  },
});
