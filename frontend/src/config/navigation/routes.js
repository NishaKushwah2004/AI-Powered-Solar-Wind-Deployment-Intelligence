export const ROUTES = {
  // Public
  LANDING: "/",
  LOGIN: "/login",
  REGISTER: "/register",

  // Protected
  DASHBOARD: "/dashboard",
  // Projects
  PROJECTS: "/projects",
  PROJECT_CREATE: "/projects/create",

  // Route Pattern (used by React Router)
  PROJECT_EDIT: "/projects/:projectId/edit",

  // Builder (used with navigate())
  projectEdit: (projectId) => `/projects/${projectId}/edit`,

  SITES: "/sites",

  SITE_CREATE: "/sites/create",

  SITE_EDIT: "/sites/:siteId/edit",

  siteEdit: (siteId) => `/sites/${siteId}/edit`,

  GIS: "/gis",

  PROFILE: "/profile",

  // Future Modules
  SOLAR: "/solar",
  WIND: "/wind",
  FORECASTING: "/forecasting",
  ANALYTICS: "/analytics",
  REPORTS: "/reports",

  // Errors
  UNAUTHORIZED: "/unauthorized",
  NOT_FOUND: "*",
};