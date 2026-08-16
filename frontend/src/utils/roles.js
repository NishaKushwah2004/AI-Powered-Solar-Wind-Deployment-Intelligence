// Canonical role names exactly as returned by the backend
// (app/auth/permissions.py -> require_roles(...)).
export const ROLES = {
  ADMIN: "Admin",
  PROJECT_MANAGER: "Project Manager",
  GIS_ANALYST: "GIS Analyst",
  RENEWABLE_ENERGY_PLANNER: "Renewable Energy Planner",
};

export const ALL_ROLES = Object.values(ROLES);

export function hasRole(user, ...allowed) {
  if (!user?.role?.name) return false;
  return allowed.includes(user.role.name);
}

export const roleBadgeTone = {
  [ROLES.ADMIN]: "navy",
  [ROLES.PROJECT_MANAGER]: "info",
  [ROLES.GIS_ANALYST]: "brand",
  [ROLES.RENEWABLE_ENERGY_PLANNER]: "warning",
};
