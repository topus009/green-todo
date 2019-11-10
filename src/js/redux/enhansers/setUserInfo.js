import constants from '../constants/Auth';
import { history } from '../../router/router';

const { AUTH_USER } = constants;

const setUserInfo = () => next => action => {
  const { type } = action;
  if (type === AUTH_USER) {
    history.push('/todos');
  }
  return next(action);
};

export default setUserInfo;
