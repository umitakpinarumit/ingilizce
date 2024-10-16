import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './pages/LoginPage';
import CategoriesPage from "./pages/CategoriesPage";
import FillInTheBlanks from "./addwords";
import Eslestirme from "./Eslestirme";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import Icon from "react-native-vector-icons/MaterialIcons";

// Eğitim sayfası bileşenlerini dahil ediyoruz
import EducationPage from './pages/EducationPage';
import SectionDetails from './pages/SectionDetails';
import Exercise from './pages/Exercise';
import Quiz from './pages/Quizz';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Eğitim ile ilgili tüm sayfaları stack içinde tanımlıyoruz
function EducationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="EducationPage" component={EducationPage} options={{ title: "Eğitim Sayfası" }} />
      <Stack.Screen name="SectionDetails" component={SectionDetails} options={{ title: "Bölüm Detayları" }} />
      <Stack.Screen name="Exercise" component={Exercise} options={{ title: "Alıştırma" }} />
      <Stack.Screen name="Quiz" component={Quiz} options={{ title: "Quiz" }} />
    </Stack.Navigator>
  );
}

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
              iconName = focused ? "login" : "login";
            } else if (route.name === "MainPage") {
              iconName = focused ? "dashboard" : "dashboard";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "Categories") {
              iconName = focused ? "category" : "category";
            } else if (route.name === "FillInTheBlanks") {
              iconName = focused ? "text-fields" : "text-fields";
            } else if (route.name === "Eslestirme") {
              iconName = focused ? "swap-horiz" : "swap-horiz";
            } else if (route.name === "Education") {
              iconName = focused ? "school" : "school";
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Login" component={LoginPage} />
        <Tab.Screen name="MainPage" component={MainPage} />
        <Tab.Screen name="Profile" component={ProfilePage} />
        <Tab.Screen name="Categories" component={CategoriesPage} />
        <Tab.Screen name="FillInTheBlanks" component={FillInTheBlanks} />
        <Tab.Screen name="Eslestirme" component={Eslestirme} />
        <Tab.Screen name="Education" component={EducationStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
