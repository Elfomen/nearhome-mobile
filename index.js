import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Provider, useDispatch, useSelector } from "react-redux";

import MessagesScreen from "./src/screens/Messages/message";

import FilteredResult from "./src/screens/filteredResult/filter";
import MainTabNavigator from "./src/screens/MainTabNavigator";
import HouseDetails from "./src/screens/houseDetails/details";
import LoginScreen from "./src/screens/login/login";
import RegisterScreen from "./src/screens/register/register";
import { userSelectors } from "./src/redux/user/user.selectors";
import SettingsScreen from "./src/screens/Settings/settings";
import { useEffect, useState } from "react";
import { conversationActions } from "./src/redux/ conversations/conversation.actions";
import { conversationSelectors } from "./src/redux/ conversations/conversation.selectors";
import { Audio } from "expo-av";
import { socket } from "./socket";
import { messagesActions } from "./src/redux/messages/message.action";

function RootApplication() {
  const { currentUser } = useSelector(userSelectors.selectUser);
  const Stack = createNativeStackNavigator();
  let io = socket.getSocket();
  const dispatch = useDispatch();
  const [sound, setSound] = useState();

  async function playSound() {
    try {
      console.log("Loading Sound");
      const { sound } = await Audio.Sound.createAsync(
        require("./src/assets/audio/three.mp3")
      );

      // setSound(sound);

      console.log("Playing Sound");
      await sound.playAsync();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    socket.initSocket("https://nearhome-api.yanndevs.com");
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound"); //
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: "slide_from_right" }}
      >
        <Stack.Screen name="Home" component={MainTabNavigator} />
        <Stack.Screen name="FilteredResult" component={FilteredResult} />
        <Stack.Screen name="HouseDetails" component={HouseDetails} />
        <Stack.Screen
          name="RegisterScreen"
          component={currentUser.token ? SettingsScreen : RegisterScreen}
        />
        <Stack.Screen
          name="MessagesScreens"
          component={currentUser.token ? MessagesScreen : LoginScreen}
        />
      </Stack.Navigator>

      <StatusBar barStyle="default" />
      <ExpoStatusBar backgroundColor="white" />
    </NavigationContainer>
  );
}

export default RootApplication;
