import api from "@/services/api";

import { API_ENDPOINTS } from "@/constants/apiEndpoints";

export const assessmentApi = {
  getSiteReport(siteId) {
    return api.get(
      API_ENDPOINTS.ASSESSMENT.SITE(siteId)
    );
  },

  getProjectReport(projectId) {
    return api.get(
      API_ENDPOINTS.ASSESSMENT.PROJECT(projectId)
    );
  },
};