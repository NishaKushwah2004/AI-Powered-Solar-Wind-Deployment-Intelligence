import axiosClient from "./axiosClient";

// GET /gis/sites  (Admin, GISAnalyst, ProjectManager, RenewableEnergyPlanner)
export const getGisSites = () =>
  axiosClient.get("/gis/sites").then((r) => r.data);

// GET /gis/sites/{site_id}
export const getGisSite = (siteId) =>
  axiosClient.get(`/gis/sites/${siteId}`).then((r) => r.data);

// GET /gis/projects/{project_id}/sites
export const getGisProjectSites = (projectId) =>
  axiosClient.get(`/gis/projects/${projectId}/sites`).then((r) => r.data);

// GET /gis/bbox
export const getGisBoundingBox = () =>
  axiosClient.get("/gis/bbox").then((r) => r.data);

// GET /gis/summary
export const getGisSummary = () =>
  axiosClient.get("/gis/summary").then((r) => r.data);

// GET /gis/config
export const getGisMapConfig = () =>
  axiosClient.get("/gis/config").then((r) => r.data);

// GET /gis/enrich  (Admin, GISAnalyst, ProjectManager, RenewableEnergyPlanner)
// query params depend on backend contract (e.g. lat/lng) — pass through.
export const enrichCoordinates = (params) =>
  axiosClient.get("/gis/enrich", { params }).then((r) => r.data);
