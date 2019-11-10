import React, { lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Router, Route, Switch } from 'react-router-dom';
import { createHashHistory } from 'history';
import { defaultTheme } from '../config/theme';
import Loader from '../common/Loader';
import withAuth from '../hoc/withAuth';
import Header from '../components/Header';

const Auth = lazy(() => import('../pages/Auth'));
const Todos = lazy(() => import('../pages/Todos'));

export const history = createHashHistory();

const AppRouter = ({ user }) => (
  <Router history={history} basename="/green-todo">
    <Helmet htmlAttributes={{ class: `theme-${defaultTheme}` }} />
    <Suspense fallback={<Loader />}>
      {user && <Header user={user} />}
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route exact path="/todos" component={withAuth(Todos)} />
      </Switch>
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
