import { useState } from "react";
import { StyleSheet, Text, TextInput, TextInputProps } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useTheme } from "@/src/hooks/useTheme";

type Props = TextInputProps & {
  label: string;
};

export function AnimatedInput({ label, ...props }: Props) {
  const { theme } = useTheme();
  const [focused, setFocused] = useState(false);
  const progress = useSharedValue(0);

  const borderStyle = useAnimatedStyle(() => ({
    borderColor: progress.value > 0.5 ? theme.accent.blue : theme.colors.border,
  }));

  return (
    <Animated.View style={[styles.container, { backgroundColor: theme.colors.card }, borderStyle]}>
      <Text style={[styles.label, { color: focused ? theme.accent.blue : theme.colors.muted }]}>
        {label}
      </Text>
      <TextInput
        {...props}
        placeholderTextColor={theme.colors.muted}
        style={[styles.input, { color: theme.colors.text }]}
        onFocus={(event) => {
          setFocused(true);
          progress.value = withTiming(1, { duration: 220 });
          props.onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          progress.value = withTiming(0, { duration: 220 });
          props.onBlur?.(event);
        }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  label: {
    marginBottom: 4,
    fontSize: 12,
    fontWeight: "700",
  },
  input: {
    fontSize: 16,
  },
});
