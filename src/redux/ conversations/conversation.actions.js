import { axiosEvent } from "../../axios";
import { CONVERSATION_TYPES } from "./conversation.types";

export const setConversationLoading = () => {
  return {
    type: CONVERSATION_TYPES.SET_CONVERSATION_LOADING,
  };
};

const setConversationSuccess = (payload) => {
  return {
    type: CONVERSATION_TYPES.SET_CONVERSATION_SUCCESS,
    payload,
  };
};

const setConversationError = (payload) => {
  return {
    type: CONVERSATION_TYPES.SET_CONVERSATION_ERROR,
    payload,
  };
};

const incrementNotification = () => {
  return {
    type: CONVERSATION_TYPES.INCREMENT_NOTIFICATION,
  };
};

const emptyNotification = () => {
  return {
    type: CONVERSATION_TYPES.EMPTY_NOTIFICATION,
  };
};

export const conversationActions = {
  fetchConversationAsync: (token) => async (dispatch) => {
    dispatch(setConversationLoading());

    try {
      let conversations = await axiosEvent.get("/users/conversations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setConversationSuccess(conversations.data));
    } catch (error) {
      dispatch(
        setConversationError(error.response.data?.message || error.message)
      );
    }
  },

  sendMessage: (token, receiver, conversation, content) => (dispatch) => {
    // dispatch
  },
  receiveMessages: () => (dispatch) => {},

  incrementNotificationAsync: () => (dispatch) => {
    dispatch(incrementNotification());
  },
  emptyNotificationAsync: () => (dispatch) => {
    dispatch(emptyNotification());
  },
};
