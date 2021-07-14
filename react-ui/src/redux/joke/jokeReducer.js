import jokeTypes from "./jokeTypes";

const initialState = {
  jokeLoading: false,
  joke: {},
  jokeError: "",
  jokeCategory: "",
};

const jokeReducer = (state = initialState, action) => {
  switch (action.type) {
    case jokeTypes.FETCH_JOKE_REQUEST:
      return {
        ...state,
        jokeLoading: true,
        joke: {},
        jokeError: "",
      };

    case jokeTypes.FETCH_JOKE_SUCCESS:
      return {
        ...state,
        jokeLoading: false,
        joke: action.payload,
        jokeError: "",
      };

    case jokeTypes.FETCH_JOKE_FAIL:
      return {
        ...state,
        jokeLoading: false,
        joke: {},
        jokeError: action.payload,
      };

    case jokeTypes.SET_JOKE_CATEGORY:
      return {
        ...state,
        jokeCategory: action.payload,
      };

    default:
      return state;
  }
};

export default jokeReducer;
