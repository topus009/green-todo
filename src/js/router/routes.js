import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import withAuth from '../hoc/withAuth';

const Auth = lazy(() => import('../pages/Auth'));
const Todos = lazy(() => import('../pages/Todos'));

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route exact path="/todos" component={withAuth(Todos)} />
  </Switch>
);

export default Routes;
