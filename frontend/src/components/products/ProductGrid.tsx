import { StyleSheet, View } from "react-native";
import type { ShopProduct } from "@/src/types/shop";
import { ProductCard } from "./ProductCard";

type Props = {
  products: ShopProduct[];
  onSelect: (product: ShopProduct) => void;
  query: string;
  onRemoveProduct?: (product: ShopProduct) => void;
};

export function ProductGrid({ products, onSelect, query, onRemoveProduct }: Props) {
  const q = query.toLowerCase().trim();
  const filtered = q
    ? products.filter((product) => {
        const name = String(product?.name ?? "").toLowerCase();
        const category = String(product?.category ?? "").toLowerCase();
        return name.includes(q) || category.includes(q);
      })
    : products;

  return (
    <View style={styles.grid}>
      {filtered.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          onPress={onSelect}
          onRemove={onRemoveProduct}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
