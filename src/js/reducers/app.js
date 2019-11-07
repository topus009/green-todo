import constants from '../constants/App';

const { GETTODOS, PENDING } = constants;

export const initialState = {
  todos: [],
  loading: false,
};

export default function app(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case GETTODOS:
      return {
        ...state,
        todos: payload,
        loading: false,
      };
    case PENDING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
