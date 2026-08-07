export const QUERY_KEYS = {
  CURRENT_USER: ["current-user"],

  DASHBOARD: ["dashboard"],

  PROJECTS: ["projects"],
  PROJECT: (id) => ["project", id],

  SITES: ["sites"],
  SITE: (id) => ["site", id],

  PROFILE: ["profile"],

  // GIS
  GIS_SITES: ["gis", "sites"],
  GIS_SUMMARY: ["gis", "summary"],
  GIS_CONFIG: ["gis", "config"],

  // Environmental
  ENVIRONMENTAL: ["environmental"],
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

  // Assessment
  ASSESSMENT: ["assessment"],
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

  // Prediction
  PREDICTION: ["prediction"],
  SITE_PREDICTION: (siteId) => [
    "prediction",
    "site",
    siteId,
  ],
  PROJECT_PREDICTION: (projectId) => [
    "prediction",
    "project",
    projectId,
  ],
};