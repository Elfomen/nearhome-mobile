import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faBed,
  faBuilding,
  faKitchenSet,
  faShower,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { GLOBAL_SERVICE } from "../../utils/globalService";
import { APP_THEMES } from "../../utils/themes";

const HousesComponent = (props) => {
  const navigation = useNavigation();
  const { image, type, price, address, full } = props;
  return (
    <TouchableOpacity
      onPress={() => GLOBAL_SERVICE.navigateTo(navigation, "HouseDetails")}
    >
      <View style={[styles.imageContainer, { width: full ? "100%" : 250 }]}>
        <ImageBackground
          resizeMode="cover"
          style={[styles.image, { width: full ? "100%" : 250 }]}
          source={image}
          imageStyle={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
        >
          <View style={[{ position: "absolute", top: 10, right: 10 }]}>
            <TouchableOpacity>
              <FontAwesomeIcon
                icon={faHeart}
                size={25}
                color={APP_THEMES.colors.primary_color_white}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      <View style={[tw`mt-1`, { flexDirection: "row", alignItems: "center" }]}>
        <FontAwesomeIcon
          icon={faBuilding}
          color={APP_THEMES.colors.color_orange}
        />
        <Text
          style={[
            tw`ml-2`,
            {
              color: APP_THEMES.colors.color_orange,
              fontFamily: APP_THEMES.fontFamilies.body,
            },
          ]}
        >
          {type}
        </Text>
      </View>
      <View style={[{ flexDirection: "row", alignItems: "center" }]}>
        <Text
          style={[
            {
              fontFamily: APP_THEMES.fontFamilies.title,
              fontSize: APP_THEMES.fontSizez.subtitle,
            },
          ]}
        >
          {price} XAF
        </Text>
        <Text
          style={[
            {
              fontFamily: APP_THEMES.fontFamilies.title,
              fontSize: APP_THEMES.fontSizez.subtitle,
              color: APP_THEMES.colors.color_gray,
            },
          ]}
        >
          /Month
        </Text>
      </View>

      <View style={[{ width: 250 }]}>
        <Text
          style={[
            {
              fontFamily: APP_THEMES.fontFamilies.body,
              fontSize: APP_THEMES.fontSizez.small,
              color: APP_THEMES.colors.color_gray,
              fontWeight: "800",
            },
          ]}
        >
          {address}
        </Text>
      </View>

      <View style={[tw`mt-2`, { flexDirection: "row", alignItems: "center" }]}>
        <View
          style={[tw`mr-3`, { flexDirection: "row", alignItems: "center" }]}
        >
          <FontAwesomeIcon icon={faBed} color={APP_THEMES.colors.color_gray} />
          <Text
            style={[
              tw`ml-1`,
              {
                fontFamily: APP_THEMES.fontFamilies.body,
                fontSize: APP_THEMES.fontSizez.small,
                color: APP_THEMES.colors.color_gray,
                fontWeight: "800",
              },
            ]}
          >
            1
          </Text>
        </View>

        <View
          style={[tw`mr-3`, { flexDirection: "row", alignItems: "center" }]}
        >
          <FontAwesomeIcon
            icon={faShower}
            color={APP_THEMES.colors.color_gray}
          />
          <Text
            style={[
              tw`ml-1`,
              {
                fontFamily: APP_THEMES.fontFamilies.body,
                fontSize: APP_THEMES.fontSizez.small,
                color: APP_THEMES.colors.color_gray,
                fontWeight: "800",
              },
            ]}
          >
            1
          </Text>
        </View>

        <View
          style={[tw`mr-3`, { flexDirection: "row", alignItems: "center" }]}
        >
          <FontAwesomeIcon
            icon={faKitchenSet}
            color={APP_THEMES.colors.color_gray}
          />
          <Text
            style={[
              tw`ml-1`,
              {
                fontFamily: APP_THEMES.fontFamilies.body,
                fontSize: APP_THEMES.fontSizez.small,
                color: APP_THEMES.colors.color_gray,
                fontWeight: "800",
              },
            ]}
          >
            1
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  imageContainer: {
    height: 150,
    position: "relative",
  },
});

export default HousesComponent;
