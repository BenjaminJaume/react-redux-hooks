import jokeTypes from "./jokeTypes";
import axios from "axios";

const URL_JOKE_API = "https://v2.jokeapi.dev/joke/";

export const fetchJokeRequest = () => {
  return {
    type: jokeTypes.FETCH_JOKE_REQUEST,
  };
};

export const fetchJokeSuccess = (joke) => {
  return {
    type: jokeTypes.FETCH_JOKE_SUCCESS,
    payload: joke,
  };
};

export const fetchJokeFail = (error) => {
  return {
    type: jokeTypes.FETCH_JOKE_FAIL,
    payload: error,
  };
};

export const fetchJoke = (category) => {
  if (!category) {
    return (dispatch) => {
      dispatch(fetchJokeFail("Please provide a category"));
    };
  } else {
    return (dispatch) => {
      dispatch(fetchJokeRequest());
      axios
        .get(URL_JOKE_API + category)
        .then((response) => {
          dispatch(fetchJokeSuccess(response.data));
        })
        .catch((error) => {
          // console.log(JSON.stringify(error));
          dispatch(fetchJokeFail(error));
        });
    };
  }
};

export const setJokeCategory = (category) => {
  return {
    type: jokeTypes.SET_JOKE_CATEGORY,
    payload: category,
  };
};
