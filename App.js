import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginPage from './pages/LoginPage'
import CategoriesPage from "./pages/CategoriesPage";
import FillInTheBlanks from "./FillInTheBlanks"
import WordMatching from "./WordMatching"
import Eslestirme from "./Eslestirme";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import Icon from "react-native-vector-icons/MaterialIcons";


const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            // Ekranlara uygun ikonları tanımlayalım
            if (route.name === "Login") {
              iconName = focused ? "login" : "login"; // login için uygun bir ikon
            } else if (route.name === "MainPage") {
              iconName = focused ? "dashboard" : "dashboard";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "Categories") {
              iconName = focused ? "category" : "category";
            } else if (route.name === "WordMatching") {
              iconName = focused ? "extension" : "extension"; // Puzzle parçası gibi bir ikon
            } else if (route.name === "FillInTheBlanks") {
              iconName = focused ? "text-fields" : "text-fields"; // Yazı alanı için uygun ikon
            } else if (route.name === "Eslestirme") {
              iconName = focused ? "swap-horiz" : "swap-horiz"; // Eşleştirme için bir ikon
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato", // Seçili ikonun rengi
          tabBarInactiveTintColor: "gray", // Seçili olmayan ikonun rengi
        })}
      >
        <Tab.Screen name="Login" component={LoginPage} />
        <Tab.Screen name="MainPage" component={MainPage} />
        <Tab.Screen name="Profile" component={ProfilePage} />

        <Tab.Screen name="Categories" component={CategoriesPage} />
        <Tab.Screen name="WordMatching" component={WordMatching} />
        <Tab.Screen name="FillInTheBlanks" component={FillInTheBlanks} />
        <Tab.Screen name="Eslestirme" component={Eslestirme} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


