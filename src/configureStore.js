import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';

export default (function buildConfigureStore() {
  const middeware = applyMiddleware(thunk);

  if (process.env.NODE_ENV === 'production') {
    return () => createStore(reducer, middeware);
  }
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return () => createStore(reducer, composeEnhancers(middeware));
})();
