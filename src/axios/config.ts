import axios from "axios";

const { VITE_SERVER_URL } = import.meta.env;

const serverRequest = axios.create({
  baseURL: VITE_SERVER_URL,
});

serverRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default serverRequest;
