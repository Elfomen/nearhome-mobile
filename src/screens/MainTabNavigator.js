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

const MainTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
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
      <Tab.Screen name="Messages" component={ConversationScreens} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
