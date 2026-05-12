import { ReactNode } from "react";
import { Platform, StyleSheet, View, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { useEntryAnimation } from "@/src/hooks/useAnimations";
import { useTheme } from "@/src/hooks/useTheme";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: ViewStyle | ViewStyle[];
};

export function GlassCard({ children, className = "", delay = 0, style }: Props) {
  const { theme, mode } = useTheme();
  const animatedStyle = useEntryAnimation(delay);

  return (
    <Animated.View style={[styles.wrapper, animatedStyle, theme.shadow, style]}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: mode === "dark" ? "rgba(24,24,27,0.9)" : "rgba(255,255,255,0.94)",
            borderColor: theme.colors.border,
          },
          className.includes("mb-5") && styles.mb5,
        ]}
      >
        <View
        style={{
          ...(Platform.OS === "ios" && {
            backdropFilter: "blur(24px)",
          }),
        }}
      >
        {children}
      </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  card: {
    overflow: "hidden",
    borderRadius: 28,
    borderWidth: 1,
    padding: 18,
  },
  mb5: {
    marginBottom: 20,
  },
});
