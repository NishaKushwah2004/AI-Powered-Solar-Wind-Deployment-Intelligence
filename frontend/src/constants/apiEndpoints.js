export const API_ENDPOINTS = {
  // ============================================================
  // AUTH
  // ============================================================

  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    ME: "/auth/me",
  },


  // ============================================================
  // DASHBOARD
  // ============================================================

  DASHBOARD: {
    SUMMARY: "/dashboard/summary",

    PLANNER: "/dashboard/planner",

    GIS_ANALYST: "/dashboard/gis-analyst",

    PROJECT_MANAGER: "/dashboard/project-manager",
  },


  // ============================================================
  // PROJECTS
  // ============================================================

  PROJECTS: {
    LIST: "/projects",

    CREATE: "/projects",

    DETAILS: (id) =>
      `/projects/${id}`,

    UPDATE: (id) =>
      `/projects/${id}`,

    DELETE: (id) =>
      `/projects/${id}`,
  },


  // ============================================================
  // SITES
  // ============================================================

  SITES: {
    BASE: "/sites",

    BY_ID: (id) =>
      `/sites/${id}`,

    BY_PROJECT: (projectId) =>
      `/sites/project/${projectId}`,
  },


  // ============================================================
  // GIS
  // ============================================================

  GIS: {
    SITES: "/gis/sites",

    SITE: (id) =>
      `/gis/sites/${id}`,

    PROJECT_SITES: (projectId) =>
      `/gis/projects/${projectId}/sites`,

    SUMMARY: "/gis/summary",

    BBOX: "/gis/bbox",

    CONFIG: "/gis/config",
  },


  // ============================================================
  // ENVIRONMENT
  // ============================================================

  ENVIRONMENT: {
    SITE: (siteId) =>
      `/environment/sites/${siteId}`,

    PROJECT: (projectId) =>
      `/environment/projects/${projectId}`,
  },


  // ============================================================
  // ASSESSMENT
  // ============================================================

  ASSESSMENT: {
    SITE: (siteId) =>
      `/assessment/sites/${siteId}/report`,

    PROJECT: (projectId) =>
      `/assessment/projects/${projectId}/report`,
  },


  // ============================================================
  // PREDICTION
  // ============================================================

  PREDICTION: {
    SITE: (siteId) =>
      `/predictions/sites/${siteId}`,

    PROJECT: (projectId) =>
      `/predictions/projects/${projectId}`,
  },


  // ============================================================
  // MILESTONE 3
  // SITE SUITABILITY
  // ============================================================

  SUITABILITY: {
    SITE: (siteId) =>
      `/suitability/sites/${siteId}`,

    PROJECT: (projectId) =>
      `/suitability/projects/${projectId}`,
  },


  // ============================================================
  // SITE SCORING
  // ============================================================

  SITE_SCORING: {
    SITE: (siteId) =>
      `/site-scoring/sites/${siteId}`,

    PROJECT: (projectId) =>
      `/site-scoring/projects/${projectId}`,
  },


  // ============================================================
  // RENEWABLE ENERGY RECOMMENDATION
  // ============================================================

  RENEWABLE_RECOMMENDATION: {
    SITE: (siteId) =>
      `/renewable-recommendation/sites/${siteId}`,

    PROJECT: (projectId) =>
      `/renewable-recommendation/projects/${projectId}`,
  },


  // ============================================================
  // DEPLOYMENT OPTIMIZATION
  // ============================================================

  DEPLOYMENT_OPTIMIZATION: {
    SITE: (siteId) =>
      `/deployment-optimization/sites/${siteId}`,

    PROJECT: (projectId) =>
      `/deployment-optimization/projects/${projectId}`,
  },


  // ============================================================
  // ENERGY FORECASTING
  // ============================================================

  ENERGY_FORECASTING: {
    SITE: (siteId) =>
      `/energy-forecasting/sites/${siteId}`,

    PROJECT: (projectId) =>
      `/energy-forecasting/projects/${projectId}`,
  },


  // ============================================================
  // INVESTMENT RECOMMENDATION
  // ============================================================

  INVESTMENT: {
    SITE: (siteId) =>
      `/investment-recommendation/sites/${siteId}`,

    PROJECT: (projectId) =>
      `/investment-recommendation/projects/${projectId}`,
  },
};