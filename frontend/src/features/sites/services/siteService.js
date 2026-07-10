import { siteApi } from "../api/siteApi";

export const siteService = {
  async getSites() {
    const { data } =
      await siteApi.getAll();

    return data;
  },

  async getSite(id) {
    const { data } =
      await siteApi.getById(id);

    return data;
  },

  async getSitesByProject(projectId) {
    const { data } =
      await siteApi.getByProject(projectId);

    return data;
  },

  async createSite(site) {
    const { data } =
      await siteApi.create(site);

    return data;
  },

  async updateSite(id, site) {
    const { data } =
      await siteApi.update(
        id,
        site
      );

    return data;
  },

  async deleteSite(id) {
    const { data } =
      await siteApi.remove(id);

    return data;
  },
};