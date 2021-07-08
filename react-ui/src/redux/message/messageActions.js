import messageTypes from "./messageTypes";

export const setMessage = (message) => ({
  type: messageTypes.SET_MESSAGE,
  payload: message,
});

export const clearMessage = () => ({
  type: messageTypes.CLEAR_MESSAGE,
});
