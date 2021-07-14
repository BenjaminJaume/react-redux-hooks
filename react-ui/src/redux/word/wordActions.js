import wordTypes from "./wordTypes";
import axios from "axios";

let URL_API = "";
const isDev = process.env.NODE_ENV !== "production";

isDev
  ? (URL_API = process.env.REACT_APP_URL_API_DEV)
  : (URL_API = process.env.REACT_APP_URL_API);

const URL_API_DICTIONARY = process.env.REACT_APP_URL_API_DICTIONARY;

export const fetchDataRequest = () => {
  return {
    type: wordTypes.FETCH_DATA_REQUEST,
  };
};

export const fetchDataSuccess = (data) => {
  return {
    type: wordTypes.FETCH_DATA_SUCCESS,
    payload: data,
  };
};

export const fetchDataFail = (error) => {
  return {
    type: wordTypes.FETCH_DATA_FAIL,
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

export const addWordRequested = () => {
  return {
    type: wordTypes.ADD_FAVORITE_WORD_REQUEST,
  };
};

export const addWord = (word, partOfSpeech, def, language, userId) => {
  const example = def.example;
  const definition = def.definition;

  return (dispatch) => {
    dispatch(addWordRequested());

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
        dispatch(addWordSuccess());
        dispatch(getAllUserWords(userId));
      })
      .catch((error) => {
        dispatch(addWordFail(error));
      });
  };
};

export const addWordSuccess = () => {
  return {
    type: wordTypes.ADD_FAVORITE_WORD_SUCCESS,
  };
};

export const addWordFail = (error) => {
  return {
    type: wordTypes.ADD_FAVORITE_WORD_FAIL,
    payload: error,
  };
};

// Remove a favorite word

export const removeWordRequested = () => {
  return {
    type: wordTypes.REMOVE_FAVORITE_WORD_REQUEST,
  };
};

export const removeWord = (wordId, userId) => {
  return (dispatch) => {
    dispatch(removeWordRequested());

    axios
      .post(URL_API + "/remove-word/" + wordId, {
        wordId,
        userId,
      })
      .then((_response) => {
        dispatch(removeWordSuccess());
        dispatch(getAllUserWords(userId));
      })
      .catch((error) => {
        dispatch(removeWordFail(error));
      });
  };
};

export const removeWordSuccess = () => {
  return {
    type: wordTypes.REMOVE_FAVORITE_WORD_SUCCESS,
  };
};

export const removeWordFail = (error) => {
  return {
    type: wordTypes.REMOVE_FAVORITE_WORD_FAIL,
    payload: error,
  };
};

// Get all users's favorite words

export const getAllUserWordsRequested = () => {
  return {
    type: wordTypes.GET_ALL_USER_FAVORITE_WORD_REQUEST,
  };
};

export const getAllUserWords = (userId) => {
  return (dispatch) => {
    dispatch(getAllUserWordsRequested());

    axios
      .get(URL_API + "/get-words/" + userId)
      .then((response) => {
        dispatch(getAllUserWordsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getAllUserWordsFail(error));
      });
  };
};

export const getAllUserWordsSuccess = (data) => {
  return {
    type: wordTypes.GET_ALL_USER_FAVORITE_WORD_SUCCESS,
    payload: data,
  };
};

export const getAllUserWordsFail = (error) => {
  return {
    type: wordTypes.GET_ALL_USER_FAVORITE_WORD_FAIL,
    payload: error,
  };
};

// End get all user's favorite words

export const changeSelectedLanguage = (language) => {
  return {
    type: wordTypes.CHANGE_SELECTED_LANGUAGE,
    payload: language,
  };
};

export const changeWord = (word) => {
  return {
    type: wordTypes.CHANGE_WORD,
    payload: word,
  };
};

export const resetWordDefinitionForm = () => {
  return {
    type: wordTypes.RESET_WORD_DEFINITION_FORM,
  };
};

export const setShowToast = (props) => {
  return {
    type: wordTypes.CHANGE_TOAST_STATE,
    payload: props,
  };
};
