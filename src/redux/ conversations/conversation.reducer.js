import { CONVERSATION_TYPES } from "./conversation.types";

const INITIAL_STATE = {
  conversations: null,
  isLoading: false,
  unread: 0,
  error: null,
};

export const conversationReducers = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case CONVERSATION_TYPES.SET_CONVERSATION_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case CONVERSATION_TYPES.SET_CONVERSATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        conversations: payload,
      };
    case CONVERSATION_TYPES.SET_CONVERSATION_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case CONVERSATION_TYPES.INCREMENT_NOTIFICATION:
      return {
        ...state,
        unread: state.unread + 1,
      };
    case CONVERSATION_TYPES.EMPTY_NOTIFICATION:
      return {
        ...state,
        unread: 0,
      };

    default:
      return state;
  }
};
