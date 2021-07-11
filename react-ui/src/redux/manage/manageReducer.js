import manageTypes from "./manageTypes";

const initialState = {
  loadingUsersList: false,
  usersListData: [],
  usersListError: "",
};

const manageReducer = (state = initialState, action) => {
  switch (action.type) {
    case manageTypes.GET_USERS_LIST_REQUEST:
      return {
        ...state,
        loadingUsersList: true,
      };

    case manageTypes.GET_USERS_LIST_SUCCESS:
      return {
        ...state,
        loadingUsersList: false,
        usersListData: action.payload,
        usersListError: "",
      };

    case manageTypes.GET_USERS_LIST_FAIL:
      return {
        ...state,
        loadingUsersList: false,
        usersListData: [],
        usersListError: action.payload,
      };

    default:
      return state;
  }
};

export default manageReducer;
