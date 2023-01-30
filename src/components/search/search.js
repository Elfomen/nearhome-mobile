import {
  faMagnifyingGlass,
  faMugSaucer,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { APP_COLORS } from "../../utils/colors/colors";
import { APP_FONT_SIZES } from "../../utils/fontSizes";
import { APP_THEMES } from "../../utils/themes";

const SearchComponent = (props) => {
  const { placeholder, filterClick } = props;
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
        },
      ]}
    >
      <View
        style={[
          tw`mr-3 p-3`,
          {
            borderColor: APP_COLORS.color_gray,
            borderWidth: 1,
            flex: 2,
            borderRadius: 8,
            flexDirection: "row",
            alignItems: "center",
          },
        ]}
      >
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          color={APP_COLORS.color_black}
        />
        <Text
          style={[tw`ml-3 mr-2`, { fontFamily: APP_THEMES.fontFamilies.body }]}
        >
          Search
        </Text>
        <TextInput
          placeholder={placeholder}
          style={[
            {
              fontSize: APP_FONT_SIZES.input,
              fontFamily: APP_THEMES.fontFamilies.body,
            },
          ]}
        />
      </View>
      <TouchableOpacity onPress={filterClick}>
        <View
          style={[
            tw`p-4`,
            {
              borderRadius: 8,
              borderColor: APP_COLORS.color_gray,
              borderWidth: 1,
              flex: 0.2,
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <FontAwesomeIcon icon={faSliders} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchComponent;
