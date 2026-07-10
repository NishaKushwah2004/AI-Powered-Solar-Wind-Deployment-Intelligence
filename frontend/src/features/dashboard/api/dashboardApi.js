import api from "@/services/api";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";

export const dashboardApi = {
  getSummary() {
    return api.get(API_ENDPOINTS.DASHBOARD.SUMMARY);
  },
};