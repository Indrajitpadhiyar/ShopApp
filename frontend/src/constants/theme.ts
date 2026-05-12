import { colors, ThemeMode } from "./colors";

export const getTheme = (mode: ThemeMode) => ({
  mode,
  colors: mode === "dark" ? colors.dark : colors.light,
  accent: colors.accent,
  shadow: {
    shadowColor: mode === "dark" ? "#000" : "#64748B",
    shadowOpacity: mode === "dark" ? 0.28 : 0.14,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 14 },
    elevation: 10,
  },
});

export type AppTheme = ReturnType<typeof getTheme>;
