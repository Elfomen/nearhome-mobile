import React from "react";
import { ImageBackground, Platform, ScrollView, Text } from "react-native";
import { View } from "react-native";
import AppartmentOne from "../../assets/images/appart.jpg";
import AppartmentTwo from "../../assets/images/app2.jpg";
import Appartment3 from "../../assets/images/app3.jpg";
import Appartment4 from "../../assets/images/app4.jpg";
import Appartment5 from "../../assets/images/app5.webp";
import Appartment6 from "../../assets/images/app6.jpg";
import Appartment7 from "../../assets/images/app7.webp";
import Int1 from "../../assets/images/int1.png";
import Int2 from "../../assets/images/int2.jpg";
import Int3 from "../../assets/images/int3.jpg";
import Int4 from "../../assets/images/int4.png";

import Swiper from "react-native-web-swiper";
import { StyleSheet } from "react-native";
import { StatusBar } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Image } from "react-native";
import { APP_THEMES } from "../../utils/themes";

const HouseDetails = () => {
  return (
    <ScrollView
      style={[
        { paddingTop: Platform.OS == "android" && StatusBar.currentHeight },
      ]}
    >
      <View style={[{ height: 220 }]}>
        <Swiper loop>
          <View style={{ flex: 1 }}>
            <ImageBackground
              source={Int1}
              resizeMode="cover"
              style={{ flex: 1, position: "relative" }}
            >
              <View style={styles.cover}></View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontFamily: APP_THEMES.fontFamilies.title,
                    fontSize: APP_THEMES.fontSizez.title + 10,
                    color: APP_THEMES.colors.primary_color_white,
                  }}
                >
                  Palour
                </Text>
              </View>
            </ImageBackground>
            {/* <Image source={Int1} resizeMode="contain" style={{ flex: 1 }} /> */}
          </View>
          <View style={{ flex: 1 }}>
            <ImageBackground
              source={Int2}
              resizeMode="cover"
              style={{ flex: 1, position: "relative" }}
            >
              <View style={styles.cover}></View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontFamily: APP_THEMES.fontFamilies.title,
                    fontSize: APP_THEMES.fontSizez.title + 10,
                    color: APP_THEMES.colors.primary_color_white,
                  }}
                >
                  Main Room
                </Text>
              </View>
            </ImageBackground>
            {/* <Image source={Int2} resizeMode="cover" style={{ flex: 1 }} /> */}
          </View>
          <View style={{ flex: 1 }}>
            <ImageBackground
              source={Int3}
              resizeMode="cover"
              style={{ flex: 1, position: "relative" }}
            >
              <View style={styles.cover}></View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontFamily: APP_THEMES.fontFamilies.title,
                    fontSize: APP_THEMES.fontSizez.title + 10,
                    color: APP_THEMES.colors.primary_color_white,
                  }}
                >
                  Childrens Room
                </Text>
              </View>
            </ImageBackground>
            {/* <Image source={Int3} resizeMode="cover" style={{ flex: 1 }} /> */}
          </View>
        </Swiper>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cover: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: "red",
    backgroundColor: "rgba(0 , 0 , 0 , 0.2)",
  },
});

export default HouseDetails;
