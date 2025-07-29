import axios from 'axios';
import { getApiUrl } from './config.api';

export default function createAxiosInstance() {
  const baseUrl = getApiUrl();
  const axiosInstance = axios.create({
    baseURL: baseUrl + '/v1/nexus',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': 'ko',
    },
    withCredentials: true,
  });
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('API Error:', error);
      return Promise.reject(error);
    }
  );
  return axiosInstance;
}
