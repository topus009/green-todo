import axio from 'axios';
import { dbPrefix } from '../config/constants';
import constants from '../constants/App';

const { GETUSERS, GETTODOSERROR, PENDING } = constants;

const axios = axio.create({
  baseURL: dbPrefix,
});

export function getTodos() {
  return dispatch => {
    dispatch({ type: PENDING });
    return axios
      .get('/Activities')
      .then(({ data }) => {
        dispatch({
          type: GETUSERS,
          payload: data,
        });
      })
      .catch(err => {
        console.error({ err });
        return dispatch({ type: GETTODOSERROR });
      });
  };
}
// export function clearFields() {
//   return {
//     type: CLEARFIELDS,
//   };
// }
