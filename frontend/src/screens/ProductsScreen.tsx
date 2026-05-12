import { useCallback, useMemo, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AnimatedHeader } from "@/src/components/layouts/AnimatedHeader";
import { ScreenWrapper } from "@/src/components/layouts/ScreenWrapper";
import { SearchBar } from "@/src/components/ui/SearchBar";
import { GradientButton } from "@/src/components/ui/GradientButton";
import { AnimatedButton } from "@/src/components/ui/AnimatedButton";
import { AddProductModal } from "@/src/components/products/AddProductModal";
import { ProductFilter } from "@/src/components/products/ProductFilter";
import { ProductGrid } from "@/src/components/products/ProductGrid";
import { ProductDetailsModal } from "@/src/components/products/ProductDetailsModal";
import { ConfirmDeleteProductModal } from "@/src/components/products/ConfirmDeleteProductModal";
import { useTheme } from "@/src/hooks/useTheme";
import { useDeleteProductMutation, useListProductsQuery } from "@/src/store/api";
import type { ShopProduct } from "@/src/types/shop";
import { apiProductToShopProduct } from "@/src/utils/productUi";

export function ProductsScreen() {
  const { theme } = useTheme();
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<ShopProduct | null>(null);

  const { data } = useListProductsQuery({ page: 1, limit: 500, q: query });
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const openDeleteConfirm = useCallback((product: ShopProduct) => {
    if (!product.id) return;
    setPendingDelete(product);
  }, []);

  const closeDeleteConfirm = useCallback(() => {
    if (!isDeleting) setPendingDelete(null);
  }, [isDeleting]);

  const handleConfirmDelete = useCallback(async () => {
    const id = pendingDelete?.id;
    if (!id) return;
    try {
      await deleteProduct(id).unwrap();
      setPendingDelete(null);
    } catch {
      Alert.alert("Could not remove", "Check your connection and try again.");
    }
  }, [deleteProduct, pendingDelete?.id]);

  const products: ShopProduct[] = useMemo(() => {
    const raw = data?.products ?? [];
    return raw.map((p, i) => apiProductToShopProduct(p, i));
  }, [data?.products]);

  return (
    <ScreenWrapper>
      <AnimatedHeader eyebrow="Lucky Electrical" title="Product stock" />
      <SearchBar value={query} onChangeText={setQuery} placeholder="Search products or categories" />
      <View style={styles.actions}>
        <View style={styles.action}>
          <GradientButton label="Add product" icon={<Ionicons name="add" size={18} color="#FFF" />} onPress={() => setAddOpen(true)} />
        </View>
        <View style={styles.action}>
          <AnimatedButton label={`${products.length} items`} icon={<Ionicons name="cube" size={18} color={theme.accent.blue} />} />
        </View>
      </View>
      <ProductFilter />
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>All products</Text>
        <Text style={[styles.sectionMeta, { color: theme.colors.muted }]}>
          {products.length} in catalog{isDeleting ? " · Removing…" : ""}
        </Text>
      </View>
      <ProductGrid products={products} query={query} onSelect={setSelectedProduct} onRemoveProduct={openDeleteConfirm} />
      <AddProductModal visible={addOpen} onClose={() => setAddOpen(false)} />
      <ProductDetailsModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <ConfirmDeleteProductModal
        visible={pendingDelete != null}
        productName={pendingDelete?.name ?? ""}
        onClose={closeDeleteConfirm}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  actions: {
    marginTop: 14,
    flexDirection: "row",
    columnGap: 12,
  },
  action: {
    flex: 1,
  },
  sectionHeader: {
    marginTop: 20,
    gap: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: -0.3,
  },
  sectionMeta: {
    fontSize: 13,
    fontWeight: "600",
  },
});
