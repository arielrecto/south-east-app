import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, Register } from "./../screens/Auth";
import { ROUTES } from "../utils/constant";

export const AuthNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={ROUTES.Login} component={Login} />
      <Stack.Screen name={ROUTES.Register} component={Register} />
    </Stack.Navigator>
  );
};
