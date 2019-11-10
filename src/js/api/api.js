import axio from 'axios';
import { dbPrefix } from '../config/constants';

const axios = axio.create({
  baseURL: dbPrefix,
});

export const auth = {
  signUp: params => axios.post('/Users', params).then(() => {}),
  getUser: (id = 1) => axios.get(`/Users/${id}`).then(({ data }) => data),
};

export const todos = {
  getTodos: () => axios.get('/Activities').then(({ data }) => data),
};
