// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // ✅ Porta do backend e prefixo da API
});

export default api;
