import userTypes from "./userTypes";

const user = JSON.parse(localStorage.getItem("user"));

const userAuthentification = user
  ? {
      isLoggedIn: true,
      user,
    }
  : {
      isLoggedIn: false,
      user: null,
    };

const initialState = {
  ...userAuthentification,
  changeEmailForm: false,
  loadingChangeEmail: false,
  successChangeEmail: false,
  messageChangeEmail: "",
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case userTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case userTypes.REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case userTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case userTypes.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case userTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case userTypes.CHANGE_EMAIL_FORM:
      return {
        ...state,
        changeEmailForm: action.payload,
        loadingChangeEmail: false,
        successChangeEmail: false,
        messageChangeEmail: "",
      };
    case userTypes.CHANGE_EMAIL_REQUEST:
      return {
        ...state,
        loadingChangeEmail: true,
        successChangeEmail: false,
        messageChangeEmail: "",
      };
    case userTypes.CHANGE_EMAIL_SUCCESS:
      return {
        ...state,
        loadingChangeEmail: false,
        successChangeEmail: action.payload.status,
        messageChangeEmail: action.payload.message,
        user: {
          ...user,
          email: action.payload.email,
        },
        changeEmailForm: false,
      };
    case userTypes.CHANGE_EMAIL_FAIL:
      return {
        ...state,
        loadingChangeEmail: false,
        successChangeEmail: action.payload.status,
        messageChangeEmail: action.payload.message,
        changeEmailForm: false,
      };

    default:
      return state;
  }
}

export default userReducer;
