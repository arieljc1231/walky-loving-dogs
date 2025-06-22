// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://walkylovingdogs-437825ae9f55.herokuapp.com/api', // Produção (Heroku)
  // baseURL: 'http://localhost:5000/api',                         // Desenvolvimento local
});

export default api;