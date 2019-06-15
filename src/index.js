import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { rootId } from './constants';

const root = document.getElementById(rootId);

if (root !== null) {
  ReactDOM.render(<App />, root);
  registerServiceWorker();
} else {
  console.error('React root element is not present');
}
