import { StyleSheet, Text, View } from "react-native";
import { GlassCard } from "@/src/components/ui/GlassCard";
import { useTheme } from "@/src/hooks/useTheme";
import type { ActivityRow } from "@/src/utils/dashboardFromApi";

type Props = { activities: ActivityRow[] };

export function ActivityTimeline({ activities }: Props) {
  const { theme } = useTheme();
  const rows = activities.length ? activities : [{ title: "No activity yet", meta: "Create a bill or add stock", time: "—" }];

  return (
    <GlassCard delay={180}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Recent activity</Text>
      {rows.map((activity, index) => (
        <View key={`${activity.title}-${index}`} style={styles.row}>
          <View style={styles.rail}>
            <View style={[styles.dot, { backgroundColor: index === 0 ? theme.accent.orange : theme.accent.blue }]} />
            {index < rows.length - 1 ? <View style={[styles.line, { borderColor: theme.colors.border }]} /> : null}
          </View>
          <View style={styles.body}>
            <View style={styles.rowHeader}>
              <Text style={[styles.activityTitle, { color: theme.colors.text }]}>{activity.title}</Text>
              <Text style={[styles.time, { color: theme.colors.muted }]}>{activity.time}</Text>
            </View>
            <Text style={[styles.meta, { color: theme.colors.muted }]}>{activity.meta}</Text>
          </View>
        </View>
      ))}
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
    fontSize: 18,
    fontWeight: "900",
  },
  row: {
    flexDirection: "row",
    paddingBottom: 16,
  },
  rail: {
    alignItems: "center",
  },
  dot: {
    height: 12,
    width: 12,
    borderRadius: 999,
  },
  line: {
    marginTop: 4,
    flex: 1,
    borderLeftWidth: 1,
  },
  body: {
    marginLeft: 12,
    flex: 1,
  },
  rowHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  activityTitle: {
    flex: 1,
    fontWeight: "800",
  },
  time: {
    marginLeft: 8,
    fontSize: 12,
    fontWeight: "800",
  },
  meta: {
    marginTop: 4,
    fontSize: 14,
  },
});
