import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from '../routes';
import configureStore from '../store';

import '../../styles/base/_main.sass';

export const Store = configureStore();

const Main = () => {
  return (
    <Provider store={Store}>
      <AppRouter />
    </Provider>
  );
};

export default Main;
