import React from 'react';
import { Provider } from 'react-redux';
import Router from '../router';
import configureStore from '../redux/store';
import constants from '../redux/constants/Auth';
import ErrorBoundary from '../hoc/ErrorBoundary';

const { AUTH_TOKEN } = constants;

export const store = configureStore();

const token = localStorage.getItem('token');

if (token) {
  store.dispatch({ type: AUTH_TOKEN });
}

const App = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <Router />
    </Provider>
  </ErrorBoundary>
);

export default App;
