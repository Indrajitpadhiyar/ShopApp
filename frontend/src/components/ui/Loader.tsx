import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { useEffect } from "react";
import { useTheme } from "@/src/hooks/useTheme";

export function Loader() {
  const { theme } = useTheme();
  const shimmer = useSharedValue(0.35);

  useEffect(() => {
    shimmer.value = withRepeat(withTiming(1, { duration: 900 }), -1, true);
  }, [shimmer]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: shimmer.value }));

  return (
    <View style={styles.container}>
      {[0, 1, 2].map((item) => (
        <Animated.View key={item} style={[styles.item, animatedStyle, { backgroundColor: theme.colors.border }]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 12,
  },
  item: {
    height: 80,
    borderRadius: 28,
  },
});
