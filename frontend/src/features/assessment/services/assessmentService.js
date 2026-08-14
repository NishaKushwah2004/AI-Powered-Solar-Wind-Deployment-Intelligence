import { assessmentApi } from "../api/assessmentApi";

export const assessmentService = {
  async getSiteReport(siteId) {
    const { data } =
      await assessmentApi.getSiteReport(siteId);

    return data;
  },

  async getProjectReport(projectId) {
    const { data } =
      await assessmentApi.getProjectReport(
        projectId
      );

    return data;
  },
};