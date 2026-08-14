export const QUERY_KEYS = {
  // ============================================================
  // AUTH
  // ============================================================

  CURRENT_USER: ["current-user"],


  // ============================================================
  // DASHBOARD
  // ============================================================

  DASHBOARD: ["dashboard"],

  PLANNER_DASHBOARD: [
    "dashboard",
    "planner",
  ],

  GIS_ANALYST_DASHBOARD: [
    "dashboard",
    "gis-analyst",
  ],

  PROJECT_MANAGER_DASHBOARD: [
    "dashboard",
    "project-manager",
  ],


  // ============================================================
  // PROJECTS
  // ============================================================

  PROJECTS: ["projects"],

  PROJECT: (projectId) => [
    "projects",
    projectId,
  ],


  // ============================================================
  // SITES
  // ============================================================

  SITES: ["sites"],

  SITE: (siteId) => [
    "sites",
    siteId,
  ],


  // ============================================================
  // PROFILE
  // ============================================================

  PROFILE: ["profile"],


  // ============================================================
  // GIS
  // ============================================================

  GIS_SITES: [
    "gis",
    "sites",
  ],

  GIS_SITE: (siteId) => [
    "gis",
    "site",
    siteId,
  ],

  GIS_SUMMARY: [
    "gis",
    "summary",
  ],

  GIS_CONFIG: [
    "gis",
    "config",
  ],


  // ============================================================
  // ENVIRONMENTAL
  // ============================================================

  ENVIRONMENTAL: [
    "environmental",
  ],

  SITE_ENVIRONMENT: (siteId) => [
    "environmental",
    "site",
    siteId,
  ],

  PROJECT_ENVIRONMENT: (projectId) => [
    "environmental",
    "project",
    projectId,
  ],


  // ============================================================
  // ASSESSMENT
  // ============================================================

  ASSESSMENT: [
    "assessment",
  ],

  SITE_ASSESSMENT: (siteId) => [
    "assessment",
    "site",
    siteId,
  ],

  PROJECT_ASSESSMENT: (projectId) => [
    "assessment",
    "project",
    projectId,
  ],


  // ============================================================
  // PREDICTION
  // ============================================================

  PREDICTION: [
    "prediction",
  ],

  PREDICTION_SITE: (siteId) => [
    "prediction",
    "site",
    siteId,
  ],

  PREDICTION_PROJECT: (projectId) => [
    "prediction",
    "project",
    projectId,
  ],


  // ============================================================
  // SITE SUITABILITY
  // ============================================================

  SUITABILITY: [
    "suitability",
  ],

  SITE_SUITABILITY: (siteId) => [
    "suitability",
    "site",
    siteId,
  ],

  PROJECT_SUITABILITY: (projectId) => [
    "suitability",
    "project",
    projectId,
  ],


  // ============================================================
  // SITE SCORING
  // ============================================================

  SITE_SCORING: [
    "site-scoring",
  ],

  SITE_SCORE: (siteId) => [
    "site-scoring",
    "site",
    siteId,
  ],

  PROJECT_SCORE: (projectId) => [
    "site-scoring",
    "project",
    projectId,
  ],


  // ============================================================
  // RENEWABLE RECOMMENDATION
  // ============================================================

  RENEWABLE_RECOMMENDATION: [
    "renewable-recommendation",
  ],

  SITE_RENEWABLE_RECOMMENDATION: (
    siteId
  ) => [
    "renewable-recommendation",
    "site",
    siteId,
  ],

  PROJECT_RENEWABLE_RECOMMENDATION: (
    projectId
  ) => [
    "renewable-recommendation",
    "project",
    projectId,
  ],


  // ============================================================
  // DEPLOYMENT OPTIMIZATION
  // ============================================================

  DEPLOYMENT_OPTIMIZATION: [
    "deployment-optimization",
  ],

  SITE_DEPLOYMENT_OPTIMIZATION: (
    siteId
  ) => [
    "deployment-optimization",
    "site",
    siteId,
  ],

  PROJECT_DEPLOYMENT_OPTIMIZATION: (
    projectId
  ) => [
    "deployment-optimization",
    "project",
    projectId,
  ],


  // ============================================================
  // ENERGY FORECASTING
  // ============================================================

  ENERGY_FORECASTING: [
    "energy-forecasting",
  ],

  SITE_ENERGY_FORECAST: (
    siteId
  ) => [
    "energy-forecasting",
    "site",
    siteId,
  ],

  PROJECT_ENERGY_FORECAST: (
    projectId
  ) => [
    "energy-forecasting",
    "project",
    projectId,
  ],


  // ============================================================
  // INVESTMENT
  // ============================================================

  INVESTMENT: [
    "investment",
  ],

  SITE_INVESTMENT: (siteId) => [
    "investment",
    "site",
    siteId,
  ],

  PROJECT_INVESTMENT: (projectId) => [
    "investment",
    "project",
    projectId,
  ],
};