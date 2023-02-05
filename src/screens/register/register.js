import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
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
  faChevronLeft,
  faEnvelope,
  faEye,
  faLock,
  faPhone,
  faRightLong,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { LinearGradient } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux/user/user.actions";
import { userSelectors } from "../../redux/user/user.selectors";

const RegisterScreen = () => {
  const { error, isLoading } = useSelector(userSelectors.selectUser);

  const [justLoaded, setJustLoaded] = useState(true);

  const [userData, setUserData] = useState({
    firstname: null,
    lastname: null,
    username: null,
    phoneNumber: null,
    email: null,
    password: null,
    userType: "tenant",
  });
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const checkUserData = () => {
    if (!userData.username) return "Username name is required";
    if (!userData.firstname) return "First name is required";
    if (!userData.lastname) return "Lastname name is required";
    if (!userData.phoneNumber) return "Phone Number is required";
    if (!userData.email) return "Email is required";
    if (!userData.password) return "Password  is required";

    return true;
  };

  const onInputChanged = (key, value) => {
    let newOb = {};
    newOb[key] = value;
    setUserData({ ...userData, ...newOb });
  };

  const sigupUser = () => {
    let dataValid = checkUserData();
    if (dataValid === true) {
      dispatch(userActions.signupUser(userData));
    } else {
      Alert.alert("Error", dataValid, [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK" },
      ]);
    }
  };

  useEffect(() => {
    if (!justLoaded) {
      if (error) {
        Alert.alert("Error", error, [
          {
            text: "Cancel",
            style: "cancel",
          },
          { text: "OK" },
        ]);
      }
    }
  }, [error]);

  useEffect(() => {
    setJustLoaded(false);
  }, []);

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

        <View
          style={[
            { flexDirection: "row", alignItems: "center" },
            tw`mt-10 ml-5`,
          ]}
        >
          <TouchableOpacity
            style={[tw`mr-3`]}
            onPress={() => navigation.goBack()}
          >
            <FontAwesomeIcon icon={faChevronLeft} color="white" size={30} />
          </TouchableOpacity>
          <View>
            <Text
              style={[
                {
                  color: APP_THEMES.colors.primary_color_white,
                  fontSize: APP_THEMES.fontSizez.large,
                  fontFamily: APP_THEMES.fontFamilies.title,
                  textAlign: "center",
                },
              ]}
            >
              Create a new Account
            </Text>
          </View>
        </View>

        <ScrollView style={[tw`ml-5 mr-5 mt-7`]}>
          <View style={[tw`mt-10`]}>
            <AuthenticationInput
              defaultValue={userData.username || ""}
              onChange={(e) => onInputChanged("username", e)}
              placeholder="Username"
              hasError={userData.username ? false : true}
              firstIcon={faUser}
            />
          </View>

          <View style={[{ flexDirection: "row", alignItems: "center" }]}>
            <View style={[tw`mt-10 mr-1`, { flex: 1 }]}>
              <AuthenticationInput
                placeholder="Firstname"
                hasError={userData.firstname ? false : true}
                defaultValue={userData.firstname || ""}
                onChange={(e) => onInputChanged("firstname", e)}
                firstIcon={faUser}
              />
            </View>
            <View style={[tw`mt-10`, { flex: 1 }]}>
              <AuthenticationInput
                defaultValue={userData.lastname || ""}
                onChange={(e) => onInputChanged("lastname", e)}
                placeholder="Lastname"
                firstIcon={faUser}
                hasError={userData.lastname ? false : true}
              />
            </View>
          </View>

          <View style={[tw`mt-10`]}>
            <AuthenticationInput
              defaultValue={userData.password || ""}
              onChange={(e) => onInputChanged("password", e)}
              placeholder="Password"
              firstIcon={faLock}
              hasError={userData.password ? false : true}
              secondIcon={faEye}
              password={true}
            />
          </View>
          <View style={[tw`mt-10`]}>
            <AuthenticationInput
              placeholder="Email"
              hasError={userData.email ? false : true}
              firstIcon={faEnvelope}
              defaultValue={userData.email || ""}
              onChange={(e) => onInputChanged("email", e)}
              email={true}
            />
          </View>
          <View style={[tw`mt-10`]}>
            <AuthenticationInput
              placeholder="Phone Number"
              hasError={userData.phoneNumber ? false : true}
              defaultValue={userData.phoneNumber || ""}
              onChange={(e) => onInputChanged("phoneNumber", e)}
              firstIcon={faPhone}
              phone={true}
            />
          </View>

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
              Create
            </Text>
            <TouchableOpacity
              onPress={sigupUser}
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
              <View style={[{ flexDirection: "row", alignItems: "center" }]}>
                {!isLoading && (
                  <FontAwesomeIcon
                    icon={faRightLong}
                    color={APP_THEMES.colors.primary_color_white}
                    size={35}
                  />
                )}
                {isLoading && (
                  <ActivityIndicator size="large" color="#0099cc" />
                )}
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={[
              tw`mt-10 mb-10`,
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
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
                Sign in here
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>

      {/* <StatusBar barStyle="dark-content" />
      <ExpoStatusBar backgroundColor="transparent" /> */}
    </View>
  );
};

export default RegisterScreen;
