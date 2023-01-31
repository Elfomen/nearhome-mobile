import React from "react";
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Platform, Text } from "react-native";
import { View } from "react-native";
import Background from "../../assets/images/bcd.png";
import tw from "tailwind-react-native-classnames";
import { APP_COLORS } from "../../utils/colors/colors";
import { APP_FONT_SIZES } from "../../utils/fontSizes";
import { APP_THEMES } from "../../utils/themes";
import AuthenticationInput from "../../components/authInput/auth";
import {
  faAlignJustify,
  faEye,
  faLock,
  faRightLong,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { LinearGradient } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        tw`h-full`,
        // { paddingTop: Platform.OS === "android" && StatusBar.currentHeight },
      ]}
    >
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={[{ flex: 1, position: "relative" }]}
      >
        <View
          style={[
            {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.6)",
            },
          ]}
        ></View>

        <ScrollView style={[tw`ml-5 mr-5 mt-40`]}>
          <View>
            <Text
              style={[
                {
                  color: APP_COLORS.primary_color_white,
                  textAlign: "center",
                  fontSize: APP_THEMES.fontSizez.xxl,
                  fontFamily: APP_THEMES.fontFamilies.title,
                },
              ]}
            >
              Hello
            </Text>
            <Text
              style={[
                {
                  color: APP_THEMES.colors.primary_color_white,
                  fontSize: APP_THEMES.fontSizez.medium,
                  fontFamily: APP_THEMES.fontFamilies.title,
                  textAlign: "center",
                },
              ]}
            >
              Sign into your Account
            </Text>
          </View>

          <View style={[tw`mt-10`]}>
            <AuthenticationInput placeholder="Username" firstIcon={faUser} />
          </View>

          <View style={[tw`mt-10`]}>
            <AuthenticationInput
              placeholder="Password"
              firstIcon={faLock}
              secondIcon={faEye}
              password={true}
            />
          </View>

          <TouchableOpacity>
            <Text
              style={[
                tw`mt-6 mr-3`,
                {
                  color: APP_THEMES.colors.primary_color_white,
                  fontSize: APP_THEMES.fontSizez.small,
                  fontFamily: APP_THEMES.fontFamilies.title,
                  textAlign: "right",
                },
              ]}
            >
              Forgot your password?
            </Text>
          </TouchableOpacity>

          <View
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              },
              tw`mt-10`,
            ]}
          >
            <Text
              style={[
                tw`mr-5`,
                {
                  color: APP_THEMES.colors.primary_color_white,
                  fontSize: APP_THEMES.fontSizez.xl,
                  fontFamily: APP_THEMES.fontFamilies.title,
                },
              ]}
            >
              Sign In
            </Text>
            <TouchableOpacity
              style={[
                tw`mr-3`,
                {
                  backgroundColor: "#080871",
                  paddingHorizontal: 28,
                  paddingVertical: 8,
                  borderRadius: 25,
                },
              ]}
            >
              <FontAwesomeIcon
                icon={faRightLong}
                color={APP_THEMES.colors.primary_color_white}
                size={35}
              />
            </TouchableOpacity>
          </View>

          <View
            style={[
              tw`mt-10`,
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <Text
              style={[
                {
                  color: APP_THEMES.colors.primary_color_white,
                  fontSize: APP_THEMES.fontSizez.small,
                  fontFamily: APP_THEMES.fontFamilies.title,
                },
              ]}
            >
              Don't yet have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              <Text
                style={[
                  {
                    color: APP_THEMES.colors.primary_color_white,
                    fontSize: APP_THEMES.fontSizez.medium,
                    fontFamily: APP_THEMES.fontFamilies.title,
                    textDecorationLine: "underline",
                  },
                ]}
              >
                Create One Here
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>

      <StatusBar barStyle="dark-content" />
      <ExpoStatusBar backgroundColor="transparent" />
    </View>
  );
};

export default LoginScreen;
