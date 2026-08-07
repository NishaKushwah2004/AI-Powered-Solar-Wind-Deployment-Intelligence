import api from "@/services/api";

import { API_ENDPOINTS } from "@/constants/apiEndpoints";

export const predictionApi = {
  getSitePrediction(siteId) {
    return api.get(
      API_ENDPOINTS.PREDICTION.SITE(siteId)
    );
  },

  getProjectPrediction(projectId) {
    return api.get(
      API_ENDPOINTS.PREDICTION.PROJECT(projectId)
    );
  },
};