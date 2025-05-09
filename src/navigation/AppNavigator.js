import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import SetBudgetScreen from "../screens/SetBudgetScreen";
import InsertExpense from "../screens/InsertExpense";

const MainStack = createNativeStackNavigator();

const Main = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen name="SetBudget" component={SetBudgetScreen} />
      <MainStack.Screen name="InsertExpense" component={InsertExpense} />
    </MainStack.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
};
