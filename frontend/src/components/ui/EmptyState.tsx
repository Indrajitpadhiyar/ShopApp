import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/src/hooks/useTheme";

type Props = {
  title: string;
  subtitle: string;
};

export function EmptyState({ title, subtitle }: Props) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <Ionicons name="file-tray-outline" size={34} color={theme.colors.muted} />
      <Text style={[styles.title, { color: theme.colors.text }]}>
        {title}
      </Text>
      <Text style={[styles.subtitle, { color: theme.colors.muted }]}>
        {subtitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
    padding: 32,
  },
  title: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "900",
  },
  subtitle: {
    marginTop: 4,
    textAlign: "center",
    fontSize: 14,
  },
});
