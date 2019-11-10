import axio from 'axios';
import { dbPrefix, token as fakeToken } from '../config/constants';
import constants from '../constants/Auth';

const { AUTH_TOKEN, AUTH_USER, AUTH_ERROR, AUTH_REQUEST } = constants;

const axios = axio.create({
  baseURL: dbPrefix,
});

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export function signUp({ email, password }) {
  return dispatch => {
    dispatch({ type: AUTH_REQUEST });
    axios
      .post('/Users', {
        UserName: email,
        Password: password,
      })
      .then(() => {
        localStorage.setItem('token', fakeToken);
        dispatch({ type: AUTH_TOKEN });
      })
      .catch(err => dispatch(authError(err)));
  };
}

export function getUser(/* token */) {
  return dispatch => {
    axios
      .get(`/Users/${1}`)
      .then(({ data }) => {
        dispatch({ type: AUTH_USER, payload: data });
      })
      .catch(err => {
        dispatch(authError(err));
      });
  };
}
