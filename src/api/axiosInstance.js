import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://galaxia-social-media-backend-production.up.railway.app/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
