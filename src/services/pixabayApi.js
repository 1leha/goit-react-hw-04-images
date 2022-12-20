import axios from 'axios';
import { API_KEY, pixabayOptions } from '../services/options';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchData = async (request, page) => {
  const searchParam = new URLSearchParams(pixabayOptions);
  const url = `?key=${API_KEY}&q=${request}&page=${page}&${searchParam}`;

  const respone = await axios.get(url);
  return respone.data;
};
