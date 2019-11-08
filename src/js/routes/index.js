import React, { lazy, Suspense } from 'react';
import Helmet from 'react-helmet';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { defaultTheme } from '../config/theme';
import Loader from '../common/Loader';

const Todos = lazy(() => import('../pages/Todos'));
const Auth = lazy(() => import('../pages/Auth'));

const history = createBrowserHistory();
history.push('/todos');

const AppRouter = () => (
  <Router history={history}>
    <Helmet htmlAttributes={{ class: `theme-${defaultTheme}` }} />
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route exact path="/todos" component={Todos} />
      </Switch>
    </Suspense>
  </Router>
);

export default AppRouter;
