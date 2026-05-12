import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabBar } from "@/src/components/layouts/BottomTabBar";
import { DashboardScreen } from "@/src/screens/DashboardScreen";
import { ProductsScreen } from "@/src/screens/ProductsScreen";
import { BillsScreen } from "@/src/screens/OrdersScreen";
import { CustomersScreen } from "@/src/screens/CustomersScreen";
import { SettingsScreen } from "@/src/screens/SettingsScreen";

export type BottomTabParamList = {
  Dashboard: undefined;
  Products: undefined;
  Bills: undefined;
  Customers: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export function BottomTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        lazy: true,
        animation: "shift",
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Products" component={ProductsScreen} />
      <Tab.Screen name="Bills" component={BillsScreen} />
      <Tab.Screen name="Customers" component={CustomersScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
