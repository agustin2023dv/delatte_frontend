// src/lib/axios/axiosInstance.ts
import { getToken } from '@features/auth/services/authService';
import axios from 'axios';
import { Platform } from 'react-native';

const baseURL = Platform.select({
  web: process.env.EXPO_PUBLIC_API_URL_WEB || 'http://localhost:8081/api/v1',
  default: process.env.EXPO_PUBLIC_API_URL_MOBILE || 'http://192.168.0.100:8081/api/v1',
});

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);