import axios from "axios";
const api = axios;
api.defaults.baseURL = "http://localhost:5500/";

api.interceptors.request.use(async (config) => {
  const token = JSON.parse(localStorage.getItem("user"));
  console.log(token, 5555);
  if (token) {
    console.log(token, 999);
    config.headers.common = { Authorization: `bearer ${token["token"]}` };
    // headers["Authorization"] = "Bearer " + token;
  }
  return config;
});

export default api;
