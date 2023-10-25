import axios from 'axios';


const instance = axios.create({
  baseURL: 'http://213.171.5.191:3002/api',
  validateStatus: () => true,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token-mern')
  return config
})

export default instance;