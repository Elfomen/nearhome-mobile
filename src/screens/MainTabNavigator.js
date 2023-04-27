import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar, View } from "react-native";
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
import { conversationSelectors } from "../redux/ conversations/conversation.selectors";
import { Text } from "react-native";

const MainTabNavigator = () => {
  const { currentUser } = useSelector(userSelectors.selectUser);
  const [auth, setAuth] = useState(false);
  const Tab = createBottomTabNavigator();
  const { unread } = useSelector(conversationSelectors.selectConversations);
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
          return (
            <View style={[{ position: "relative" }]}>
              {route.name === "Messages" && unread > 0 && (
                <View
                  style={[
                    {
                      position: "absolute",
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: "red",
                      alignItems: "center",
                      justifyContent: "center",
                      right: -10,
                      top: -5,
                      zIndex: 2,
                    },
                  ]}
                >
                  <Text style={{ color: "white" }}>{unread}</Text>
                </View>
              )}
              <FontAwesomeIcon icon={iconName} size={size} color={color} />
            </View>
          );
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
