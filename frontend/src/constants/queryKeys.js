export const QUERY_KEYS = {
  CURRENT_USER: ["current-user"],

  DASHBOARD: ["dashboard"],

  PROJECTS: ["projects"],
  PROJECT: (id) => ["project", id],

  SITES: ["sites"],
  SITE: (id) => ["site", id],

  PROFILE: ["profile"],

  GIS_SITES: ["gis", "sites"],
  GIS_SUMMARY: ["gis", "summary"],
  GIS_CONFIG: ["gis", "config"],

  ENVIRONMENTAL: ["environmental"],
  ASSESSMENT: ["assessment"],

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
};