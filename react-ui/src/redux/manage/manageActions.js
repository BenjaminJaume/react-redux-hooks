import manageTypes from "./manageTypes";
import axios from "axios";

let URL_API = "";

process.env.NODE_ENV !== "production"
  ? (URL_API = process.env.REACT_APP_URL_API_DEV)
  : (URL_API = process.env.REACT_APP_URL_API);

// Add a new favorite word

export const getUsersListRequested = () => {
  return {
    type: manageTypes.GET_USERS_LIST_REQUEST,
  };
};

export const getUsersList = () => {
  return (dispatch) => {
    dispatch(getUsersListRequested());

    axios
      .get(URL_API + "/manage/listUsers")
      .then((response) => {
        dispatch(getUsersListSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getUsersListFail(error));
      });
  };
};

export const getUsersListSuccess = (data) => {
  return {
    type: manageTypes.GET_USERS_LIST_SUCCESS,
    payload: data,
  };
};

export const getUsersListFail = (error) => {
  return {
    type: manageTypes.GET_USERS_LIST_FAIL,
    payload: error,
  };
};
