// frontend/src/services/api.js
import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/api'                                    // -> seu Node/Express local
    : 'https://walkylovingdogs-437825ae9f55.herokuapp.com/api';      // -> produção no Heroku

const api = axios.create({ baseURL });

export default api;
