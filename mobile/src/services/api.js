import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
  // if android : 'http://10.0.2.2:3333'
  // if genymotion: 'http: //10.0.3.2:3333'
});

export default api;
