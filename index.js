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
import { useCallback, useEffect, useState } from "react";
import { conversationActions } from "./src/redux/ conversations/conversation.actions";
import { conversationSelectors } from "./src/redux/ conversations/conversation.selectors";
import { Audio } from "expo-av";
import { socket } from "./socket";
import { messagesActions } from "./src/redux/messages/message.action";
import * as SplashScreen from "expo-splash-screen";
import tw from "tailwind-react-native-classnames";
SplashScreen.preventAutoHideAsync();
function RootApplication() {
  const { currentUser } = useSelector(userSelectors.selectUser);
  const Stack = createNativeStackNavigator();

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        socket.initSocket("https://nearhome-api.yanndevs.com");
        // Pre-load fonts, make any API calls you need to do here
        // await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={[tw`h-full`]}>
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
    </View>
  );
}

export default RootApplication;
