import React, { Suspense } from 'react';
import { shape, string, number, bool } from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Router as ReactRouter } from 'react-router-dom';
import { createHashHistory } from 'history';
import { defaultTheme } from '../config/theme';
import Loader from '../components/common/Loader';
import Header from '../components/Header';
import Routes from './routes';

export const history = createHashHistory();

const propTypes = {
  user: shape({
    ID: number,
    UserName: string.isRequired,
    DueDate: string,
    Completed: bool,
  }),
};

const AppRouter = ({ user }) => (
  <ReactRouter history={history} basename="/green-todo">
    <Helmet htmlAttributes={{ class: `theme-${defaultTheme}` }} />
    <Suspense fallback={<Loader />}>
      {user && <Header user={user} />}
      <Routes />
    </Suspense>
  </ReactRouter>
);

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return {
    user,
  };
};

AppRouter.propTypes = propTypes;

export default connect(mapStateToProps)(AppRouter);
