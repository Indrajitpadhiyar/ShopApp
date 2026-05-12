import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AnimatedHeader } from "@/src/components/layouts/AnimatedHeader";
import { ScreenWrapper } from "@/src/components/layouts/ScreenWrapper";
import { GlassCard } from "@/src/components/ui/GlassCard";
import { ThemeToggle } from "@/src/components/ui/ThemeToggle";
import { DrawerMenu } from "@/src/components/layouts/DrawerMenu";
import { useTheme } from "@/src/hooks/useTheme";

export function SettingsScreen() {
  const { theme } = useTheme();

  return (
    <ScreenWrapper>
      <AnimatedHeader eyebrow="Workspace" title="Settings" showToggle={false} />
      <GlassCard className="mb-5">
        <View style={styles.row}>
          <View style={styles.profile}>
            <View style={[styles.avatar, { backgroundColor: theme.accent.orange }]}>
              <Ionicons name="storefront" size={26} color="#FFFFFF" />
            </View>
            <View style={styles.profileText}>
              <Text style={[styles.title, { color: theme.colors.text }]}>
                Lucky Electrical
              </Text>
              <Text style={[styles.subtitle, { color: theme.colors.muted }]}>
                Offline billing and stock manager
              </Text>
            </View>
          </View>
        </View>
      </GlassCard>
      <GlassCard className="mb-5">
        <View style={styles.row}>
          <View>
            <Text style={[styles.appearanceTitle, { color: theme.colors.text }]}>
              Appearance
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.muted }]}>
              Switch between light and dark mode.
            </Text>
          </View>
          <ThemeToggle />
        </View>
      </GlassCard>
      <DrawerMenu />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    height: 56,
    width: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
  },
  profileText: {
    marginLeft: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "900",
  },
  appearanceTitle: {
    fontSize: 16,
    fontWeight: "900",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
  },
});
