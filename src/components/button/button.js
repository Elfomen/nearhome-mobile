import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Text } from "react-native";
import tw from "tailwind-react-native-classnames";
import { APP_COLORS } from "../../utils/colors/colors";
import { APP_FONT_SIZES } from "../../utils/fontSizes";
import { GLOBAL_SERVICE } from "../../utils/globalService";
import { APP_THEMES } from "../../utils/themes";

const ButtonComponent = (props) => {
  const navigation = useNavigation();
  const { text, icon, background, padding, color, linkUrl, onPress } = props;

  const handleButtonPress = () => {
    onPress && onPress();
    linkUrl && GLOBAL_SERVICE.navigateTo(navigation, linkUrl);
  };

  return (
    <TouchableOpacity
      onPress={handleButtonPress}
      style={[
        tw`pl-8 pr-8 pt-2 pb-2`,
        {
          backgroundColor: background || APP_COLORS.primary_color_white,
          borderRadius: 8,
        },
      ]}
    >
      <View
        style={{
          padding: padding || 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: !icon ? "center" : "flex-start",
        }}
      >
        <Text
          style={[
            {
              fontFamily: APP_THEMES.fontFamilies.body,
              color: color || APP_THEMES.colors.color_black,
            },
            tw`mr-3`,
          ]}
        >
          {text}
        </Text>
        {icon && <FontAwesomeIcon icon={icon} />}
      </View>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
