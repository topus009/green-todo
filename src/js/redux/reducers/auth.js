import constants from '../constants/Auth';

const { AUTH_TOKEN, AUTH_ERROR, AUTH_USER, AUTH_REQUEST } = constants;

const initialState = {
  loading: false,
};

export default function auth(state = initialState, action) {
  const { payload, type } = action;
  if (type === AUTH_REQUEST) {
    return {
      ...state,
      loading: true,
    };
  }
  if (type === AUTH_TOKEN) {
    return {
      ...state,
      authenticated: true,
      loading: false,
      error: '',
    };
  }
  if (type === AUTH_USER) {
    return {
      ...state,
      user: payload,
    };
  }
  if (type === AUTH_ERROR) {
    return {
      ...state,
      loading: false,
      error: payload,
    };
  }
  return state;
}
