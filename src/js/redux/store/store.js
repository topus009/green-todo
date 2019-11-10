import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import setToken from '../enhansers/setToken';
import setUserInfo from '../enhansers/setUserInfo';

const composeEnhancers =
  !PRODUCTION && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

export default function configureStore(initialState) {
  const logger = createLogger();
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, logger, setToken, setUserInfo))
  );

  module.hot?.accept('../reducers', () => {
    const nextRootReducer = require('../reducers');
    store.replaceReducer(nextRootReducer);
  });
  return store;
}
