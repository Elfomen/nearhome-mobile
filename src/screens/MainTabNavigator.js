import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import HomeScreen from "./Home/home";
import MessagesScreen from "./Messages/message";
import SettingsScreen from "./Settings/settings";
import { APP_COLORS } from "../utils/colors/colors";
import {
  faGears,
  faHome,
  faMessage,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import WalletScreen from "./wallet/wallet";
import ConversationScreens from "./Messages/conversation";
import { useState } from "react";
import LoginScreen from "./login/login";
import { useSelector } from "react-redux";
import { userSelectors } from "../redux/user/user.selectors";

const MainTabNavigator = () => {
  const { currentUser } = useSelector(userSelectors.selectUser);
  const [auth, setAuth] = useState(false);
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "white",
          padding: 10,
          paddingBottom: 8,
          height: 60,
          borderRadius: 50,
          marginBottom: 10,
          position: "absolute",
          borderTopColor: "#eeeeee",
          borderColor: "#eeeeee",
          marginLeft: 10,
          marginRight: 10,
          borderWidth: 0.8,
        },
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeScreen") {
            iconName = faHome;
          } else if (route.name === "Settings") {
            iconName = faGears;
          } else if (route.name === "Messages") {
            iconName = faMessage;
          } else if (route.name === "Wallet") {
            iconName = faWallet;
          }

          // You can return any component that you like here!
          return <FontAwesomeIcon icon={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: APP_COLORS.secondary_color_blue,
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen
        name="Messages"
        component={currentUser.token ? ConversationScreens : LoginScreen}
      />
      <Tab.Screen
        name="Wallet"
        component={currentUser.token ? WalletScreen : LoginScreen}
      />
      <Tab.Screen
        name="Settings"
        component={currentUser.token ? SettingsScreen : LoginScreen}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
