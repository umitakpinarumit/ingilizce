import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from '.../../../LoginPage'
import CategoriesPage from "./CategoriesPage";
import FillInTheBlanks from "./FillInTheBlanks"
import WordMatching from "./WordMatching"
import Eslestirme from "./Eslestirme";

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Eslestirme">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Categories" component={CategoriesPage} />
        <Stack.Screen name="WordMatching" component={WordMatching} />
        <Stack.Screen name="FillInTheBlanks" component={FillInTheBlanks} />
        <Stack.Screen name="Eslestirme" component={Eslestirme} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


