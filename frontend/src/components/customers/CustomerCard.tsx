  import { StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { useEffect } from "react";
import { useTheme } from "@/src/hooks/useTheme";

type Props = {
  customer: { name: string; segment: string; spend: string; progress: number };
  index: number;
};

export function CustomerCard({ customer, index }: Props) {
  const { theme } = useTheme();
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withDelay(index * 110, withTiming(customer.progress, { duration: 850 }));
  }, [customer.progress, index, width]);

  const progressStyle = useAnimatedStyle(() => ({ width: `${width.value * 100}%` }));

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <View style={styles.row}>
        <View>
          <Text style={[styles.name, { color: theme.colors.text }]}>
            {customer.name}
          </Text>
          <Text style={[styles.segment, { color: theme.colors.muted }]}>
            {customer.segment}
          </Text>
        </View>
        <Text style={[styles.spend, { color: theme.colors.text }]}>
          {customer.spend}
        </Text>
      </View>
      <View style={[styles.track, { backgroundColor: theme.colors.border }]}>
        <Animated.View style={[styles.progress, progressStyle, { backgroundColor: theme.accent.emerald }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    borderRadius: 28,
    borderWidth: 1,
    padding: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "900",
  },
  segment: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "800",
  },
  spend: {
    fontSize: 18,
    fontWeight: "900",
  },
  track: {
    marginTop: 16,
    height: 8,
    overflow: "hidden",
    borderRadius: 999,
  },
  progress: {
    height: 8,
    borderRadius: 999,
  },
});
