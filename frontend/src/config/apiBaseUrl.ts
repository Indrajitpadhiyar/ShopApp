import Constants from "expo-constants";

type Extra = { apiUrl?: string };

/**
 * API base including `/api` suffix, no trailing slash.
 * Priority: EXPO_PUBLIC_API_URL (EAS / root .env) → app.json extra.apiUrl → dev localhost.
 */
export function getApiBaseUrl(): string {
  const fromEnv = process.env.EXPO_PUBLIC_API_URL?.trim();
  const fromExtra = (Constants.expoConfig?.extra as Extra | undefined)?.apiUrl?.trim();
  const fallback = __DEV__ ? "http://localhost:3000/api" : "https://shopapp-i1zp.onrender.com/api";
  const raw = fromEnv || fromExtra || fallback;
  return raw.replace(/\/+$/, "");
}
