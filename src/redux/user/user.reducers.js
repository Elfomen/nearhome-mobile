import { USER_TYPES } from "./user.types";

const INITIAL_STATE = {
  currentUser: {
    token: null,
    userId: null,
  },
  isLoading: false,
  error: null,
};

export const userReducers = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_TYPES.USER_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case USER_TYPES.SET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        currentUser: payload,
      };
    case USER_TYPES.SET_USER_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case USER_TYPES.LOG_OUT_USER:
      return {
        ...state,
        currentUser: {
          token: null,
          userId: null,
        },
      };
    default:
      return state;
  }
};
