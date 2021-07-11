import { combineReducers } from "redux";

import userReducer from "./user/userReducer";
import messageReducer from "./message/messageReducer";
import wordDefinitionReducer from "./wordDefinition/wordDefinitionReducer";
import jokeReducer from "./joke/jokeReducer";
import manageReducer from "./manage/manageReducer";

const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  wordDefinition: wordDefinitionReducer,
  joke: jokeReducer,
  manage: manageReducer,
});

export default rootReducer;
