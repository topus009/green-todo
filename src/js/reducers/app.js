import constants from '../constants/App';

const { GETTODOS, PENDING, CHANGETODOTITLE } = constants;

export const initialState = {
  todos: {},
  loading: false,
};

export default function app(state = initialState, action) {
  const { payload, type } = action;
  if (type === GETTODOS) {
    const todos = {};
    payload.length = 3;
    payload.forEach(todo => {
      todos[todo.ID] = todo;
    });
    return {
      ...state,
      todos,
      loading: false,
    };
  }
  if (type === PENDING) {
    return {
      ...state,
      loading: true,
    };
  }
  if (type === CHANGETODOTITLE) {
    const { todos } = state;
    return {
      ...state,
      todos: {
        ...todos,
        [payload.id]: {
          ...todos[payload.id],
          Title: payload.title,
        },
      },
    };
  }
  return state;
}
