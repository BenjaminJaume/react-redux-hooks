import axios from "axios";

import userTypes from "./userTypes";
import messageTypes from "../message/messageTypes";

import AuthService from "../../services/auth.service";
import { resetWordDefinitionForm } from "../word/wordActions";

let URL_API = "";
const isDev = process.env.NODE_ENV !== "production";

isDev
  ? (URL_API = process.env.REACT_APP_URL_API_DEV)
  : (URL_API = process.env.REACT_APP_URL_API);

export const register = (username, email, password) => (dispatch) => {
  return AuthService.register(username, email, password).then(
    (response) => {
      dispatch({
        type: userTypes.REGISTER_SUCCESS,
      });

      dispatch({
        type: messageTypes.SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: userTypes.REGISTER_FAIL,
      });

      dispatch({
        type: messageTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      dispatch({
        type: userTypes.LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: userTypes.LOGIN_FAIL,
      });

      dispatch({
        type: messageTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: userTypes.LOGOUT,
  });

  dispatch(resetWordDefinitionForm());
};

// Change user's email

export const setEmailForm = (data) => {
  return {
    type: userTypes.CHANGE_EMAIL_FORM,
    payload: data,
  };
};

export const changeEmailRequested = () => {
  return {
    type: userTypes.CHANGE_EMAIL_REQUEST,
  };
};

export const changeEmail = (userId, email) => {
  return (dispatch) => {
    dispatch(changeEmailRequested());

    axios
      .put(URL_API + "/user/change-email", {
        userId,
        email,
      })
      .then((response) => {
        dispatch(changeEmailSuccess(response.data, email));
      })
      .catch((error) => {
        dispatch(changeEmailFail(error.message || error));
      });
  };
};

export const changeEmailSuccess = (message, email) => {
  return {
    type: userTypes.CHANGE_EMAIL_SUCCESS,
    payload: {
      status: true,
      message,
      email,
    },
  };
};

export const changeEmailFail = (message) => {
  return {
    type: userTypes.CHANGE_EMAIL_FAIL,
    payload: {
      status: false,
      message,
    },
  };
};
