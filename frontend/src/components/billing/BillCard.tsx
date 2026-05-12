import { Share, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AnimatedButton } from "@/src/components/ui/AnimatedButton";
import { Bill } from "@/src/types/shop";
import { useTheme } from "@/src/hooks/useTheme";
import { buildBillMessage, formatBillQuantity } from "@/src/utils/billing";
import { formatCurrency } from "@/src/utils/formatters";

type Props = {
  bill: Bill;
};

export function BillCard({ bill }: Props) {
  const { theme } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.id, { color: theme.colors.text }]}>{bill.id}</Text>
          <Text style={[styles.meta, { color: theme.colors.muted }]}>{bill.customerName} - {bill.createdAt}</Text>
        </View>
        <Text style={[styles.total, { color: theme.colors.text }]}>{formatCurrency(bill.total)}</Text>
      </View>
      <Text style={[styles.items, { color: theme.colors.muted }]} numberOfLines={2}>
        {bill.items.map((item) => `${item.name} x ${formatBillQuantity(item.quantity, item.unit)}`).join(", ")}
      </Text>
      <AnimatedButton
        label="Send bill"
        icon={<Ionicons name="share-social" size={17} color={theme.accent.blue} />}
        onPress={() => Share.share({ message: buildBillMessage(bill) })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    borderRadius: 28,
    borderWidth: 1,
    padding: 16,
    rowGap: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    columnGap: 12,
  },
  id: {
    fontSize: 16,
    fontWeight: "900",
  },
  meta: {
    marginTop: 4,
    fontSize: 13,
  },
  total: {
    fontSize: 18,
    fontWeight: "900",
  },
  items: {
    fontSize: 14,
    lineHeight: 20,
  },
});
