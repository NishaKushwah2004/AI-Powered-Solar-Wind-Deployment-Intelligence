import api from "@/services/api";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";

export const authApi = {
  login: (data) => api.post(API_ENDPOINTS.AUTH.LOGIN, data),

  register: (data) => api.post(API_ENDPOINTS.AUTH.REGISTER, data),

  getCurrentUser: () => api.get(API_ENDPOINTS.AUTH.ME),
};