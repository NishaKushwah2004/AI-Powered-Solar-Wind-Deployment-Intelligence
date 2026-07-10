import { authApi } from "../api/authApi";

export const authService = {
  async login(credentials) {
    const response = await authApi.login(credentials);

    return response.data;
  },

  async register(userData) {
    const response = await authApi.register(userData);

    return response.data;
  },

  async getCurrentUser() {
    const response = await authApi.getCurrentUser();

    return response.data;
  },
};