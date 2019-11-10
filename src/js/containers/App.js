import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from '../routes';
import configureStore from '../store';
import constants from '../constants/Auth';
import ErrorBoundary from '../hoc/ErrorBoundary';

const { AUTH_TOKEN } = constants;

export const store = configureStore();

const token = localStorage.getItem('token');

if (token) {
  store.dispatch({ type: AUTH_TOKEN });
}

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
