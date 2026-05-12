import { ReactNode } from "react";
import { ColorValue, ScrollView, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/src/hooks/useTheme";

type Props = {
  children: ReactNode;
  scroll?: boolean;
};

export function ScreenWrapper({ children, scroll = true }: Props) {
  const { mode } = useTheme();
  const background: readonly [ColorValue, ColorValue, ColorValue] =
    mode === "dark" ? ["#09090B", "#111827", "#18181B"] : ["#FFFFFF", "#F8FAFC", "#EEF2FF"];

  return (
    <LinearGradient colors={background} style={styles.container}>
      <SafeAreaView style={styles.container}>
        {scroll ? (
          <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {children}
          </ScrollView>
        ) : (
          <View style={styles.staticContent}>{children}</View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 132,
  },
  staticContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 112,
  },
});
