import { axiosEvent } from "../../axios";

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

  addMessage: (message) => (dispatch) => {
    console.log("dispatching the new");
    dispatch(addNewMessage(message));
  },
};
