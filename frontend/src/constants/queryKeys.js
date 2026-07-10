export const QUERY_KEYS = {
  CURRENT_USER: ["current-user"],

  DASHBOARD: ["dashboard"],

  PROJECTS: ["projects"],
  PROJECT: (id) => ["project", id],

  SITES: ["sites"],
  SITE: (id) => ["site", id],

  PROFILE: ["profile"],
};