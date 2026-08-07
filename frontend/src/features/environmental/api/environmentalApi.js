import api from "@/services/api";

import { API_ENDPOINTS } from "@/constants/apiEndpoints";

export const environmentalApi = {
  getSiteEnvironment(siteId) {
    return api.get(
      API_ENDPOINTS.ENVIRONMENT.SITE(siteId)
    );
  },

  getProjectEnvironment(projectId) {
    return api.get(
      API_ENDPOINTS.ENVIRONMENT.PROJECT(projectId)
    );
  },
};