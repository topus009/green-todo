import constants from '../constants/App';

const { GETTODOS, PENDING, CHANGETODOTITLE, TOGGLETODOCOMPLETED } = constants;

export const initialState = {
  todos: {},
  loading: false,
};

export default function app(state = initialState, action) {
  const { payload, type } = action;
  if (type === GETTODOS) {
    const todos = {};
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
        [payload.ID]: {
          ...todos[payload.ID],
          Title: payload.value,
        },
      },
    };
  }
  if (type === TOGGLETODOCOMPLETED) {
    const { todos } = state;
    const newTodos = { ...todos };
    payload.forEach(id => {
      newTodos[id] = {
        ...newTodos[id],
        Completed: !newTodos[id].Completed,
      };
    });
    return {
      ...state,
      todos: newTodos,
    };
  }
  return state;
}
