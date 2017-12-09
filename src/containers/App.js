import React, { Component } from "react";
import MediaQuery from "react-responsive";
import { Provider } from "react-redux";
import configureStore from "../configureStore";
import "../css/app.css";
import TicTacToeMain from "./TicTacToeMain";
import TicTacToeHeader from "./TicTacToeHeader";
import { mediaQueryWidth } from "../constants";
import { warn } from "../util/functionUtil";

const store = configureStore();

const dynamicLoader = path => {
  class DynamicLoader extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    storeComponent = esModule => {
      this.setState({
        component: esModule.default
      });
    };

    logFail = err => {
      warn(`failed fetch: ${path}.\n ${err}`);
    };

    componentDidMount() {
      import(`${path}`).then(this.storeComponent, this.logFail);
    }

    shouldComponentUpdate(_, nextState) {
      return !!(this.state.component || nextState.component);
    }

    render() {
      const Comp = this.state.component;

      return Comp ? <Comp {...this.props} /> : null;
    }
  }

  return DynamicLoader;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.keybinder = dynamicLoader("./KeyBinder");
    this.infoBar = dynamicLoader("./TicTacToeInfoBar");
  }

  mediaQCallback = matches => {
    const content = [
      <TicTacToeMain key={0} isLargeScreen={matches} />,
      <this.infoBar key={1} isLargeScreen={matches} />
    ];

    return (
      <Provider store={store}>
        <div id="app">
          <this.keybinder />
          <TicTacToeHeader isLargeScreen={matches} />
          {matches ? content : content.reverse()}
        </div>
      </Provider>
    );
  };

  render() {
    return (
      <MediaQuery query={mediaQueryWidth}>{this.mediaQCallback}</MediaQuery>
    );
  }
}

export default App;
