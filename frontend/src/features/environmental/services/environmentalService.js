import { environmentalApi } from "../api/environmentalApi";

export const environmentalService = {
  async getSiteEnvironment(siteId) {
    const { data } =
      await environmentalApi.getSiteEnvironment(
        siteId
      );

    return data;
  },

  async getProjectEnvironment(projectId) {
    const { data } =
      await environmentalApi.getProjectEnvironment(
        projectId
      );

    return data;
  },
};