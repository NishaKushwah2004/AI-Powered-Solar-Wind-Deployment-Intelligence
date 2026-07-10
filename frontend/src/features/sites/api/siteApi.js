import api from "@/services/api";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";

export const siteApi = {
  getAll() {
    return api.get(API_ENDPOINTS.SITES.BASE);
  },

  getById(id) {
    return api.get(
      API_ENDPOINTS.SITES.BY_ID(id)
    );
  },

  getByProject(projectId) {
    return api.get(
      API_ENDPOINTS.SITES.BY_PROJECT(projectId)
    );
  },

  create(data) {
    return api.post(
      API_ENDPOINTS.SITES.BASE,
      data
    );
  },

  update(id, data) {
    return api.put(
      API_ENDPOINTS.SITES.BY_ID(id),
      data
    );
  },

  remove(id) {
    return api.delete(
      API_ENDPOINTS.SITES.BY_ID(id)
    );
  },
};