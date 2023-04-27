import { axiosEvent } from "../../axios";
// import * as mime from "react-native-mime-types";
import mime from "mime";
const { MESSAGES_TYPES } = require("./message.type");

const setMessageLoading = () => {
  return {
    type: MESSAGES_TYPES.SET_MESSAGES_LOADING,
  };
};

const setMessageSuccess = (payload) => {
  return {
    type: MESSAGES_TYPES.SET_MESSAGES_SUCCESS,
    payload,
  };
};
const setMessageError = (payload) => {
  return {
    type: MESSAGES_TYPES.SET_MESSAGES_FAILED,
    payload,
  };
};

const sendMessageLoading = () => {
  return {
    type: MESSAGES_TYPES.SEND_NEW_MESSAGE_LOADING,
  };
};

const sendMessageSuccess = (payload) => {
  return {
    type: MESSAGES_TYPES.SEND_NEW_MESSAGE_SUCCESS,
    payload,
  };
};

const sendMessageError = (payload) => {
  return {
    type: MESSAGES_TYPES.SEND_NEW_MESSAGE_ERROR,
    payload,
  };
};

const addNewMessage = (payload) => {
  return {
    type: MESSAGES_TYPES.SET_NEW_MESSAGE,
    payload,
  };
};

export const messagesActions = {
  fetchMessages: (conversationId, token) => async (dispatch) => {
    dispatch(setMessageLoading());

    try {
      let messages = await axiosEvent.get(
        `/users/conversation/${conversationId}/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setMessageSuccess(messages.data.messages));
    } catch (error) {
      dispatch(setMessageError(error.response.data || error.message));
    }
  },

  sendNewMessage:
    (conversationId, to, message, token, userId, notify, setM) =>
    async (dispatch) => {
      dispatch(sendMessageLoading());
      try {
        let sent = await axiosEvent.post(
          `/users/conversation/${conversationId}/${to}/messages/new`,
          { content: message },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(
          sendMessageSuccess({
            content: sent.data.message,
            sender: userId,
            conversation: conversationId,
          })
        );
        notify();
        setM("");
      } catch (error) {
        dispatch(sendMessageError(error.response.data.content || null));
      }
    },

  addMessage: (message, play) => (dispatch) => {
    console.log("dispatching the new");
    dispatch(addNewMessage(message));
    play && play();
  },

  sendImage: (conversationId, to, token, image) => async (dispatch) => {
    dispatch(sendMessageLoading());

    try {
      let data = new FormData();
      data.append("image", {
        uri: image.uri,
        type: mime.getType(image.uri),
        name: "randomimage" + mime.getType(image.uri).split("/")[1],
      });
      // console.log(data);
      let sent = await axiosEvent.post(
        `/users/conversation/${conversationId}/${to}/message/image`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(sendMessageSuccess(null));
    } catch (error) {
      console.log(error?.response?.data || error);
      dispatch(sendMessageError(error.message));
    }
  },
};

function dataURLtoFile(dataurl) {
  var enc = window.atob(dataurl);

  var image = new File([enc], "random.jpg", {
    type: "image/jpeg",
  });

  return image;
}
