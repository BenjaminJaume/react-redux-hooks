import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
// import logger from "redux-logger";
let store = {};

// const middleware = [logger, thunk];
const middleware = [thunk];

if (process.env.NODE_ENV === "development") {
  store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );
} else {
  store = createStore(rootReducer, applyMiddleware(...middleware));
}

export default store;
