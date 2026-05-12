import { useEffect } from "react";
import { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated";

export function useEntryAnimation(delay = 0) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(22);
  const scale = useSharedValue(0.96);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 520 }));
    translateY.value = withDelay(delay, withSpring(0, { damping: 16, stiffness: 120 }));
    scale.value = withDelay(delay, withSpring(1, { damping: 14, stiffness: 120 }));
  }, [delay, opacity, scale, translateY]);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));
}

export function usePressScale() {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return {
    animatedStyle,
    pressIn: () => {
      scale.value = withSpring(0.96, { damping: 12, stiffness: 320 });
    },
    pressOut: () => {
      scale.value = withSpring(1, { damping: 12, stiffness: 320 });
    },
  };
}
