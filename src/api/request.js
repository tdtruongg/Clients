import axios from "axios";
import { getToken, removeToken } from "../hook/useAuth";
import { message } from "antd";

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

request.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error("Response error:", error);
    if (error.response && error.response.status === 401) {
      message.error("Unauthorized access. Please log in again.");

      setTimeout(() => {
        removeToken();
        window.location.href = "/auth/login";
      }, 1000);
    }
    return Promise.reject(error);
  }
);

export default request;
