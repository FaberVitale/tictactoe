import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers";
import thunk from "redux-thunk";

export default (function buildConfigureStore() {
  const middeware = applyMiddleware(thunk);

  if (process.env.NODE_ENV === "production") {
    return () => createStore(reducer, middeware);
  }

  const reduxDevTool =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();

  return () => createStore(reducer, reduxDevTool, middeware);
})();
