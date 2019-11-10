import Api from '../api';
import constants from '../constants/App';

const { GETTODOS, PENDING, CHANGETODOTITLE, TOGGLETODOCOMPLETED, GETTODOSERROR } = constants;

export function getTodos() {
  return dispatch => {
    dispatch({ type: PENDING });
    return Api.todos
      .getTodos()
      .then(data => {
        dispatch({
          type: GETTODOS,
          payload: data,
        });
      })
      .catch(err => {
        console.error({ err });
        return dispatch({ type: GETTODOSERROR });
      });
  };
}

export function changeTodoTitle(payload) {
  return {
    type: CHANGETODOTITLE,
    payload,
  };
}

export function toggleTodoCompleted(payload) {
  return {
    type: TOGGLETODOCOMPLETED,
    payload,
  };
}
