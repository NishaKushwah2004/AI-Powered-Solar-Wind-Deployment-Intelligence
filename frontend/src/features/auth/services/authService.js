import { authApi } from "../api/authApi";

export const authService = {
  async login(credentials) {
    const { data } =
      await authApi.login(credentials);

    return data;
  },

  async register(user) {
    const { data } =
      await authApi.register(user);

    return data;
  },

  async getCurrentUser() {
    const { data } =
      await authApi.getCurrentUser();

    return data;
  },
};