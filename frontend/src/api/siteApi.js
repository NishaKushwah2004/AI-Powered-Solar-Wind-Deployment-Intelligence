import axiosClient from "./axiosClient";

// POST /sites  (Admin, ProjectManager)
// { name, description?, latitude, longitude, region?, land_area?,
//   existing_infrastructure?, project_id } -> SiteResponse (GIS-enriched)
export const createSite = (payload) =>
  axiosClient.post("/sites", payload).then((r) => r.data);

// GET /sites -> SiteResponse[]
export const getAllSites = () =>
  axiosClient.get("/sites").then((r) => r.data);

// GET /sites/project/{project_id} -> SiteResponse[]
export const getSitesByProject = (projectId) =>
  axiosClient.get(`/sites/project/${projectId}`).then((r) => r.data);

// GET /sites/{id} -> SiteResponse
export const getSite = (siteId) =>
  axiosClient.get(`/sites/${siteId}`).then((r) => r.data);

// PUT /sites/{id}  (Admin, ProjectManager) -> SiteResponse
export const updateSite = (siteId, payload) =>
  axiosClient.put(`/sites/${siteId}`, payload).then((r) => r.data);

// DELETE /sites/{id}  (Admin)
export const deleteSite = (siteId) =>
  axiosClient.delete(`/sites/${siteId}`).then((r) => r.data);
