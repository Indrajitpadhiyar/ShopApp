import { StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedProps, useSharedValue, withTiming } from "react-native-reanimated";
import { useEffect, useMemo } from "react";
import Svg, { Circle } from "react-native-svg";
import { GlassCard } from "@/src/components/ui/GlassCard";
import { useTheme } from "@/src/hooks/useTheme";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = {
  value: string;
  label: string;
  progress: number;
  delta?: string;
};

export function AnimatedSalesCard({ value, label, progress, delta }: Props) {
  const { theme } = useTheme();
  const circumference = useMemo(() => 2 * Math.PI * 42, []);
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    animatedProgress.value = withTiming(progress, { duration: 1200 });
  }, [animatedProgress, progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - animatedProgress.value),
  }));

  return (
    <GlassCard className="mb-5">
      <View style={styles.content}>
        <View style={styles.copy}>
          <Text style={[styles.label, { color: theme.colors.muted }]}>
            {label}
          </Text>
          <Text style={[styles.value, { color: theme.colors.text }]}>
            {value}
          </Text>
          <Text style={[styles.delta, { color: theme.accent.emerald }]}>{delta ?? "From database"}</Text>
        </View>
        <Svg width={104} height={104}>
          <Circle cx={52} cy={52} r={42} stroke={theme.colors.border} strokeWidth={10} fill="transparent" />
          <AnimatedCircle
            cx={52}
            cy={52}
            r={42}
            stroke={theme.accent.orange}
            strokeWidth={10}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animatedProps={animatedProps}
            rotation="-90"
            originX={52}
            originY={52}
          />
        </Svg>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  copy: {
    flex: 1,
    paddingRight: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
  },
  value: {
    marginTop: 8,
    fontSize: 38,
    lineHeight: 44,
    fontWeight: "900",
    letterSpacing: -1,
  },
  delta: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "800",
  },
});
