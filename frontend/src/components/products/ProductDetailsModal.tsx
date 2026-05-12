import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AnimatedModal } from "@/src/components/ui/AnimatedModal";
import { GradientButton } from "@/src/components/ui/GradientButton";
import { ShopProduct } from "@/src/types/shop";
import { formatBillQuantity } from "@/src/utils/billing";
import { formatCurrency } from "@/src/utils/formatters";
import { useTheme } from "@/src/hooks/useTheme";

type Props = {
  product: ShopProduct | null;
  onClose: () => void;
};

export function ProductDetailsModal({ product, onClose }: Props) {
  const { theme } = useTheme();

  return (
    <AnimatedModal visible={Boolean(product)} title={product?.name ?? "Product"} onClose={onClose}>
      {product ? (
        <View>
          <View style={[styles.hero, { backgroundColor: `${product.color}18` }]}>
            <Ionicons name="cube" size={64} color={product.color} />
          </View>
          <View style={styles.infoRow}>
            <Info label="Price" value={formatCurrency(product.price)} />
            <Info label="Stock" value={formatBillQuantity(product.stock, product.unit)} />
            <Info label="Type" value={product.category} />
          </View>
          <GradientButton label="Ready for counter sale" icon={<Ionicons name="receipt" size={18} color="#FFF" />} />
        </View>
      ) : null}
    </AnimatedModal>
  );

  function Info({ label, value }: { label: string; value: string }) {
    return (
      <View>
        <Text style={[styles.infoLabel, { color: theme.colors.muted }]}>
          {label}
        </Text>
        <Text style={[styles.infoValue, { color: theme.colors.text }]}>
          {value}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hero: {
    marginBottom: 20,
    height: 176,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
  },
  infoRow: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  infoValue: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "900",
  },
});
