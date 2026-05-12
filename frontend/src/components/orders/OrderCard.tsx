import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useTheme } from "@/src/hooks/useTheme";

type Props = {
  order: { id: string; customer: string; total: string; status: string; step: number };
};

export function OrderCard({ order }: Props) {
  const { theme } = useTheme();
  const expanded = useSharedValue(0);
  const style = useAnimatedStyle(() => ({
    height: 96 + expanded.value * 54,
  }));

  return (
    <Animated.View style={[styles.card, style, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <Pressable
        onPress={() => {
          expanded.value = withTiming(expanded.value ? 0 : 1, { duration: 260 });
        }}
      >
        <View style={styles.row}>
          <View>
            <Text style={[styles.id, { color: theme.colors.text }]}>
              {order.id}
            </Text>
            <Text style={[styles.customer, { color: theme.colors.muted }]}>
              {order.customer}
            </Text>
          </View>
          <View style={styles.amountWrap}>
            <Text style={[styles.amount, { color: theme.colors.text }]}>
              {order.total}
            </Text>
            <Text style={[styles.badge, { backgroundColor: badgeColor(order.status) }]}>
              {order.status}
            </Text>
          </View>
        </View>
        <View style={[styles.track, { backgroundColor: theme.colors.border }]}>
          <View style={[styles.progress, { width: `${order.step * 100}%`, backgroundColor: badgeColor(order.status) }]} />
        </View>
        <Text style={[styles.note, { color: theme.colors.muted }]}>
          Invoice ready, carrier sync active, customer notifications enabled.
        </Text>
      </Pressable>
    </Animated.View>
  );

  function badgeColor(status: string) {
    if (status === "Paid") return theme.accent.emerald;
    if (status === "Pending") return theme.accent.orange;
    if (status === "Packing") return theme.accent.purple;
    return theme.accent.blue;
  }
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    overflow: "hidden",
    borderRadius: 28,
    borderWidth: 1,
    padding: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  id: {
    fontSize: 16,
    fontWeight: "900",
  },
  customer: {
    marginTop: 4,
    fontSize: 14,
  },
  amountWrap: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 18,
    fontWeight: "900",
  },
  badge: {
    marginTop: 5,
    overflow: "hidden",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
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
  note: {
    marginTop: 16,
    fontSize: 14,
  },
});
