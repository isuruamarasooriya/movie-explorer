import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
  },
});

export default api;