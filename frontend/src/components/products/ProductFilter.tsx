import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/src/hooks/useTheme";

const filters = ["All", "Lighting", "Switches", "Wires", "Low stock"];

export function ProductFilter() {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {filters.map((filter, index) => (
        <Pressable
          key={filter}
          style={[styles.chip, { backgroundColor: index === 0 ? theme.accent.blue : theme.colors.card, borderColor: theme.colors.border }]}
        >
          <Text style={[styles.label, { color: index === 0 ? "#FFFFFF" : theme.colors.text }]}>
            {filter}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  label: {
    fontSize: 12,
    fontWeight: "800",
  },
});
