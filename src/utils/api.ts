// utils/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://sih-2024-backend-o83c.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
