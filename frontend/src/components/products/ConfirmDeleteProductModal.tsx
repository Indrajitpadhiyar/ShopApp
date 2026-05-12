import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { AnimatedModal } from "@/src/components/ui/AnimatedModal";
import { AnimatedButton } from "@/src/components/ui/AnimatedButton";
import { usePressScale } from "@/src/hooks/useAnimations";
import { useTheme } from "@/src/hooks/useTheme";

type Props = {
  visible: boolean;
  productName: string;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
};

export function ConfirmDeleteProductModal({ visible, productName, onClose, onConfirm, isDeleting }: Props) {
  const { theme } = useTheme();
  const { animatedStyle, pressIn, pressOut } = usePressScale();

  return (
    <AnimatedModal visible={visible} title="Remove product?" onClose={onClose}>
      <Text style={[styles.body, { color: theme.colors.muted }]}>
        This will permanently remove <Text style={[styles.emphasis, { color: theme.colors.text }]}>{productName}</Text> from your catalog and cannot be undone.
      </Text>
      <View style={styles.actions}>
        <View style={styles.half}>
          <AnimatedButton label="Cancel" onPress={onClose} disabled={isDeleting} />
        </View>
        <View style={styles.half}>
          <Animated.View style={animatedStyle}>
            <Pressable
              onPress={onConfirm}
              onPressIn={pressIn}
              onPressOut={pressOut}
              disabled={isDeleting}
              style={[
                styles.confirmBtn,
                {
                  backgroundColor: theme.accent.rose,
                  opacity: isDeleting ? 0.65 : 1,
                },
              ]}
            >
              <Ionicons name="trash-outline" size={18} color="#FFFFFF" />
              <Text style={styles.confirmLabel}>{isDeleting ? "Removing…" : "Confirm"}</Text>
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </AnimatedModal>
  );
}

const styles = StyleSheet.create({
  body: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "600",
    marginBottom: 20,
  },
  emphasis: {
    fontWeight: "900",
  },
  actions: {
    flexDirection: "row",
    columnGap: 12,
  },
  half: {
    flex: 1,
  },
  confirmBtn: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    columnGap: 8,
  },
  confirmLabel: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },
});
