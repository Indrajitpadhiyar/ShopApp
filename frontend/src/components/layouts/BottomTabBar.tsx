import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { usePressScale } from "@/src/hooks/useAnimations";
import { useTheme } from "@/src/hooks/useTheme";

const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
  Dashboard: "grid",
  Products: "cube",
  Bills: "receipt",
  Customers: "people",
  Settings: "settings",
};

export function BottomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { theme, mode } = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[styles.bar, {
          backgroundColor: mode === "dark" ? "rgba(24,24,27,0.92)" : "rgba(255,255,255,0.92)",
          borderColor: theme.colors.border,
          ...(Platform.OS === "ios" && {
            shadowColor: mode === "dark" ? "#000" : "#64748B",
            shadowOpacity: 0.22,
            shadowRadius: 28,
            shadowOffset: { width: 0, height: 12 },
          }),
          ...(Platform.OS === "android" && {
            elevation: 16,
          }),
        }]}
      >
        <View style={styles.items}>
          {state.routes.map((route, index) => {
            const focused = state.index === index;
            const options = descriptors[route.key].options;
            const label = options.tabBarLabel?.toString() ?? options.title ?? route.name;
            return (
              <TabButton
                key={route.key}
                label={label}
                icon={icons[route.name] ?? "ellipse"}
                focused={focused}
                onPress={() => {
                  const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
                  if (!focused && !event.defaultPrevented) {
                    navigation.navigate(route.name);
                  }
                }}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}

function TabButton({ label, icon, focused, onPress }: { label: string; icon: keyof typeof Ionicons.glyphMap; focused: boolean; onPress: () => void }) {
  const { theme } = useTheme();
  const { animatedStyle, pressIn, pressOut } = usePressScale();

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={onPress}
        onPressIn={pressIn}
        onPressOut={pressOut}
        style={[styles.tabButton, { backgroundColor: focused ? theme.accent.blue : "transparent" }]}
      >
        <Ionicons name={icon} size={19} color={focused ? "#FFFFFF" : theme.colors.muted} />
        {focused ? <Text style={styles.tabLabel}>{label}</Text> : null}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 20,
  },
  bar: {
    overflow: "hidden",
    borderRadius: 999,
    borderWidth: 1,
    padding: 8,
  },
  items: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tabButton: {
    minWidth: 48,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    paddingHorizontal: 12,
  },
  tabLabel: {
    marginLeft: 8,
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
  },
});
