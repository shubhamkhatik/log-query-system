// Axios Wrapper
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
});

export const fetchLogs = async (filters) => {
  const params = new URLSearchParams(filters);
  const res = await API.get(`/logs?${params.toString()}`);
  return res.data;
};

export const postLog = async (log) => {
  const res = await API.post('/logs', log);
  return res.data;
};

