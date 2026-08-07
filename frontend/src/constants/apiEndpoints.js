export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    ME: "/auth/me",
  },

  DASHBOARD: {
    SUMMARY: "/dashboard/summary",
  },

  PROJECTS:{
    LIST:"/projects",
    CREATE:"/projects",
    DETAILS:(id)=>`/projects/${id}`,
    UPDATE:(id)=>`/projects/${id}`,
    DELETE:(id)=>`/projects/${id}`,
  },

  GIS: {
    SITES: "/gis/sites",
    SITE: (id) => `/gis/sites/${id}`,
    PROJECT_SITES: (projectId) =>
      `/gis/projects/${projectId}/sites`,
    SUMMARY: "/gis/summary",
    BBOX: "/gis/bbox",
    CONFIG: "/gis/config",
  },

  PROFILE: {
    BASE: "/profile",
  },

  SITES: {
    BASE: "/sites",

    BY_ID: (id) => `/sites/${id}`,

    BY_PROJECT: (projectId) =>
      `/sites/project/${projectId}`,
  },

  ENVIRONMENT: {
    SITE: (siteId) =>
      `/environment/sites/${siteId}`,

    PROJECT: (projectId) =>
      `/environment/projects/${projectId}`,
  },

  ASSESSMENT: {
    SITE: (siteId) =>
      `/assessment/sites/${siteId}/report`,

    PROJECT: (projectId) =>
      `/assessment/projects/${projectId}/report`,
  },
};