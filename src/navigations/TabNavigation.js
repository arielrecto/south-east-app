import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Setting } from "../screens/User";
import { ROUTES } from "../utils/constant";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {HomeStackNavigation} from './HomeStackNavigation'
export const TabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={ROUTES.HomeStack}
        component={HomeStackNavigation}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ size, color }) => (
            <Icon name="home" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.Setting}
        component={Setting}
        options={{
          tabBarLabel: "Setting",
          tabBarIcon: ({ size, color }) => (
            <Icon name="cog-outline" size={22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
