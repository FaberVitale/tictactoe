import React, { Component } from "react";
import TicTacToeMain from "./TicTacToeMain";
import TicTacToeHeader from "./TicTacToeHeader";
import TicTacToeInfoBar from "./TicTacToeInfoBar";
import Keybinder from "./KeyBinder";
import MediaQuery from "react-responsive";
import { Provider } from "react-redux";
import configureStore from "../configureStore";
import "../css/app.css";
import { mediaQueryWidth } from "../constants";

const store = configureStore();

class App extends Component {
  mediaQCallback(matches) {
    const content = [
      <TicTacToeMain key={0} isLargeScreen={matches} />,
      <TicTacToeInfoBar key={1} isLargeScreen={matches} />
    ];
    return (
      <Provider store={store}>
        <div id="app">
          <Keybinder />
          <TicTacToeHeader isLargeScreen={matches} />
          {matches ? content : content.reverse()}
        </div>
      </Provider>
    );
  }

  render() {
    return (
      <MediaQuery query={mediaQueryWidth}>{this.mediaQCallback}</MediaQuery>
    );
  }
}

export default App;
