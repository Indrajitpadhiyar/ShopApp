import { Pressable, PressableProps, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated from "react-native-reanimated";
import { ReactNode } from "react";
import { usePressScale } from "@/src/hooks/useAnimations";

type Props = PressableProps & {
  label: string;
  icon?: ReactNode;
};

export function GradientButton({ label, icon, ...props }: Props) {
  const { animatedStyle, pressIn, pressOut } = usePressScale();

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
      >
        <LinearGradient
          colors={["#2563EB", "#7C3AED", "#F97316"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {icon ? <View style={styles.icon}>{icon}</View> : null}
          <Text style={styles.label}>{label}</Text>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    paddingHorizontal: 20,
    shadowColor: "#7C3AED",
    shadowOpacity: 0.28,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  icon: {
    marginRight: 8,
  },
  label: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },
});
