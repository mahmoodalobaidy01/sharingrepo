import axios from "axios";
const api = axios;
api.defaults.baseURL = "http://localhost:5500/";
api.interceptors.request.use(async (config) => {
  const token = JSON.parse(localStorage.getItem("user"));
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
});

export default api;
