import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeToggle } from "@/src/components/ui/ThemeToggle";
import { useEntryAnimation } from "@/src/hooks/useAnimations";
import { useTheme } from "@/src/hooks/useTheme";
import Animated from "react-native-reanimated";

type Props = {
  eyebrow: string;
  title: string;
  showToggle?: boolean;
};

export function AnimatedHeader({ eyebrow, title, showToggle = true }: Props) {
  const { theme } = useTheme();
  const style = useEntryAnimation(0);

  return (
    <Animated.View style={[styles.container, style]}>
      <View style={styles.topRow}>
        <View style={[styles.logo, { backgroundColor: theme.colors.card }]}>
          <Ionicons name="storefront" size={22} color={theme.accent.orange} />
        </View>
        {showToggle ? <ThemeToggle /> : null}
      </View>
      <Text style={[styles.eyebrow, { color: theme.accent.blue }]}>
        {eyebrow}
      </Text>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        {title}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 22,
  },
  topRow: {
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    height: 48,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.3,
    textTransform: "uppercase",
  },
  title: {
    marginTop: 8,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "900",
    letterSpacing: -1.1,
  },
});
