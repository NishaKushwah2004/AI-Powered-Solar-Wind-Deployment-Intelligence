import { dashboardApi } from "../api/dashboardApi";

export const dashboardService = {
  async getSummary() {
    const response = await dashboardApi.getSummary();
    return response.data;
  },
};