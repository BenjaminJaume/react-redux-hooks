import wordDefinitionTypes from "./wordDefinitionTypes";

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

  loadingAllFavoriteWords: false,
  successFetchAllFavoriteWords: false,
  dataAllFavoriteWords: [],
  errorGetAllFavoriteWords: "",

  selectedLanguage: "",
  word: "",
  showToast: false,
};

const wordDefinitionReducer = (state = initialState, action) => {
  switch (action.type) {
    case wordDefinitionTypes.FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case wordDefinitionTypes.FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
      };

    case wordDefinitionTypes.FETCH_DATA_FAIL:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };

    case wordDefinitionTypes.ADD_FAVORITE_WORD_REQUEST:
      return {
        ...state,
        loadingAddWord: true,
        setShowToast: true,
      };

    case wordDefinitionTypes.ADD_FAVORITE_WORD_SUCCESS:
      return {
        ...state,
        loadingAddWord: false,
        successAddWord: true,
        errorAddWord: "",
        setShowToast: true,
      };

    case wordDefinitionTypes.ADD_FAVORITE_WORD_FAIL:
      return {
        ...state,
        loadingAddWord: false,
        successAddWord: false,
        errorAddWord: action.payload,
        setShowToast: true,
      };

    case wordDefinitionTypes.REMOVE_FAVORITE_WORD_REQUEST:
      return {
        ...state,
        loadingRemoveWord: true,
        setShowToast: true,
      };

    case wordDefinitionTypes.REMOVE_FAVORITE_WORD_SUCCESS:
      return {
        ...state,
        loadingRemoveWord: false,
        successRemoveWord: true,
        errorRemoveWord: "",
        setShowToast: true,
      };

    case wordDefinitionTypes.REMOVE_FAVORITE_WORD_FAIL:
      return {
        ...state,
        loadingRemoveWord: false,
        successRemoveWord: false,
        errorRemoveWord: action.payload,
        setShowToast: true,
      };

    // Get user's favorite words
    case wordDefinitionTypes.GET_ALL_USER_FAVORITE_WORD_REQUEST:
      return {
        ...state,
        loadingAllFavoriteWords: true,
      };

    case wordDefinitionTypes.GET_ALL_USER_FAVORITE_WORD_SUCCESS:
      return {
        ...state,
        loadingAllFavoriteWords: false,
        successFetchAllFavoriteWords: true,
        dataAllFavoriteWords: action.payload,
        errorGetAllFavoriteWords: "",
      };

    case wordDefinitionTypes.GET_ALL_USER_FAVORITE_WORD_FAIL:
      return {
        ...state,
        loadingAllFavoriteWords: false,
        dataAllFavoriteWords: [],
        successFetchAllFavoriteWords: false,
        errorGetAllFavoriteWords: action.payload,
      };

    // Change selected language
    case wordDefinitionTypes.CHANGE_SELECTED_LANGUAGE:
      return {
        ...state,
        selectedLanguage: action.payload,
      };

    case wordDefinitionTypes.CHANGE_WORD:
      return {
        ...state,
        word: action.payload,
      };

    case wordDefinitionTypes.RESET_WORD_DEFINITION_FORM:
      return {
        ...state,
        word: "",
        selectedLanguage: "",
        errorGetAllFavoriteWords: "",
        dataAllFavoriteWords: [],
      };

    case wordDefinitionTypes.CHANGE_TOAST_STATE:
      return {
        ...state,
        showToast: !action.payload,
      };

    default:
      return state;
  }
};

export default wordDefinitionReducer;
