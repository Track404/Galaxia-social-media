import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://galaxia-social-media-backend-production.up.railway.app/',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Function to detect Safari
function isSafari() {
  const ua = navigator.userAgent;
  return ua.includes('Safari') && !ua.includes('Chrome');
}

// Attach token to requests if Safari
axiosInstance.interceptors.request.use((config) => {
  if (isSafari()) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default axiosInstance;
