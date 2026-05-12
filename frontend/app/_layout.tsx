import "react-native-gesture-handler";
import "@/src/styles/global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "@/src/store/store";
import { ThemeProvider } from "@/src/hooks/useTheme";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }} />
      </ThemeProvider>
    </Provider>
  );
}
