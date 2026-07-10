import axios from "axios";

import { STORAGE_KEYS } from "@/constants/storageKeys";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(
      STORAGE_KEYS.ACCESS_TOKEN
    );

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(
        STORAGE_KEYS.ACCESS_TOKEN
      );

      /**
       * Later Authentication Sprint
       * AuthContext will also clear user state.
       */

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;