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
  }
};