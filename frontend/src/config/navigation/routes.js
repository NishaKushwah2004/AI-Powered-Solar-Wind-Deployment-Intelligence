export const ROUTES = {
  // Public
  LANDING: "/",
  LOGIN: "/login",
  REGISTER: "/register",

  // Dashboard
  DASHBOARD: "/dashboard",

  // Projects
  PROJECTS: "/projects",
  PROJECT_CREATE: "/projects/create",
  PROJECT_EDIT: "/projects/:projectId/edit",
  projectEdit: (projectId) =>
    `/projects/${projectId}/edit`,

  // Sites
  SITES: "/sites",
  SITE_CREATE: "/sites/create",
  SITE_EDIT: "/sites/:siteId/edit",
  siteEdit: (siteId) =>
    `/sites/${siteId}/edit`,

  // GIS
  GIS: "/gis",

  // Upcoming Modules
  ENVIRONMENT: "/environment/:siteId",

  environment: (siteId) =>
    `/environment/${siteId}`,

  ASSESSMENT: "/assessment/:siteId",

  assessment: (siteId) =>
    `/assessment/${siteId}`,

  PREDICTION: "/prediction/:siteId",

  prediction: (siteId) =>
    `/prediction/${siteId}`,

  // Profile
  PROFILE: "/profile",

  // Errors
  UNAUTHORIZED: "/unauthorized",
  NOT_FOUND: "*",
};