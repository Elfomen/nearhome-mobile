import {
  faCheck,
  faCheckDouble,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import { Avatar } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { APP_THEMES } from "../../utils/themes";
import User from "../../assets/images/user.png";
import User1 from "../../assets/images/user1.jpg";
import User2 from "../../assets/images/user2.jpeg";
import User3 from "../../assets/images/user3.jpeg";
import User4 from "../../assets/images/user4.jpeg";
import User5 from "../../assets/images/user5.jpeg";
import User6 from "../../assets/images/user6.png";
import User7 from "../../assets/images/user7.png";
import User8 from "../../assets/images/user8.png";
import User9 from "../../assets/images/user9.jpeg";

import { StyleSheet } from "react-native";
import { GLOBAL_SERVICE } from "../../utils/globalService";
import { useNavigation } from "@react-navigation/native";

const ConversationScreens = () => {
  return (
    <View
      style={[
        { paddingTop: Platform.OS == "android" && StatusBar.currentHeight },
      ]}
    >
      <View style={[tw`pt-5 pl-3 pr-3`, { backgroundColor: "white" }]}>
        <Text
          style={[
            {
              fontFamily: APP_THEMES.fontFamilies.title,
              fontSize: APP_THEMES.fontSizez.title,
            },
          ]}
        >
          Chats
        </Text>
        <View style={[tw`mt-3 mb-3`]}>
          <ConversationSearch />
        </View>
      </View>
      <ScrollView>
        <View>
          <View>
            <View style={[tw`mr-5 ml-5  mb-20`]}>
              <View style={[tw`mt-8`]}>
                <ConversationItem
                  image={User1}
                  title="Fomena Yannick"
                  subtitle="Hey yanndevs 👋 how are you?"
                  time="11:20"
                  icon={faCheck}
                />
              </View>
              <View style={[tw`mt-8`]}>
                <ConversationItem
                  image={User2}
                  title="Manboll Form"
                  subtitle="Manborn you were supposed to pay me today, what is ...."
                  time="11:21"
                  icon={faCheckDouble}
                  iconColor={APP_THEMES.colors.secondary_color_blue}
                />
              </View>
              <View style={[tw`mt-8`]}>
                <ConversationItem
                  icon={faCheckDouble}
                  image={User3}
                  title="Manboll Form"
                  subtitle="Manborn you were supposed to pay me today, what is ...."
                  time="11:44"
                  iconColor={APP_THEMES.colors.secondary_color_blue}
                />
              </View>
              <View style={[tw`mt-8`]}>
                <ConversationItem
                  icon={faCheckDouble}
                  image={User4}
                  title="Manboll Form"
                  subtitle="Manborn you were supposed to pay me today, what is ...."
                  time="11:53"
                />
              </View>
              <View style={[tw`mt-8`]}>
                <ConversationItem
                  icon={faCheckDouble}
                  image={User5}
                  title="Manboll Form"
                  subtitle="Manborn you were supposed to pay me today, what is ...."
                  time="12:32"
                  iconColor={APP_THEMES.colors.secondary_color_blue}
                />
              </View>
              <View style={[tw`mt-8`]}>
                <ConversationItem
                  icon={faCheckDouble}
                  image={User6}
                  title="Manboll Form"
                  subtitle="Manborn you were supposed to pay me today, what is ...."
                  time="12:55"
                  iconColor={APP_THEMES.colors.secondary_color_blue}
                />
              </View>
              <View style={[tw`mt-8`]}>
                <ConversationItem
                  icon={faCheckDouble}
                  image={User7}
                  title="Manboll Form"
                  subtitle="Manborn you were supposed to pay me today, what is ...."
                  time="yesterday"
                  iconColor={APP_THEMES.colors.secondary_color_blue}
                />
              </View>
              <View style={[tw`mt-8`]}>
                <ConversationItem
                  icon={faCheckDouble}
                  image={User8}
                  title="Manboll Form"
                  subtitle="Manborn you were supposed to pay me today, what is ...."
                  time="yesterday"
                />
              </View>
              <View style={[tw`mt-8`]}>
                <ConversationItem
                  icon={faCheckDouble}
                  image={User9}
                  title="Manboll Form"
                  subtitle="Manborn you were supposed to pay me today, what is ...."
                  time="2 days"
                />
              </View>
              <View style={[tw`mt-8`]}>
                <ConversationItem
                  icon={faCheckDouble}
                  image={User4}
                  title="Manboll Form"
                  subtitle="Manborn you were supposed to pay me today, what is ...."
                  time="2 days"
                />
              </View>
              <View style={[tw`mt-8 mb-10`]}>
                <ConversationItem
                  icon={faCheckDouble}
                  image={User6}
                  title="Manboll Form"
                  time="2 days"
                  subtitle="Manborn you were supposed to pay me today, what is ...."
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const ConversationSearch = () => {
  return (
    <View
      style={[
        tw`p-3`,
        {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#f7f7f5",
          borderRadius: 8,
        },
      ]}
    >
      <FontAwesomeIcon icon={faSearch} />
      <TextInput
        placeholder="Search for chats amd messages"
        style={[tw`ml-3`, { fontFamily: APP_THEMES.fontFamilies.body }]}
      />
    </View>
  );
};

const ConversationItem = (props) => {
  const { image, title, subtitle, time, icon, iconColor } = props;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => GLOBAL_SERVICE.navigateTo(navigation, "MessagesScreens")}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", width: "100%" }}
      >
        <View style={[tw`mr-8`, { position: "relative", flex: 1 }]}>
          <Avatar source={image} rounded size="medium" />
          <View
            style={[styles.notificationPoint, { backgroundColor: "green" }]}
          ></View>
        </View>

        <View style={[{ flex: 8 }]}>
          <Text style={[styles.title, tw`mb-1`]}>{title}</Text>
          <Text style={[styles.subtitle]}>{subtitle}</Text>
        </View>

        <View style={[{ flexDirection: "row", alignItems: "center", flex: 2 }]}>
          <FontAwesomeIcon
            icon={icon}
            color={iconColor || APP_THEMES.colors.color_gray}
          />
          <Text
            style={[
              tw`ml-3`,
              {
                color: APP_THEMES.colors.color_gray,
                fontFamily: APP_THEMES.fontFamilies.body,
                fontSize: APP_THEMES.fontSizez.xsmall,
              },
            ]}
          >
            {time}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  notificationPoint: {
    width: 18,
    height: 18,
    borderRadius: 9,
    position: "absolute",
    right: -24,
    // top: 30,
    bottom: 0,
    borderWidth: 1,
    borderColor: APP_THEMES.colors.primary_color_white,
  },

  title: {
    fontFamily: APP_THEMES.fontFamilies.title,
    fontSize: APP_THEMES.fontSizez.smallTitle,
  },
  subtitle: {
    fontFamily: APP_THEMES.fontFamilies.title,
    fontSize: APP_THEMES.fontSizez.small,
    color: APP_THEMES.colors.color_gray,
  },
});

export default ConversationScreens;
