import {
  faCheckDouble,
  faChevronLeft,
  faEllipsisVertical,
  faFaceSmile,
  faFile,
  faMicrophone,
  faPaperclip,
  faPhone,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { View, Text, Platform, StatusBar } from "react-native";
import { Avatar } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import User from "../../assets/images/user1.jpg";
import { APP_THEMES } from "../../utils/themes";
const MessagesScreen = () => {
  const navigation = useNavigation();

  return (
    <View
      style={[
        { paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0 },
      ]}
    >
      <View
        style={[
          tw`pb-2 pt-5 pl-3 pr-3`,
          {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
          },
        ]}
      >
        <TouchableOpacity
          style={{ flex: 2 }}
          onPress={() => navigation.goBack()}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            size={20}
            color={APP_THEMES.colors.color_gray}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            size={20}
            color={APP_THEMES.colors.color_gray}
          />
        </TouchableOpacity>
      </View>
      <View style={[tw`pb-3 pl-3 pr-3`, { backgroundColor: "white" }]}>
        <MessageHeaders title="Fomena Yannick" subtitle="Online" />
      </View>

      <ScrollView style={[tw`pl-3 pr-3`, { height: "76%" }]}>
        <Text
          style={[
            tw`mt-3 mb-1`,
            {
              fontFamily: APP_THEMES.fontFamilies.body,
              color: APP_THEMES.colors.color_gray,
              textAlign: "center",
              fontWeight: "700",
            },
          ]}
        >
          Today
        </Text>
        <MessageComponent
          content="Hi Mr Fomena, i need an appartment"
          time="17:00"
        />
        <View style={[tw`mt-4`]}>
          <MessageComponent
            content="Hi dear, thankyou for contacting us"
            time="17:00"
            isSender={true}
          />
        </View>
        <View style={[tw`mt-4`]}>
          <MessageComponent
            content="Welcome to the best housing company in cameroon. you are inside right hand😇😇😇😇"
            time="17:00"
            isSender={true}
          />
        </View>
        <View style={[tw`mt-4`]}>
          <MessageComponent
            content="Oh thankyou very much😇😇😇😇 am happy✨✨✨✨"
            time="17:00"
          />
        </View>
        <View style={[tw`mt-4`]}>
          <MessageComponent
            content="So which kind of appartment do you need sir please?"
            time="17:00"
            isSender={true}
          />
        </View>
        <View style={[tw`mt-4`]}>
          <MessageComponent content="🏄🏄🏄🏄🏄🏄🏄🏄🏄" time="17:00" />
        </View>
        <View style={[tw`mt-4`]}>
          <MessageComponent content="That is my life🎅🎅🎅🎅" time="17:00" />
        </View>
        <View style={[tw`mt-4`]}>
          <MessageComponent
            content="I think i have something good for you sir😀😀"
            time="17:00"
            isSender={true}
          />
        </View>
        <View style={[tw`mt-4 mb-10`]}>
          <MessageComponent
            content="I think i have the best 💖💖"
            time="17:00"
            isSender={true}
          />
        </View>
      </ScrollView>

      <View
        style={[
          tw`p-5`,
          {
            backgroundColor: "white",
            flexDirection: "row",
            alignItems: "center",
          },
        ]}
      >
        <View style={[{ flexDirection: "row", alignItems: "center" }]}>
          <TouchableOpacity style={[tw`mr-3`]}>
            <FontAwesomeIcon
              color={APP_THEMES.colors.color_gray}
              size={21}
              icon={faPaperclip}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesomeIcon
              color={APP_THEMES.colors.color_gray}
              size={21}
              icon={faFaceSmile}
            />
          </TouchableOpacity>
        </View>

        <View style={[{ flex: 2 }, tw`ml-5`]}>
          <TextInput placeholder="Message..." />
        </View>

        <View style={[{ flexDirection: "row", alignItems: "center" }]}>
          <TouchableOpacity style={[tw`mr-2`]}>
            <FontAwesomeIcon
              color={APP_THEMES.colors.color_gray}
              size={21}
              icon={faFile}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesomeIcon
              color={APP_THEMES.colors.color_gray}
              size={21}
              icon={faMicrophone}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const MessageHeaders = (props) => {
  const { title, subtitle } = props;
  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          <Avatar source={User} rounded size="medium" />
        </View>

        <View style={{ flex: 4, marginLeft: 10 }}>
          <Text style={[styles.title, tw`mb-1`]}>{title}</Text>
          <Text style={[styles.subtitle, { color: "green" }]}>{subtitle}</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <TouchableOpacity>
            <View style={[tw`mr-3`]}>
              <FontAwesomeIcon
                icon={faPhone}
                size={20}
                color={APP_THEMES.colors.color_gray}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View>
              <FontAwesomeIcon
                icon={faSearch}
                size={20}
                color={APP_THEMES.colors.color_gray}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const MessageComponent = (props) => {
  const { isSender, content, time, audioUrl, videoUrl, fileUrl } = props;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: isSender ? "flex-end" : "flex-start",
      }}
    >
      <View
        style={[
          tw`p-3`,
          {
            flexDirection: "row",
            alignItems: "center",
            width: "90%",
            borderRadius: 8,
            backgroundColor: isSender
              ? "#80ccff"
              : APP_THEMES.colors.primary_color_white,
          },
        ]}
      >
        <Text
          style={{
            fontFamily: APP_THEMES.fontFamilies.body,
            color: APP_THEMES.colors.color_black,
            fontSize: APP_THEMES.fontSizez.medium,
            flex: 20,
          }}
        >
          {content}
        </Text>
        {isSender && (
          <View style={{ flex: 2 }}>
            <FontAwesomeIcon
              icon={faCheckDouble}
              color={APP_THEMES.colors.secondary_color_blue}
            />
          </View>
        )}
        <Text
          style={{
            fontFamily: APP_THEMES.fontFamilies.body,
            color: APP_THEMES.colors.color_black,
            fontSize: APP_THEMES.fontSizez.xsmall,

            flex: 2,
          }}
        >
          {time}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default MessagesScreen;
