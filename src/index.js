import "./polyfills";
import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import registerServiceWorker from "./registerServiceWorker";
import { rootId } from "./constants";

const root = document.getElementById(rootId);

ReactDOM.render(<App />, root);
registerServiceWorker();
