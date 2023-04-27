import {
  faCheck,
  faCheckDouble,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
} from "react-native";
import { View } from "react-native";
import { Avatar } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { APP_THEMES } from "../../utils/themes";
import User1 from "../../assets/images/user1.jpg";
import User2 from "../../assets/images/user2.jpeg";

import { StyleSheet } from "react-native";
import { GLOBAL_SERVICE } from "../../utils/globalService";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { conversationSelectors } from "../../redux/ conversations/conversation.selectors";
import { userActions } from "../../redux/user/user.actions";
import { conversationActions } from "../../redux/ conversations/conversation.actions";
import { userSelectors } from "../../redux/user/user.selectors";
import { Audio } from "expo-av";
import { socket } from "../../../socket";
import { current } from "@reduxjs/toolkit";
import LoadingRect from "../../components/loadingSkeleton/loader";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
const ConversationScreens = () => {
  const ShimerPlaceHolder = createShimmerPlaceholder(LinearGradient);

  const dispatch = useDispatch();
  const { isLoading, error, conversations, unread } = useSelector(
    conversationSelectors.selectConversations
  );
  const navigation = useNavigation();
  const { currentUser } = useSelector(userSelectors.selectUser);
  const [sound, setSound] = useState();
  const [lastMessage, setLastmessage] = useState(null);

  let io = socket.getSocket();

  const getConversationProfileImage = (conversation) => {
    if (conversation.participants[0]?._id == conversations.userId) {
      return [
        conversation.participants[1]?.profileImageUrl || null,
        conversation.participants[1]?.firstname,
      ];
    } else {
      return [
        conversation.participants[0]?.profileImageUrl || null,
        conversation.participants[0]?.firstname,
      ];
    }
  };

  const getLastmessageContent = (conversation) => {
    let type = "";
    let content = "";
    if (conversation?.lastMessage?.audioUrl) {
      type = "audio";
      content = conversation?.lastMessage?.audioUrl;
    } else if (conversation?.lastMessage?.videoUrl) {
      type = "video";
      content = conversation?.lastMessage?.videoUrl;
    } else if (conversation?.lastMessage?.docUrl) {
      type = "doc";
      content = conversation?.lastMessage?.docUrl;
    } else if (conversation?.lastMessage?.content) {
      type = "text";
      content = conversation?.lastMessage?.content;
    } else {
      type = null;
      content = null;
    }

    return { type, content };
  };

  async function playSound() {
    try {
      console.log("Loading Sound");
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/audio/whatNot1.mp3")
      );

      setSound(sound);

      console.log("Playing Sound");
      await sound.playAsync();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const onConvPress = (conversation) => {
    // dispatch(conversationActions.setSelectedConversationAsync(conversation));
    navigation.navigate("MessagesScreens", {
      conversationId: conversation._id,
      user1: conversation.participants[0],
      user2: conversation.participants[1],
    });
  };

  useEffect(() => {
    io.on("conversation", (data) => {
      if (data.action === "last_message") {
        console.log("**********************************************888");
        console.log(data.to === currentUser.userId);
        console.log(data);
        setLastmessage({
          content: data.message.content,
          conversation: data.message.conversation,
          sender: data.message.sender,
          date: data?.message?.updatedAt || "00:00",
        });
        dispatch(conversationActions.incrementNotificationAsync());
        if (data.to === currentUser.userId) {
          Vibration.vibrate(2 * 1000);
          playSound();
          // if (conversations?.conversations?.length <= 0) {
          //   dispatch(
          //     conversationActions.fetchConversationAsync(currentUser.token)
          //   );
          // }
          //
        }
      }

      return () => io.removeAllListeners("conversation");
    });
  }, [io]);

  useEffect(() => {
    dispatch(conversationActions.fetchConversationAsync(currentUser.token));
    console.log("********** last messages *******************88");
    console.log(lastMessage);
  }, []);
  return (
    <View
      style={[
        { paddingTop: Platform.OS == "android" && StatusBar.currentHeight },
      ]}
    >
      {/* {isLoading && (
        <ActivityIndicator
          color={APP_THEMES.colors.secondary_color_blue}
          size="large"
        />
      )} */}

      <View style={[tw`pt-5 pl-3 pr-3`, { backgroundColor: "white" }]}>
        <View style={[tw`mt-3 mb-3`]}>
          <ConversationSearch />
        </View>
      </View>

      {/* this si the div for the loaders */}
      {isLoading && (
        <View style={[tw`ml-3 mr-3 mt-3 h-full`]}>
          {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((val, i) => {
            return (
              <View
                key={i}
                style={[
                  { flexDirection: "row", alignItems: "center", flex: 1 },
                  ,
                ]}
              >
                <ShimerPlaceHolder
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                ></ShimerPlaceHolder>
                <ShimerPlaceHolder
                  style={{ flex: 2, height: 50, marginLeft: 10 }}
                ></ShimerPlaceHolder>
                <ShimerPlaceHolder
                  style={{ flex: 1, height: 50, marginLeft: 10 }}
                ></ShimerPlaceHolder>
              </View>
            );
          })}
        </View>
      )}
      {!isLoading && (
        <ScrollView>
          <View>
            <View>
              <View style={[tw`mr-5 ml-5  mb-20`]}>
                {conversations?.conversations?.map((conv, i) => {
                  return (
                    <View style={[tw`mt-8`]} key={i}>
                      <ConversationItem
                        image={getConversationProfileImage(conv)[0] || User2}
                        title={getConversationProfileImage(conv)[1]}
                        subtitle={
                          (lastMessage?.conversation == conv._id &&
                            lastMessage?.content) ||
                          conv.lastMessage?.content
                        }
                        time="11:20"
                        icon={faCheck}
                        currentUser={currentUser}
                        unread={unread}
                        date={
                          (lastMessage?.conversation == conv._id &&
                            lastMessage?.date) ||
                          conv.lastMessage?.updatedAt ||
                          "00:01"
                        }
                        sender={
                          (lastMessage?.conversation == conv._id &&
                            lastMessage?.sender) ||
                          conv.lastMessage?.sender
                        }
                        onPress={() => onConvPress(conv)}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      )}
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
  const {
    image,
    title,
    subtitle,
    time,
    icon,
    iconColor,
    currentUser,
    onPress,
    sender,
    unread,
    date,
  } = props;

  let correctDate = new Date(date).toLocaleTimeString();

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          position: "relative",
        }}
      >
        <View style={[tw`mr-8`, { position: "relative", flex: 1 }]}>
          <Avatar source={User1} rounded size="medium" />
          <View
            style={[styles.notificationPoint, { backgroundColor: "green" }]}
          ></View>
        </View>

        <View style={[{ flex: 8 }]}>
          <Text style={[styles.title, tw`mb-1`]}>{title}</Text>
          <Text style={[styles.subtitle]}>{subtitle}</Text>
        </View>

        <View style={[{ flexDirection: "row", alignItems: "center", flex: 2 }]}>
          {sender === currentUser.userId && (
            <FontAwesomeIcon
              icon={icon}
              color={iconColor || APP_THEMES.colors.color_gray}
            />
          )}

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
            {correctDate}
          </Text>
        </View>

        {unread > 0 && (
          <View
            style={[
              { position: "absolute", right: 0 },
              styles.notificationCount,
            ]}
          >
            <Text style={{ color: "white", fontWeight: "800" }}>{unread}</Text>
          </View>
        )}
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
  notificationCount: {
    color: "white",
    backgroundColor: APP_THEMES.colors.secondary_color_blue,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 10,
  },
});

export default ConversationScreens;
