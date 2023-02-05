import {
  faCheckDouble,
  faChevronLeft,
  faClock,
  faEllipsisVertical,
  faFaceSmile,
  faFile,
  faMicrophone,
  faPaperclip,
  faPaperPlane,
  faPause,
  faPhone,
  faPlay,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { Audio, Video } from "expo-av";
import { startTransition, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
} from "react-native";
import {
  Button,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { View, Text, Platform, StatusBar } from "react-native";
import { Avatar } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import User from "../../assets/images/user1.jpg";
import { userSelectors } from "../../redux/user/user.selectors";
import { GlobalConstants } from "../../utils/constants";
import { APP_THEMES } from "../../utils/themes";
import NoImage from "../../assets/images/no-image.png";
import { messagesActions } from "../../redux/messages/message.action";
import { messageSelectors } from "../../redux/messages/message.selectors";
import { socket } from "../../../socket";
import { conversationSelectors } from "../../redux/ conversations/conversation.selectors";
import { conversationActions } from "../../redux/ conversations/conversation.actions";
const MessagesScreen = ({ route }) => {
  const { currentUser } = useSelector(userSelectors.selectUser);
  const navigation = useNavigation();
  const { conversationId, user1, user2 } = route.params;

  const { messages, isLoading, error, sendLoading } = useSelector(
    messageSelectors.selectMessages
  );

  const { unread } = useSelector(conversationSelectors.selectConversations);

  const io = socket.getSocket();

  const [messageInput, setMessageInput] = useState("");
  const [sound, setSound] = useState();
  const [showEmoji, setShowEmoji] = useState(false);

  const dispatch = useDispatch();

  const sendMessage = async () => {
    if (messageInput) {
      dispatch(
        messagesActions.sendNewMessage(
          conversationId,
          user1._id === currentUser.userId ? user2._id : user1._id,
          messageInput,
          currentUser.token,
          currentUser.userId,
          playSound,
          setMessageInput
        )
      );
    }
  };

  // playing notification sound
  async function playSound() {
    try {
      console.log("Loading Sound");
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/audio/three.mp3")
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

  useEffect(() => {
    dispatch(messagesActions.fetchMessages(conversationId, currentUser.token));
  }, []);

  useEffect(() => {
    dispatch(conversationActions.emptyNotificationAsync());
  }, [unread]);

  useEffect(() => {
    socket.getSocket().on("message", (data) => {
      console.log("******** logging my data");
      console.log(data);
      if (data.action === "new_message") {
        // if (data.to === currentUser.userId) {
        let sent = {
          _id: data._id,
          content: data.message.content,
          conversation: data.conversationId,
          sender: data.from,
          updatedAt: data.message.updatedAt,
        };

        dispatch(messagesActions.addMessage(sent));
        // }

        // setPresentMessages([...presentMessages, sent]);
      }
    });

    return () => socket.getSocket().removeAllListeners("message");
  }, [io]);

  return (
    <View
      style={[
        tw`h-full`,
        {
          paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
          position: "relative",
        },
      ]}
    >
      {isLoading ? (
        <View>
          <ActivityIndicator
            size="large"
            color={APP_THEMES.colors.secondary_color_blue}
          />
        </View>
      ) : (
        <View style={[tw`h-full`]}>
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
            <MessageHeaders
              title={
                user1._id === currentUser.userId
                  ? `${user2.firstname} ${user2.lastname}`
                  : `${user1.firstname} ${user1.lastname}`
              }
              subtitle="Online"
            />
          </View>

          {/* <ScrollView style={[tw`pl-3 pr-3`, { height: "76%" }]}> */}
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

          {messages && (
            <FlatList
              inverted
              scrollsToTop
              style={[{ height: "76%" }]}
              data={[...messages]}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <View style={[]}>
                  <MessageComponent
                    content={item?.content}
                    time={item.updatedAt || "00:01"}
                    isSender={item?.sender == currentUser.userId ? true : false}
                    videoUrl={item?.videoUrl}
                    audioUrl={item?.audioUrl}
                    imageUrl={item?.imageUrl}
                    docUrl={item?.docUrl}
                  />
                </View>
              )}
            />
          )}

          <View style={[tw`mb-20`]}></View>

          <View
            style={[
              tw`p-5`,
              {
                backgroundColor: "white",
                flexDirection: "row",
                alignItems: "center",
                position: "absolute",
                bottom: 0,
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
              <TouchableOpacity onPress={() => setShowEmoji(!showEmoji)}>
                <FontAwesomeIcon
                  color={APP_THEMES.colors.color_gray}
                  size={21}
                  icon={faFaceSmile}
                />
              </TouchableOpacity>
            </View>

            <View style={[{ flex: 2 }, tw`ml-5`]}>
              <TextInput
                placeholder="Message..."
                value={messageInput}
                onChangeText={(e) => setMessageInput(e)}
              />
            </View>

            <View style={[{ flexDirection: "row", alignItems: "center" }]}>
              <TouchableOpacity onPress={sendMessage}>
                {sendLoading ? (
                  <ActivityIndicator
                    color={APP_THEMES.colors.secondary_color_blue}
                    size="small"
                  />
                ) : (
                  <FontAwesomeIcon
                    color={APP_THEMES.colors.color_gray}
                    size={21}
                    icon={messageInput ? faPaperPlane : faMicrophone}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
  const {
    isSender,
    content,
    time,
    audioUrl,
    videoUrl,
    imageUrl,
    docUrl,
    icon,
  } = props;

  const video = useRef(null);
  const [status, setStatus] = useState({});

  let correctTime = new Date(time).toLocaleTimeString();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: isSender ? "flex-end" : "flex-start",
      }}
    >
      {/* {audioUrl && (
        <View style={styles.container}>
          <Button title="Play Sound" onPress={playSound} />
        </View>
      )} */}

      {/* {videoUrl && (
        <View style={[styles.videoContainer, tw`mt-4`]}>
          <Video
            ref={video}
            // isTVSelectable
            style={[styles.mainVideo]}
            videoStyle={{ borderRadius: 8 }}
            source={{
              uri: `${GlobalConstants.baseUrl}/${videoUrl}`,
            }}
            useNativeControls
            resizeMode="cover"
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
          {!status.isPlaying && <View style={styles.coverScreen}></View>}
          {!status.isPlaying && (
            <View style={styles.videoButton}>
              <TouchableOpacity
                onPress={() =>
                  status.isPlaying
                    ? video.current.pauseAsync()
                    : video.current.playAsync()
                }
              >
                <FontAwesomeIcon
                  icon={status.isPlaying ? faPause : faPlay}
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )} */}

      {imageUrl && (
        <View style={[styles.imageContainer, tw`mt-4`, { borderRadius: 8 }]}>
          <ImageBackground
            source={NoImage}
            resizeMode="cover"
            style={{ flex: 1 }}
            imageStyle={{ borderRadius: 8 }}
          >
            <Image
              source={{ uri: `${GlobalConstants.baseUrl}/${imageUrl}` }}
              resizeMode="cover"
              style={{ flex: 1, borderRadius: 8 }}
            />
          </ImageBackground>
        </View>
      )}

      {content && (
        <View
          style={[
            tw`p-3 mt-4`,
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
                icon={icon || faCheckDouble}
                color={APP_THEMES.colors.secondary_color_blue}
              />
            </View>
          )}
          <Text
            style={{
              fontFamily: APP_THEMES.fontFamilies.body,
              color: APP_THEMES.colors.color_black,
              fontSize: APP_THEMES.fontSizez.xsmall,

              flex: 3.5,
            }}
          >
            {correctTime}
          </Text>
        </View>
      )}
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
  videoContainer: {
    height: 200,
    flex: 0.8,
    position: "relative",
    borderRadius: 8,
  },
  mainVideo: {
    flex: 1,
    width: "100%",
    borderRadius: 8,
  },
  videoButton: {
    position: "absolute",
    top: "40%",
    right: "40%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
    padding: 10,
    borderRadius: 50,
  },
  coverScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 8,
  },
  imageContainer: {
    height: 200,
    flex: 0.8,
    position: "relative",
    borderColor: "#80ccff",
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default MessagesScreen;
