export const ROUTES = {
  // ============================================================
  // PUBLIC
  // ============================================================

  LANDING: "/",
  LOGIN: "/login",
  REGISTER: "/register",


  // ============================================================
  // DASHBOARD
  // ============================================================

  DASHBOARD: "/dashboard",

  PLANNER_DASHBOARD:
    "/dashboard/planner",

  GIS_ANALYST_DASHBOARD:
    "/dashboard/gis-analyst",

  PROJECT_MANAGER_DASHBOARD:
    "/dashboard/project-manager",


  // ============================================================
  // PROJECTS
  // ============================================================

  PROJECTS: "/projects",

  PROJECT_CREATE:
    "/projects/create",

  PROJECT_EDIT:
    "/projects/:projectId/edit",

  projectEdit: (projectId) =>
    `/projects/${projectId}/edit`,


  // ============================================================
  // SITES
  // ============================================================

  SITES: "/sites",

  SITE_CREATE:
    "/sites/create",

  SITE_EDIT:
    "/sites/:siteId/edit",

  siteEdit: (siteId) =>
    `/sites/${siteId}/edit`,


  // ============================================================
  // GIS
  // ============================================================

  GIS: "/gis",


  // ============================================================
  // ENVIRONMENT
  // ============================================================

  ENVIRONMENT:
    "/environment/:siteId",

  environment: (siteId) =>
    `/environment/${siteId}`,


  // ============================================================
  // ASSESSMENT
  // ============================================================

  ASSESSMENT:
    "/assessment/:siteId",

  assessment: (siteId) =>
    `/assessment/${siteId}`,


  // ============================================================
  // PREDICTION
  // ============================================================

  PREDICTION:
    "/prediction/:siteId",

  prediction: (siteId) =>
    `/prediction/${siteId}`,


  // ============================================================
  // MILESTONE 3
  // ============================================================

  // Site Suitability
  SUITABILITY:
    "/suitability/:siteId",

  suitability: (siteId) =>
    `/suitability/${siteId}`,


  // Site Scoring
  SITE_SCORING:
    "/site-scoring/:siteId",

  siteScoring: (siteId) =>
    `/site-scoring/${siteId}`,


  // Renewable Energy Recommendation
  RENEWABLE_RECOMMENDATION:
    "/renewable-recommendation/:siteId",

  renewableRecommendation: (siteId) =>
    `/renewable-recommendation/${siteId}`,


  // Deployment Optimization
  DEPLOYMENT_OPTIMIZATION:
    "/deployment-optimization/:siteId",

  deploymentOptimization: (siteId) =>
    `/deployment-optimization/${siteId}`,


  // Energy Forecasting
  ENERGY_FORECASTING:
    "/energy-forecasting/:siteId",

  energyForecasting: (siteId) =>
    `/energy-forecasting/${siteId}`,


  // Investment Recommendation
  INVESTMENT:
    "/investment/:siteId",

  investment: (siteId) =>
    `/investment/${siteId}`,


  // ============================================================
  // PROFILE
  // ============================================================

  PROFILE: "/profile",


  // ============================================================
  // ERRORS
  // ============================================================

  UNAUTHORIZED:
    "/unauthorized",

  NOT_FOUND:
    "*",
};