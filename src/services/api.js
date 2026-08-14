import api from "./axios";

const ApiService = {
  get: async (url) => {
    const response = await api.get(url);
    return response.data;
  },

  post: async (url, data) => {
    const response = await api.post(url, data);
    return response.data;
  },

  put: async (url, data) => {
    const response = await api.put(url, data);
    return response.data;
  },

  delete: async (url) => {
    const response = await api.delete(url);
    return response.data;
  },
};

export default ApiService;