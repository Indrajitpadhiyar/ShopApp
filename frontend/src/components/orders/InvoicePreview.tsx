import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlassCard } from "@/src/components/ui/GlassCard";
import { useTheme } from "@/src/hooks/useTheme";

export function InvoicePreview() {
  const { theme } = useTheme();

  return (
    <GlassCard className="mb-5">
      <View style={styles.row}>
        <View>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Invoice preview
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.muted }]}>
            Taxes, discounts, and payments balanced.
          </Text>
        </View>
        <Ionicons name="receipt" size={32} color={theme.accent.orange} />
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "900",
  },
  subtitle: {
    marginTop: 5,
    fontSize: 14,
  },
});
