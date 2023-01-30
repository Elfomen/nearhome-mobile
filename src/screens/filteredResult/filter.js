import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Platform, ScrollView, StatusBar, Text } from "react-native";
import { View } from "react-native";
import tw from "tailwind-react-native-classnames";
import HousesComponent from "../../components/houses/house";
import SearchResultInput from "../../components/searchResult/search";
import { APP_COLORS } from "../../utils/colors/colors";
import { APP_THEMES } from "../../utils/themes";
import AppartmentOne from "../../assets/images/appart.jpg";

const FilteredResult = () => {
  return (
    // this si to be changed to a flatlist
    <ScrollView
      style={[
        { paddingTop: Platform.OS == "android" && StatusBar.currentHeight },
      ]}
    >
      <View style={[tw`ml-3 mr-3 mt-5`]}>
        <View style={[tw`mb-5`]}>
          <SearchResultInput placeholder="Douala, Yaounde" linkUrl="Home" />
        </View>

        <ScrollView horizontal style={[tw`pb-2`]}>
          <View>
            <FilterHeaderComponent
              background={true}
              icon={true}
              text="Filter"
              color={APP_THEMES.colors.primary_color_white}
            />
          </View>

          {["Appartment", "Price Monthly", "Studio"].map((val, i) => {
            return (
              <View style={[tw`ml-3`]} key={i}>
                <FilterHeaderComponent text={val} />
              </View>
            );
          })}
        </ScrollView>

        <View>
          <Text
            style={[
              tw`mt-8`,
              {
                fontFamily: APP_THEMES.fontFamilies.title,
                fontSize: APP_THEMES.fontSizez.title,
              },
            ]}
          >
            Properties
          </Text>
        </View>

        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((val, i) => {
          return (
            <View style={[tw`mb-10`]} key={i}>
              <HousesComponent
                full={true}
                image={AppartmentOne}
                type="Appartment"
                price="150 000"
                address="Douala bonamousadi -Denver Fin goudron laureat"
              />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const FilterHeaderComponent = (props) => {
  const { text, background, icon, color } = props;

  return (
    <View
      style={[
        tw`pl-5 pr-5 pt-2 pb-2`,
        {
          backgroundColor: background
            ? APP_THEMES.colors.color_orange
            : "transparent",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: icon ? "flex-start" : "center",
          borderRadius: 25,
          borderColor: APP_THEMES.colors.color_gray,
          borderWidth: 0.5,
        },
      ]}
    >
      {icon && (
        <FontAwesomeIcon
          icon={faSliders}
          color={APP_THEMES.colors.primary_color_white}
        />
      )}

      <Text
        style={[
          tw`ml-3`,
          {
            fontFamily: APP_THEMES.fontFamilies.body,
            color: color || APP_THEMES.colors.color_black,
          },
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

export default FilteredResult;
