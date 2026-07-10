export const ROLES = {
  ADMIN: "Admin",

  PROJECT_MANAGER: "Project Manager",

  GIS_ANALYST: "GIS Analyst",

  RENEWABLE_PLANNER: "Renewable Energy Planner",
};

export const PERMISSIONS = {
  dashboard: Object.values(ROLES),

  projects: Object.values(ROLES),

  sites: Object.values(ROLES),

  gis: Object.values(ROLES),

  profile: Object.values(ROLES),

  reports: [ROLES.ADMIN],
};