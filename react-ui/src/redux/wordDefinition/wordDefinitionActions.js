import wordDefinitionTypes from "./wordDefinitionTypes";
import axios from "axios";

let URL_API = "";
const isDev = process.env.NODE_ENV !== "production";

!isDev
  ? (URL_API = process.env.REACT_APP_URL_API_DEV)
  : (URL_API = process.env.REACT_APP_URL_API);

const URL_API_DICTIONARY = process.env.REACT_APP_URL_API_DICTIONARY;

export const fetchDataRequest = () => {
  return {
    type: wordDefinitionTypes.FETCH_DATA_REQUEST,
  };
};

export const fetchDataSuccess = (data) => {
  return {
    type: wordDefinitionTypes.FETCH_DATA_SUCCESS,
    payload: data,
  };
};

export const fetchDataFail = (error) => {
  return {
    type: wordDefinitionTypes.FETCH_DATA_FAIL,
    payload: error,
  };
};

export const fetchWordDefinition = (language, word) => {
  if (!language) {
    return (dispatch) => {
      dispatch(fetchDataFail("Please select a language"));
    };
  } else {
    return (dispatch) => {
      dispatch(fetchDataRequest());
      axios
        .get(URL_API_DICTIONARY + language + "/" + word)
        .then((response) => {
          dispatch(fetchDataSuccess(response.data));
        })
        .catch((error) => {
          // console.log(JSON.stringify(error));
          dispatch(fetchDataFail(error));
        });
    };
  }
};

// Add a new favorite word

export const addFavoriteWordRequested = () => {
  return {
    type: wordDefinitionTypes.ADD_FAVORITE_WORD_REQUEST,
  };
};

export const addFavoriteWord = (word, partOfSpeech, def, language, userId) => {
  const example = def.example;
  const definition = def.definition;

  return (dispatch) => {
    dispatch(addFavoriteWordRequested());

    axios
      .post(URL_API + "/create-word", {
        word,
        partOfSpeech,
        definition,
        example,
        language,
        userId,
      })
      .then((_response) => {
        dispatch(addFavoriteWordSuccess());
        dispatch(getAllUserFavoriteWords(userId));
      })
      .catch((error) => {
        dispatch(addFavoriteWordFail(error));
      });
  };
};

export const addFavoriteWordSuccess = () => {
  return {
    type: wordDefinitionTypes.ADD_FAVORITE_WORD_SUCCESS,
  };
};

export const addFavoriteWordFail = (error) => {
  return {
    type: wordDefinitionTypes.ADD_FAVORITE_WORD_FAIL,
    payload: error,
  };
};

// Remove a favorite word

export const removeFavoriteWordRequested = () => {
  return {
    type: wordDefinitionTypes.REMOVE_FAVORITE_WORD_REQUEST,
  };
};

export const removeFavoriteWord = (wordId, userId) => {
  return (dispatch) => {
    dispatch(removeFavoriteWordRequested());

    axios
      .post(URL_API + "/remove-word/" + wordId, {
        wordId,
        userId,
      })
      .then((_response) => {
        dispatch(removeFavoriteWordSuccess());
        dispatch(getAllUserFavoriteWords(userId));
      })
      .catch((error) => {
        dispatch(removeFavoriteWordFail(error));
      });
  };
};

export const removeFavoriteWordSuccess = () => {
  return {
    type: wordDefinitionTypes.REMOVE_FAVORITE_WORD_SUCCESS,
  };
};

export const removeFavoriteWordFail = (error) => {
  return {
    type: wordDefinitionTypes.REMOVE_FAVORITE_WORD_FAIL,
    payload: error,
  };
};

// Get all users's favorite words

export const getAllUserFavoriteWordsRequested = () => {
  return {
    type: wordDefinitionTypes.GET_ALL_USER_FAVORITE_WORD_REQUEST,
  };
};

export const getAllUserFavoriteWords = (userId) => {
  return (dispatch) => {
    dispatch(getAllUserFavoriteWordsRequested());

    axios
      .get(URL_API + "/get-favorites/" + userId)
      .then((response) => {
        dispatch(getAllUserFavoriteWordsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getAllUserFavoriteWordsFail(error));
      });
  };
};

export const getAllUserFavoriteWordsSuccess = (data) => {
  return {
    type: wordDefinitionTypes.GET_ALL_USER_FAVORITE_WORD_SUCCESS,
    payload: data,
  };
};

export const getAllUserFavoriteWordsFail = (error) => {
  return {
    type: wordDefinitionTypes.GET_ALL_USER_FAVORITE_WORD_FAIL,
    payload: error,
  };
};

// End get all user's favorite words

export const changeSelectedLanguage = (language) => {
  return {
    type: wordDefinitionTypes.CHANGE_SELECTED_LANGUAGE,
    payload: language,
  };
};

export const changeWord = (word) => {
  return {
    type: wordDefinitionTypes.CHANGE_WORD,
    payload: word,
  };
};

export const resetWordDefinitionForm = () => {
  return {
    type: wordDefinitionTypes.RESET_WORD_DEFINITION_FORM,
  };
};

export const setShowToast = (props) => {
  return {
    type: wordDefinitionTypes.CHANGE_TOAST_STATE,
    payload: props,
  };
};
