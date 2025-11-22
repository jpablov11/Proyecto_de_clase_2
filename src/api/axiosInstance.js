// src/api/axiosInstance.js
import axios from 'axios';

const TOKEN = import.meta.env.VITE_API_TOKEN;

const apiClient = {
  get: async (path) => {
    // path será algo como "/1", "/search/batman", etc.
    const url = `https://www.superheroapi.com/api.php/${TOKEN}${path}`;
    const response = await axios.get(url);
    return response;
  }
};

export default apiClient;