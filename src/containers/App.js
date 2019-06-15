import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import '../css/app.css';
import TicTacToeMain from './TicTacToeMain';
import TicTacToeHeader from './TicTacToeHeader';
import TicTacToeInfoBar from './TicTacToeInfoBar';
import { mediaQueryWidth } from '../constants';
import dynamicLoader from '../components/dynamicLoader';

const store = configureStore();

class App extends Component {
  constructor(props) {
    super(props);

    this.keybinder = dynamicLoader(() => import('./KeyBinder'));
  }

  mediaQCallback = matches => {
    const content = [
      <TicTacToeMain key={0} isLargeScreen={matches} />,
      <TicTacToeInfoBar key={1} isLargeScreen={matches} />,
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
