// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://walkylovingdogs-437825ae9f55.herokuapp.com/api' // ✅ essa é a URL real do backend
});

export default api;
