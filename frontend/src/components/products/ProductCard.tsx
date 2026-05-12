import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { ShopProduct } from "@/src/types/shop";
import { useEntryAnimation, usePressScale } from "@/src/hooks/useAnimations";
import { useTheme } from "@/src/hooks/useTheme";
import { formatBillQuantity } from "@/src/utils/billing";
import { formatCurrency } from "@/src/utils/formatters";

type Props = {
  product: ShopProduct;
  index: number;
  onPress: (product: ShopProduct) => void;
  /** When set, shows a remove control on the card (does not open details). */
  onRemove?: (product: ShopProduct) => void;
};

export function ProductCard({ product, index, onPress, onRemove }: Props) {
  const { theme } = useTheme();
  const entryStyle = useEntryAnimation(index * 70);
  const { animatedStyle, pressIn, pressOut } = usePressScale();

  return (
    <Animated.View style={[styles.wrapper, entryStyle, animatedStyle]}>
      <View style={styles.cardOuter}>
        <Pressable
          onPress={() => onPress(product)}
          onPressIn={pressIn}
          onPressOut={pressOut}
          style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
        >
          <View style={[styles.art, { backgroundColor: `${product.color}18` }]}>
            <Ionicons name="cube" size={38} color={product.color} />
          </View>
          <Text style={[styles.name, { color: theme.colors.text }]} numberOfLines={1}>
            {product.name}
          </Text>
          <Text style={[styles.category, { color: theme.colors.muted }]}>
            {product.category}
          </Text>
          <View style={styles.footer}>
            <Text style={[styles.price, { color: theme.colors.text }]}>
              {formatCurrency(product.price)}
            </Text>
            <Text style={[styles.stock, { color: product.stock < 12 ? theme.accent.orange : theme.accent.emerald }]}>
              {formatBillQuantity(product.stock, product.unit)} left
            </Text>
          </View>
        </Pressable>
        {onRemove ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Remove ${product.name}`}
            onPress={() => onRemove(product)}
            style={[styles.removeBtn, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
          >
            <Ionicons name="trash-outline" size={18} color={theme.accent.rose} />
          </Pressable>
        ) : null}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "48%",
    marginBottom: 12,
  },
  cardOuter: {
    position: "relative",
    width: "100%",
  },
  card: {
    borderRadius: 28,
    borderWidth: 1,
    padding: 14,
  },
  art: {
    marginBottom: 14,
    height: 96,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
  },
  name: {
    fontSize: 16,
    fontWeight: "900",
  },
  category: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "700",
  },
  footer: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 20,
    fontWeight: "900",
  },
  stock: {
    fontSize: 12,
    fontWeight: "800",
  },
  removeBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 2,
    padding: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
});
