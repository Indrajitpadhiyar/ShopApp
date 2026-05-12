import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/src/hooks/useTheme";

export function ThemeToggle() {
  const { mode, theme, toggleTheme } = useTheme();
  const isDark = mode === "dark";
  const knobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(isDark ? 32 : 0, { damping: 15, stiffness: 180 }) }],
  }));

  return (
    <Pressable onPress={toggleTheme} style={styles.container}>
      <View style={[styles.track, { backgroundColor: isDark ? theme.accent.purple : theme.colors.border }]}>
        <Animated.View style={[styles.knob, knobStyle]}>
          <Ionicons name={isDark ? "moon" : "sunny"} size={15} color={isDark ? theme.accent.purple : theme.accent.orange} />
        </Animated.View>
      </View>
      <Text style={[styles.label, { color: theme.colors.text }]}>
        {isDark ? "Dark" : "Light"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  track: {
    width: 68,
    height: 36,
    borderRadius: 999,
    padding: 4,
  },
  knob: {
    height: 28,
    width: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
  },
  label: {
    fontWeight: "800",
  },
});
