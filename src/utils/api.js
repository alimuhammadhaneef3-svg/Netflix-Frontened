import axios from 'axios';

const API = axios.create({ baseURL: 'https://netflix-backend-beta-sand.vercel.app/api' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('netflix_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;

export const IMG_BASE = 'https://image.tmdb.org/t/p/';
export const BACKDROP = (path) => path ? `${IMG_BASE}original${path}` : '';
export const POSTER = (path) => path ? `${IMG_BASE}w500${path}` : '';