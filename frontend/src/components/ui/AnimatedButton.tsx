import { ReactNode } from "react";
import { Pressable, PressableProps, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { usePressScale } from "@/src/hooks/useAnimations";
import { useTheme } from "@/src/hooks/useTheme";

type Props = PressableProps & {
  label: string;
  icon?: ReactNode;
};

export function AnimatedButton({ label, icon, ...props }: Props) {
  const { animatedStyle, pressIn, pressOut } = usePressScale();
  const { theme } = useTheme();

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        {...props}
        onPressIn={(event) => {
          pressIn();
          props.onPressIn?.(event);
        }}
        onPressOut={(event) => {
          pressOut();
          props.onPressOut?.(event);
        }}
        style={[styles.button, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }, theme.shadow]}
      >
        {icon ? <View style={styles.icon}>{icon}</View> : null}
        <Text style={[styles.label, { color: theme.colors.text }]}>
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "800",
  },
});
