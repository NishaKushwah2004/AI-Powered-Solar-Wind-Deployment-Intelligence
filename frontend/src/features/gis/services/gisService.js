import { gisApi } from "../api/gisApi";

export const gisService = {
  async getSites() {
    const { data } = await gisApi.getSites();
    return data;
  },

  async getSite(id) {
    const { data } = await gisApi.getSite(id);
    return data;
  },

  async getProjectSites(projectId) {
    const { data } =
      await gisApi.getProjectSites(projectId);

    return data;
  },

  async getSummary() {
    const { data } =
      await gisApi.getSummary();

    return data;
  },

  async getBoundingBox() {
    const { data } =
      await gisApi.getBoundingBox();

    return data;
  },

  async getConfig() {
    const { data } =
      await gisApi.getConfig();

    return data;
  },
};