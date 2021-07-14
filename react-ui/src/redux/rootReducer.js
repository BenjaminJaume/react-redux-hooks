import { combineReducers } from "redux";

import userReducer from "./user/userReducer";
import messageReducer from "./message/messageReducer";
import wordReducer from "./word/wordReducer";
import jokeReducer from "./joke/jokeReducer";
import manageReducer from "./manage/manageReducer";

const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  word: wordReducer,
  joke: jokeReducer,
  manage: manageReducer,
});

export default rootReducer;
