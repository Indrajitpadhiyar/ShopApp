import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { getTheme } from "@/src/constants/theme";
import { ThemeMode } from "@/src/constants/colors";

type ThemeContextValue = {
  mode: ThemeMode;
  theme: ReturnType<typeof getTheme>;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("light");
  const value = useMemo(
    () => ({
      mode,
      theme: getTheme(mode),
      toggleTheme: () => setMode((current) => (current === "light" ? "dark" : "light")),
    }),
    [mode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
}
