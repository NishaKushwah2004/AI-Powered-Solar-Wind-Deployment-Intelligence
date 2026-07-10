import { projectApi } from "../api/projectApi";

export const projectService = {
  async getProjects() {
    const response =
      await projectApi.getProjects();

    return response.data;
  },

  async getProject(id) {
    const response =
      await projectApi.getProject(id);

    return response.data;
  },

  async createProject(data) {
    const response =
      await projectApi.createProject(data);

    return response.data;
  },

  async updateProject(id, data) {
    const response =
      await projectApi.updateProject(
        id,
        data
      );

    return response.data;
  },

  async deleteProject(id) {
    const response =
      await projectApi.deleteProject(id);

    return response.data;
  },
};