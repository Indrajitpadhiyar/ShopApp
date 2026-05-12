import { ReactNode } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useEntryAnimation } from "@/src/hooks/useAnimations";
import { useTheme } from "@/src/hooks/useTheme";

type Props = {
  visible: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export function AnimatedModal({ visible, title, children, onClose }: Props) {
  const { theme, mode } = useTheme();
  const animatedStyle = useEntryAnimation(40);

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <View
        style={[styles.backdrop, {
          backgroundColor: mode === "dark" ? "rgba(0,0,0,0.72)" : "rgba(15,23,42,0.48)",
        }]}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <Animated.View style={[styles.sheet, animatedStyle, { backgroundColor: theme.colors.card }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.text }]}>
              {title}
            </Text>
            <Pressable style={[styles.close, { backgroundColor: theme.colors.background }]} onPress={onClose}>
              <Ionicons name="close" size={20} color={theme.colors.text} />
            </Pressable>
          </View>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  sheet: {
    borderRadius: 28,
    padding: 20,
  },
  header: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
  },
  close: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
  },
});
