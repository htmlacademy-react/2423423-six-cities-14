import axios, { AxiosInstance } from 'axios';
export const BASE_URL = 'https://14.design.pages.academy/six-cities';
export const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  return api;
};
