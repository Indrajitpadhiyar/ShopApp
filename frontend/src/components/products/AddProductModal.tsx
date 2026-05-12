import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AnimatedModal } from "@/src/components/ui/AnimatedModal";
import { AnimatedInput } from "@/src/components/ui/AnimatedInput";
import { GradientButton } from "@/src/components/ui/GradientButton";
import { useTheme } from "@/src/hooks/useTheme";
import { useCreateProductMutation } from "@/src/store/api";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export function AddProductModal({ visible, onClose }: Props) {
  const { theme } = useTheme();
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Electrical");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [unit, setUnit] = useState("pcs");

  function reset() {
    setName("");
    setCategory("Electrical");
    setPrice("");
    setStock("");
    setUnit("pcs");
  }

  async function handleSave() {
    const parsedPrice = Number(price);
    const parsedStock = Number(stock);

    if (!name.trim() || !category.trim() || parsedPrice <= 0 || parsedStock < 0) {
      Alert.alert("Check product", "Enter product name, category, price, stock, and unit.");
      return;
    }

    try {
      await createProduct({
        name: name.trim(),
        category: category.trim(),
        price: parsedPrice,
        stock: parsedStock,
        unit: unit.trim() || "pcs",
      }).unwrap();
      reset();
      onClose();
    } catch (e: any) {
      const msg = e?.data?.error?.message || e?.error || "Failed to save product";
      Alert.alert("Save failed", String(msg));
    }
  }

  return (
    <AnimatedModal visible={visible} title="Add product stock" onClose={onClose}>
      <View style={styles.form}>
        <AnimatedInput label="Product name" value={name} onChangeText={setName} placeholder="Example: LED Tube Light" />
        <AnimatedInput label="Category" value={category} onChangeText={setCategory} placeholder="Lighting, Wire, Switch" />
        <View style={styles.row}>
          <View style={styles.field}>
            <AnimatedInput label="Price Rs" value={price} onChangeText={setPrice} keyboardType="numeric" placeholder="250" />
          </View>
          <View style={styles.field}>
            <AnimatedInput label={`Stock ${unit}`} value={stock} onChangeText={setStock} keyboardType="decimal-pad" placeholder="12" />
          </View>
        </View>
        <AnimatedInput label="Unit" value={unit} onChangeText={setUnit} placeholder="pcs or m" />
        <Text style={[styles.help, { color: theme.colors.muted }]}>
          Use unit `m` for wire sold by meters, and `pcs` for normal electrical items.
        </Text>
        <GradientButton
          label={isLoading ? "Saving..." : "Save product"}
          icon={<Ionicons name="add-circle" size={18} color="#FFF" />}
          onPress={handleSave}
        />
      </View>
    </AnimatedModal>
  );
}

const styles = StyleSheet.create({
  form: {
    rowGap: 12,
  },
  row: {
    flexDirection: "row",
    columnGap: 10,
  },
  field: {
    flex: 1,
  },
  help: {
    fontSize: 13,
    lineHeight: 18,
  },
});
