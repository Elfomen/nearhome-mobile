import axios from "axios";
import { axiosEvent } from "../../axios";
import { USER_TYPES } from "./user.types";

const setUserLoading = () => {
  return {
    type: USER_TYPES.USER_LOADING,
  };
};

const setUserSuccess = (payload) => {
  return {
    type: USER_TYPES.SET_USER_SUCCESS,
    payload,
  };
};

const setUserError = (payload) => {
  return {
    type: USER_TYPES.SET_USER_FAILED,
    payload,
  };
};

const logout = () => {
  return {
    type: USER_TYPES.LOG_OUT_USER,
  };
};

export const userActions = {
  logInUser: (username, password) => async (dispatch) => {
    dispatch(setUserLoading());
    try {
      //   let loggedIn = await axiosEvent.post("/carts", {
      let loggedIn = await axiosEvent.post("/users/login", {
        username,
        password,
      });

      // console.log(loggedIn);
      dispatch(
        setUserSuccess({
          token: loggedIn.data.token,
          userId: loggedIn.data.userId,
        })
      );
    } catch (error) {
      console.log("error");
      console.log(error);
      dispatch(setUserError(error.response.data.message));
    }
  },

  signupUser: (data) => async (dispatch) => {
    dispatch(setUserLoading());
    try {
      let created = await axiosEvent.post(
        "/users/signup",
        { ...data },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdhZWxmb21lbjFAZ21haWwuY29tIiwicGhvbmVOdW1iZXIiOiI2Nzg5NDMxMjEiLCJ1c2VySWQiOiI2M2NmZTVhZGUyNGUzNmNiMTJhNDI4YzciLCJpYXQiOjE2NzUyNjcwNzAsImV4cCI6MTY3NTI3MDY3MH0.ilmrOl2-uIYoX6Q61hsmE4X5HfHV20dFIksGGAcDk0w",
          },
        }
      );

      let loggedIn = await axiosEvent.post("/users/login", {
        username: data.email,
        password: data.password,
      });

      // console.log(loggedIn);
      dispatch(
        setUserSuccess({
          token: loggedIn.data.token,
          userId: loggedIn.data.userId,
        })
      );
    } catch (error) {
      dispatch(
        setUserError(
          // error.response.data?.data[0]?.msg ||
          //   error.response.data?.message ||
          error.message
        )
      );
    }
  },

  logOutUser: () => (dispatch) => {
    dispatch(logout());
  },
};
