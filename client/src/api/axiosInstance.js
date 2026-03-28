// src/api/axiosInstance.js
import axios from "axios";
import { forceLogout } from "../utils/forceLogout"; // ✅ correct path

const BASE_URL =
  import.meta.env.VITE_BACKEND_BASEURL || "http://localhost:3000/api/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) return Promise.reject(error);

    // 🔐 ACCESS TOKEN EXPIRED
    if (
      error.response.status === 401 &&
      error.response.data?.message === "Access token expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await axios.post(
          `${BASE_URL}/users/refresh-token`,
          {},
          { withCredentials: true }
        );

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        await forceLogout();
        return Promise.reject(refreshError);
      }
    }

    // 🔐 OTHER 401
    if (error.response.status === 401) {
      await forceLogout();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;