import api from "@/services/api";

import { API_ENDPOINTS } from "@/constants/apiEndpoints";

export const projectApi = {
  getProjects() {
    return api.get(API_ENDPOINTS.PROJECTS.LIST);
  },

  getProject(id) {
    return api.get(
      API_ENDPOINTS.PROJECTS.DETAILS(id)
    );
  },

  createProject(data) {
    return api.post(
      API_ENDPOINTS.PROJECTS.CREATE,
      data
    );
  },

  updateProject(id, data) {
    return api.put(
      API_ENDPOINTS.PROJECTS.UPDATE(id),
      data
    );
  },

  deleteProject(id) {
    return api.delete(
      API_ENDPOINTS.PROJECTS.DELETE(id)
    );
  },
};