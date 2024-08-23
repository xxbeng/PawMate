// Axios instance with interceptors for handling token expiry
import axios from 'axios';
import { tokenStorage, userDataStorage } from './localStorageNames';

// Create an Axios instance
const axiosApiInstance = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.REACT_APP_API_URL
});

// Request interceptor
axiosApiInstance.interceptors.request.use(
  (config) => {
    const token = tokenStorage.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosApiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle token expiry or unauthorized access, e.g., redirect to login
      // clear the token
      tokenStorage.remove();
      userDataStorage.remove();
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
