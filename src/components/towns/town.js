import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { APP_THEMES } from "../../utils/themes";
import ButtonComponent from "../button/button";

const Towns = (props) => {
  const { title, image } = props;
  return (
    <View
      style={[
        {
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "red",
        },
        styles.cardContainer,
      ]}
    >
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.image}
        imageStyle={{ borderRadius: 8 }}
      >
        <View
          style={{
            position: "absolute",
            backgroundColor: "rgba(0 , 0 , 0 , 0.3)",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 8,
          }}
        ></View>
        <Text
          style={[
            tw`mb-3`,
            {
              fontFamily: APP_THEMES.fontFamilies.title,
              fontSize: APP_THEMES.fontSizez.title,
              color: APP_THEMES.colors.primary_color_white,
            },
          ]}
        >
          {title}
        </Text>
        <ButtonComponent padding={6} text="Explore" icon={faArrowRight} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 120,
    width: 220,
    borderRadius: 8,
  },
  image: {
    borderRadius: 200,
    width: 220,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
});

export default Towns;
