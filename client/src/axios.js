import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Replace with your backend API URL
  withCredentials: true, // Allow cookies (JWT token) to be sent
});

export default api;