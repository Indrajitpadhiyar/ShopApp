import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlassCard } from "@/src/components/ui/GlassCard";
import { useTheme } from "@/src/hooks/useTheme";

export function DrawerMenu() {
  const { theme } = useTheme();
  const items = ["Shop profile", "Stock backup", "Bill settings", "WhatsApp sharing"];

  return (
    <GlassCard>
      {items.map((item) => (
        <View key={item} style={[styles.item, { borderColor: theme.colors.border }]}>
          <Text style={[styles.label, { color: theme.colors.text }]}>
            {item}
          </Text>
          <Ionicons name="chevron-forward" size={18} color={theme.colors.muted} />
        </View>
      ))}
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingVertical: 14,
  },
  label: {
    fontWeight: "800",
  },
});
