import api from "@/services/api";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";

export const profileApi = {
  getProfile() {
    return api.get(API_ENDPOINTS.PROFILE.BASE);
  },

  updateProfile(data) {
    return api.put(
      API_ENDPOINTS.PROFILE.BASE,
      data
    );
  },
};