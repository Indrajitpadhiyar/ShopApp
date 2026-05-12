import { useMemo, useState } from "react";
import { Alert, Pressable, ScrollView, Share, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AnimatedModal } from "@/src/components/ui/AnimatedModal";
import { AnimatedInput } from "@/src/components/ui/AnimatedInput";
import { GradientButton } from "@/src/components/ui/GradientButton";
import type { BillItem, ShopProduct } from "@/src/types/shop";
import { useTheme } from "@/src/hooks/useTheme";
import { buildBillMessage, formatBillQuantity } from "@/src/utils/billing";
import { formatCurrency } from "@/src/utils/formatters";
import { useCreateBillMutation, useListProductsQuery } from "@/src/store/api";
import { apiProductToShopProduct } from "@/src/utils/productUi";
import { mapApiBillToBill } from "@/src/utils/mapBill";

type Props = {
  visible: boolean;
  onClose: () => void;
};

type Quantities = Record<string, number>;

const meterShortcuts = [1, 1.5, 2, 5, 10];

export function BillComposerModal({ visible, onClose }: Props) {
  const { data: productRes } = useListProductsQuery({ page: 1, limit: 200 });
  const [createBill, { isLoading }] = useCreateBillMutation();
  const { theme } = useTheme();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [quantities, setQuantities] = useState<Quantities>({});
  const [customName, setCustomName] = useState("");
  const [customQuantity, setCustomQuantity] = useState("1");
  const [customPrice, setCustomPrice] = useState("");
  const [customItems, setCustomItems] = useState<BillItem[]>([]);

  const products: ShopProduct[] = useMemo(() => {
    const raw = productRes?.products ?? [];
    return raw.map((p, i) => apiProductToShopProduct(p, i));
  }, [productRes?.products]);

  const selectedProductItems = useMemo<BillItem[]>(
    () =>
      products
        .map((product) => ({
          productId: product.id,
          name: product.name,
          quantity: quantities[product.id] ?? 0,
          price: product.price,
          unit: product.unit ?? "pcs",
        }))
        .filter((item) => item.quantity > 0),
    [products, quantities],
  );

  const selectedItems = useMemo(() => [...selectedProductItems, ...customItems], [customItems, selectedProductItems]);
  const total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function isMeterProduct(product: ShopProduct) {
    return product.unit === "m" || product.category.toLowerCase().includes("wire") || product.name.toLowerCase().includes("wire");
  }

  function setProductQuantity(product: ShopProduct, nextValue: number) {
    const safeValue = Math.min(product.stock, Math.max(0, nextValue));
    setQuantities((current) => ({ ...current, [product.id]: Number(safeValue.toFixed(2)) }));
  }

  function changeQuantity(product: ShopProduct, delta: number) {
    setProductQuantity(product, (quantities[product.id] ?? 0) + delta);
  }

  function addCustomItem() {
    const quantity = Number(customQuantity);
    const price = Number(customPrice);

    if (!customName.trim() || quantity <= 0 || price <= 0) {
      Alert.alert("Check custom item", "Enter item name, quantity, and price.");
      return;
    }

    setCustomItems((current) => [
      ...current,
      {
        productId: `custom-${Date.now()}`,
        name: customName.trim(),
        quantity,
        price,
        unit: "custom",
      },
    ]);
    setCustomName("");
    setCustomQuantity("1");
    setCustomPrice("");
  }

  function resetBillForm() {
    setCustomerName("");
    setCustomerPhone("");
    setQuantities({});
    setCustomItems([]);
    setCustomName("");
    setCustomQuantity("1");
    setCustomPrice("");
  }

  async function handleCreateAndSend() {
    if (!selectedItems.length) {
      Alert.alert("Add items", "Select stock items or add a custom price item.");
      return;
    }

    try {
      const { bill: raw } = await createBill({
        customerName: customerName.trim() || "Walk-in customer",
        customerPhone: customerPhone.trim(),
        items: selectedItems,
      }).unwrap();

      const bill = mapApiBillToBill(raw);
      resetBillForm();
      onClose();
      await Share.share({ message: buildBillMessage(bill) });
    } catch (e: any) {
      const msg = e?.data?.error?.message || e?.error || "Failed to save bill";
      Alert.alert("Bill failed", String(msg));
    }
  }

  return (
    <AnimatedModal visible={visible} title="Make counter bill" onClose={onClose}>
      <ScrollView style={styles.sheetScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <AnimatedInput label="Customer name" value={customerName} onChangeText={setCustomerName} placeholder="Walk-in customer" />
          <AnimatedInput label="Phone / WhatsApp" value={customerPhone} onChangeText={setCustomerPhone} keyboardType="phone-pad" placeholder="Optional" />

          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Stock items</Text>
          <View style={styles.productList}>
            {products.map((product) => {
              const quantity = quantities[product.id] ?? 0;
              const meterProduct = isMeterProduct(product);
              return (
                <View key={product.id} style={[styles.productRow, { borderColor: theme.colors.border }]}>
                  <View style={styles.productTop}>
                    <View style={styles.productCopy}>
                      <Text style={[styles.productName, { color: theme.colors.text }]}>{product.name}</Text>
                      <Text style={[styles.productMeta, { color: theme.colors.muted }]}>
                        {formatCurrency(product.price)} / {product.unit ?? "pcs"} - stock {formatBillQuantity(product.stock, product.unit)}
                      </Text>
                    </View>
                    <View style={styles.stepper}>
                      <Pressable style={[styles.stepButton, { backgroundColor: theme.colors.border }]} onPress={() => changeQuantity(product, meterProduct ? -0.5 : -1)}>
                        <Ionicons name="remove" size={16} color={theme.colors.text} />
                      </Pressable>
                      <TextInput
                        value={quantity ? `${quantity}` : ""}
                        onChangeText={(value) => setProductQuantity(product, Number(value) || 0)}
                        keyboardType="decimal-pad"
                        placeholder="0"
                        placeholderTextColor={theme.colors.muted}
                        style={[styles.quantityInput, { color: theme.colors.text, borderColor: theme.colors.border }]}
                      />
                      <Pressable style={[styles.stepButton, { backgroundColor: theme.accent.blue }]} onPress={() => changeQuantity(product, meterProduct ? 0.5 : 1)}>
                        <Ionicons name="add" size={16} color="#FFF" />
                      </Pressable>
                    </View>
                  </View>
                  {meterProduct ? (
                    <View style={styles.meterChips}>
                      {meterShortcuts.map((meter) => (
                        <Pressable key={meter} style={[styles.meterChip, { backgroundColor: theme.colors.border }]} onPress={() => setProductQuantity(product, meter)}>
                          <Text style={[styles.meterChipText, { color: theme.colors.text }]}>{meter}m</Text>
                        </Pressable>
                      ))}
                    </View>
                  ) : null}
                </View>
              );
            })}
          </View>

          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Custom price item</Text>
          <Text style={[styles.help, { color: theme.colors.muted }]}>Use this for repair charge, loose item, fitting charge, or special price.</Text>
          <AnimatedInput label="Item / work name" value={customName} onChangeText={setCustomName} placeholder="Example: Fitting charge" />
          <View style={styles.customRow}>
            <View style={styles.field}>
              <AnimatedInput label="Qty" value={customQuantity} onChangeText={setCustomQuantity} keyboardType="decimal-pad" placeholder="1" />
            </View>
            <View style={styles.field}>
              <AnimatedInput label="Price Rs" value={customPrice} onChangeText={setCustomPrice} keyboardType="decimal-pad" placeholder="150" />
            </View>
          </View>
          <Pressable style={[styles.addCustomButton, { borderColor: theme.colors.border, backgroundColor: theme.colors.card }]} onPress={addCustomItem}>
            <Ionicons name="add-circle" size={18} color={theme.accent.blue} />
            <Text style={[styles.addCustomText, { color: theme.colors.text }]}>Add custom item</Text>
          </Pressable>

          {customItems.length ? (
            <View style={styles.customItems}>
              {customItems.map((item) => (
                <View key={item.productId} style={styles.customItemRow}>
                  <Text style={[styles.customItemText, { color: theme.colors.text }]}>
                    {item.name} x {item.quantity}
                  </Text>
                  <Text style={[styles.customItemText, { color: theme.colors.text }]}>{formatCurrency(item.price * item.quantity)}</Text>
                </View>
              ))}
            </View>
          ) : null}

          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: theme.colors.muted }]}>Bill total</Text>
            <Text style={[styles.total, { color: theme.colors.text }]}>{formatCurrency(total)}</Text>
          </View>
          <GradientButton
            label={isLoading ? "Saving..." : "Create & send bill"}
            icon={<Ionicons name="send" size={18} color="#FFF" />}
            onPress={handleCreateAndSend}
          />
        </View>
      </ScrollView>
    </AnimatedModal>
  );
}

const styles = StyleSheet.create({
  sheetScroll: {
    maxHeight: 620,
  },
  form: {
    paddingBottom: 8,
    rowGap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "900",
  },
  productList: {
    rowGap: 4,
  },
  productRow: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    rowGap: 10,
  },
  productTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: 10,
  },
  productCopy: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: "800",
  },
  productMeta: {
    marginTop: 3,
    fontSize: 12,
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
  stepButton: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
  },
  quantityInput: {
    height: 36,
    minWidth: 54,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    textAlign: "center",
    fontWeight: "900",
  },
  meterChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  meterChip: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  meterChipText: {
    fontSize: 12,
    fontWeight: "800",
  },
  help: {
    fontSize: 13,
    lineHeight: 18,
  },
  customRow: {
    flexDirection: "row",
    columnGap: 10,
  },
  field: {
    flex: 1,
  },
  addCustomButton: {
    height: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    borderWidth: 1,
    columnGap: 8,
  },
  addCustomText: {
    fontWeight: "900",
  },
  customItems: {
    rowGap: 6,
  },
  customItemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  customItemText: {
    fontSize: 13,
    fontWeight: "800",
  },
  totalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "800",
  },
  total: {
    fontSize: 22,
    fontWeight: "900",
  },
});
