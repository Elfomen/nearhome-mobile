import { MESSAGES_TYPES } from "./message.type";

const INITIAL_STATE = {
  messages: null,
  isLoading: false,
  sendLoading: false,
  error: null,
};

export const messagesReducers = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case MESSAGES_TYPES.SET_MESSAGES_LOADING:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case MESSAGES_TYPES.SET_MESSAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        messages: payload,
        error: null,
      };
    case MESSAGES_TYPES.SET_MESSAGES_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case MESSAGES_TYPES.SEND_NEW_MESSAGE_LOADING:
      return {
        ...state,
        sendLoading: true,
      };
    case MESSAGES_TYPES.SEND_NEW_MESSAGE_SUCCESS:
      return {
        ...state,
        sendLoading: false,
        error: null,
        // messages: [payload, ...messages],
      };
    case MESSAGES_TYPES.SEND_NEW_MESSAGE_ERROR:
      return {
        ...state,
        sendLoading: false,
        error: payload,
      };
    case MESSAGES_TYPES.SET_NEW_MESSAGE:
      return {
        ...state,
        messages: [payload, ...state.messages],
      };

    default:
      return state;
  }
};
