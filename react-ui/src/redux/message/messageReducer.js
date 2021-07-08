import messageTypes from "./messageTypes";

const initialState = {};

function messageReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case messageTypes.SET_MESSAGE:
      return { message: payload };

    case messageTypes.CLEAR_MESSAGE:
      return { message: "" };

    default:
      return state;
  }
}

export default messageReducer;
