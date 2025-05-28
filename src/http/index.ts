import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const API_URL: string = 'http://localhost:5000/api';

interface ApiInstance extends AxiosInstance {
  // Можно добавить кастомные методы API если нужно
}

const $api: ApiInstance = axios.create({
  withCredentials: true, // Исправлено withCredential -> withCredentials
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Добавлены кавычки вокруг token
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config; // Добавлен возврат конфига
});

export default $api;