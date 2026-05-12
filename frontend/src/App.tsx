import { RootNavigator } from "@/src/navigation/RootNavigator";
import { ThemeProvider } from "@/src/hooks/useTheme";

/** Legacy entry when not using Expo Router as root; keep ThemeProvider only — data comes from Redux + API. */
export default function App() {
  return (
    <ThemeProvider>
      <RootNavigator />
    </ThemeProvider>
  );
}
