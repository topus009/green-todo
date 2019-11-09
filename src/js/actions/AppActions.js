// import axio from 'axios';
// import { dbPrefix } from '../config/constants';
import constants from '../constants/App';
import FAKEDATA from '../../FAKE_DATA';

const { GETTODOS, PENDING, CHANGETODOTITLE, TOGGLETODOCOMPLETED } = constants;

// const axios = axio.create({
//   baseURL: dbPrefix,
// });

export function getTodos() {
  return dispatch => {
    dispatch({ type: PENDING });
    dispatch({
      type: GETTODOS,
      payload: FAKEDATA,
    });
    //   return axios
    //     .get('/Activities')
    //     .then(({ data }) => {
    //       dispatch({
    //         type: GETTODOS,
    //         payload: data,
    //       });
    //     })
    //     .catch(err => {
    //       console.error({ err });
    //       return dispatch({ type: GETTODOSERROR });
    //     });
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
