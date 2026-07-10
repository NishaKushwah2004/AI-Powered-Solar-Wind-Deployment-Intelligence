import api from "@/services/api";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";

export const gisApi = {
  getSites() {
    return api.get(API_ENDPOINTS.GIS.SITES);
  },

  getSite(id) {
    return api.get(API_ENDPOINTS.GIS.SITE(id));
  },

  getProjectSites(projectId) {
    return api.get(
      API_ENDPOINTS.GIS.PROJECT_SITES(projectId)
    );
  },

  getSummary() {
    return api.get(API_ENDPOINTS.GIS.SUMMARY);
  },

  getBoundingBox() {
    return api.get(API_ENDPOINTS.GIS.BBOX);
  },

  getConfig() {
    return api.get(API_ENDPOINTS.GIS.CONFIG);
  },
};