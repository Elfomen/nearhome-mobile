import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import HomeScreen from "./src/screens/Home/home";
import MessagesScreen from "./src/screens/Messages/message";
import {
  faGears,
  faHome,
  faMessage,
  faParachuteBox,
} from "@fortawesome/free-solid-svg-icons";
import SettingsScreen from "./src/screens/Settings/settings";
import { APP_COLORS } from "./src/utils/colors/colors";

import {
  useFonts,
  Ubuntu_300Light,
  Ubuntu_300Light_Italic,
  Ubuntu_400Regular,
  Ubuntu_400Regular_Italic,
  Ubuntu_500Medium,
  Ubuntu_500Medium_Italic,
  Ubuntu_700Bold,
  Ubuntu_700Bold_Italic,
} from "@expo-google-fonts/ubuntu";
import AppLoading from "expo-app-loading";
import FilteredResult from "./src/screens/filteredResult/filter";
import MainTabNavigator from "./src/screens/MainTabNavigator";
import HouseDetails from "./src/screens/houseDetails/details";
import { useState } from "react";
import LoginScreen from "./src/screens/login/login";
import RegisterScreen from "./src/screens/register/register";
export default function App() {
  const [auth, setAuth] = useState(true);
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  let [fontsLoaded] = useFonts({
    Ubuntu_300Light,
    Ubuntu_300Light_Italic,
    Ubuntu_400Regular,
    Ubuntu_400Regular_Italic,
    Ubuntu_500Medium,
    Ubuntu_500Medium_Italic,
    Ubuntu_700Bold,
    Ubuntu_700Bold_Italic,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={MainTabNavigator} />
          <Stack.Screen name="FilteredResult" component={FilteredResult} />
          <Stack.Screen name="HouseDetails" component={HouseDetails} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen
            name="MessagesScreens"
            component={auth ? MessagesScreen : LoginScreen}
          />
        </Stack.Navigator>

        <StatusBar barStyle="light-content" />
        <ExpoStatusBar backgroundColor="white" />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
