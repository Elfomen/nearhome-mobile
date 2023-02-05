import React from "react";
import { StatusBar, TouchableOpacity } from "react-native";
import { Platform, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/user/user.actions";

const SettingsScreen = () => {
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(userActions.logOutUser());
  };
  return (
    <View
      style={[
        { paddingTop: Platform.OS === "android" && StatusBar.currentHeight },
      ]}
    >
      <TouchableOpacity onPress={logoutUser}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
