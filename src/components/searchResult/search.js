import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { TextInput, View, Text, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { GLOBAL_SERVICE } from "../../utils/globalService";
import { APP_THEMES } from "../../utils/themes";

const SearchResultInput = (props) => {
  const { placeholder, linkUrl } = props;
  const navigation = useNavigation();
  return (
    <View
      style={[
        tw`mr-3 p-3`,
        {
          borderColor: APP_THEMES.colors.color_gray,
          borderWidth: 1,
          flex: 2,
          borderRadius: 8,
          flexDirection: "row",
          alignItems: "center",
        },
      ]}
    >
      <TouchableOpacity
        onPress={() =>
          linkUrl && GLOBAL_SERVICE.navigateTo(navigation, linkUrl)
        }
      >
        <View style={[tw`mr-3`]}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            color={APP_THEMES.colors.color_black}
          />
        </View>
      </TouchableOpacity>

      <TextInput
        placeholder={placeholder}
        value="Douala, Yaounde"
        style={[
          {
            fontSize: APP_THEMES.fontSizez.input,
            fontFamily: APP_THEMES.fontFamilies.body,
          },
        ]}
      />
    </View>
  );
};

export default SearchResultInput;
