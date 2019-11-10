import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Router } from 'react-router-dom';
import { createHashHistory } from 'history';
import { defaultTheme } from '../config/theme';
import Loader from '../components/common/Loader';
import Header from '../components/Header';
import Routes from './routes';

export const history = createHashHistory();

const AppRouter = ({ user }) => (
  <Router history={history} basename="/green-todo">
    <Helmet htmlAttributes={{ class: `theme-${defaultTheme}` }} />
    <Suspense fallback={<Loader />}>
      {user && <Header user={user} />}
      <Routes />
    </Suspense>
  </Router>
);

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return {
    user,
  };
};

export default connect(mapStateToProps)(AppRouter);
