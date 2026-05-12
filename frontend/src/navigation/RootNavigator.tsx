import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import { BottomTabs } from "./BottomTabs";

export function RootNavigator() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}
