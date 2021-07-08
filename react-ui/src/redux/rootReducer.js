import { combineReducers } from "redux";

import userReducer from "./user/userReducer";
import messageReducer from "./message/messageReducer";
import wordDefinitionReducer from "./wordDefinition/wordDefinitionReducer";
import jokeReducer from "./joke/jokeReducer";

const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  wordDefinition: wordDefinitionReducer,
  joke: jokeReducer,
});

export default rootReducer;
