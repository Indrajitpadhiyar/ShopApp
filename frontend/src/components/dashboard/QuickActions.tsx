import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AnimatedButton } from "@/src/components/ui/AnimatedButton";
import { GradientButton } from "@/src/components/ui/GradientButton";
import { useTheme } from "@/src/hooks/useTheme";

export function QuickActions() {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.action}>
        <GradientButton label="New bill" icon={<Ionicons name="receipt" size={18} color="#FFF" />} />
      </View>
      <View style={styles.action}>
        <AnimatedButton label="Stock check" icon={<Ionicons name="cube" size={18} color={theme.accent.blue} />} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flexDirection: "row",
    columnGap: 12,
  },
  action: {
    flex: 1,
  },
});
