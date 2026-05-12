import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AnimatedHeader } from "@/src/components/layouts/AnimatedHeader";
import { ScreenWrapper } from "@/src/components/layouts/ScreenWrapper";
import { GlassCard } from "@/src/components/ui/GlassCard";
import { useTheme } from "@/src/hooks/useTheme";

export function ProfileScreen() {
  const { theme } = useTheme();

  return (
    <ScreenWrapper>
      <AnimatedHeader eyebrow="Owner" title="Profile" />
      <GlassCard>
        <View style={styles.content}>
          <View style={[styles.avatar, { backgroundColor: theme.accent.blue }]}>
            <Ionicons name="person" size={44} color="#FFFFFF" />
          </View>
          <Text style={[styles.name, { color: theme.colors.text }]}>
            Lucky Electrical
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.muted }]}>
            Offline electrical shop workspace
          </Text>
        </View>
      </GlassCard>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
  },
  avatar: {
    height: 96,
    width: 96,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
  },
  name: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: "900",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
  },
});
