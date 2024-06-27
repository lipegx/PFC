import axios from 'axios';

const API_URL = 'http://192.168.1.164:3000'; // Substitua pelo IP correto

const api = axios.create({
  baseURL: API_URL, 
});

export default api;