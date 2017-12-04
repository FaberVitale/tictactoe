import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers";
import thunk from "redux-thunk";

const middeware = applyMiddleware(thunk);

const reduxDevTool =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const configureStore =
  process.env.NODE_ENV === "production"
    ? () => createStore(reducer, middeware)
    : () => createStore(reducer, reduxDevTool, middeware);

export default configureStore;
