import wordTypes from "./wordTypes";

const initialState = {
  languages: ["US English", "Español", "Français"],
  languagesAPI: ["en_US", "es", "fr"],
  countryFlags: ["US", "ES", "FR"],

  loading: false,
  data: [],
  error: "",

  loadingAddWord: false,
  successAddWord: false,
  errorAddWord: "",

  loadingRemoveWord: false,
  successRemoveWord: false,
  errorRemoveWord: "",

  loadingAllWords: false,
  successFetchAllWords: false,
  dataAllWords: [],
  errorGetAllWords: "",

  selectedLanguage: "",
  word: "",
  showToast: false,
};

const wordReducer = (state = initialState, action) => {
  switch (action.type) {
    case wordTypes.FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        data: [],
        error: "",
      };

    case wordTypes.FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
      };

    case wordTypes.FETCH_DATA_FAIL:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };

    case wordTypes.ADD_FAVORITE_WORD_REQUEST:
      return {
        ...state,
        loadingAddWord: true,
        setShowToast: true,
        successAddWord: false,
        errorAddWord: "",
      };

    case wordTypes.ADD_FAVORITE_WORD_SUCCESS:
      return {
        ...state,
        loadingAddWord: false,
        successAddWord: true,
        errorAddWord: "",
        setShowToast: true,
      };

    case wordTypes.ADD_FAVORITE_WORD_FAIL:
      return {
        ...state,
        loadingAddWord: false,
        successAddWord: false,
        errorAddWord: action.payload,
        setShowToast: true,
      };

    case wordTypes.REMOVE_FAVORITE_WORD_REQUEST:
      return {
        ...state,
        loadingRemoveWord: true,
        setShowToast: true,
        successRemoveWord: false,
        errorRemoveWord: "",
      };

    case wordTypes.REMOVE_FAVORITE_WORD_SUCCESS:
      return {
        ...state,
        loadingRemoveWord: false,
        successRemoveWord: true,
        errorRemoveWord: "",
        setShowToast: true,
      };

    case wordTypes.REMOVE_FAVORITE_WORD_FAIL:
      return {
        ...state,
        loadingRemoveWord: false,
        successRemoveWord: false,
        errorRemoveWord: action.payload,
        setShowToast: true,
      };

    // Get user's favorite words
    case wordTypes.GET_ALL_USER_FAVORITE_WORD_REQUEST:
      return {
        ...state,
        loadingAllWords: true,
        successFetchAllWords: false,
        dataAllWords: [],
        errorGetAllWords: "",
      };

    case wordTypes.GET_ALL_USER_FAVORITE_WORD_SUCCESS:
      return {
        ...state,
        loadingAllWords: false,
        successFetchAllWords: true,
        dataAllWords: action.payload,
        errorGetAllWords: "",
      };

    case wordTypes.GET_ALL_USER_FAVORITE_WORD_FAIL:
      return {
        ...state,
        loadingAllWords: false,
        dataAllWords: [],
        successFetchAllWords: false,
        errorGetAllWords: action.payload,
      };

    // Change selected language
    case wordTypes.CHANGE_SELECTED_LANGUAGE:
      return {
        ...state,
        selectedLanguage: action.payload,
      };

    case wordTypes.CHANGE_WORD:
      return {
        ...state,
        word: action.payload,
      };

    case wordTypes.RESET_WORD_DEFINITION_FORM:
      return {
        ...state,
        word: "",
        selectedLanguage: "",
        errorGetAllWords: "",
        dataAllWords: [],
      };

    case wordTypes.CHANGE_TOAST_STATE:
      return {
        ...state,
        showToast: !action.payload,
      };

    default:
      return state;
  }
};

export default wordReducer;
