import constants from '../constants/Auth';
import { getUser } from '../actions/AuthActions';

const { AUTH_TOKEN } = constants;

const setToken = store => next => action => {
  const { type } = action;
  if (type === AUTH_TOKEN) {
    const token = localStorage.getItem('token');
    token && store.dispatch(getUser(token));
  }
  return next(action);
};

export default setToken;
