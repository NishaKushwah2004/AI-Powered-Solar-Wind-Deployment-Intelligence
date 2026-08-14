import {
  LayoutDashboard,
  FolderKanban,
  MapPinned,
  Map,
  Leaf,
  BarChart3,
  ChartSpline,
  User,
  SunMedium,
  Gauge,
  Zap,
  TrendingUp,
  WalletCards,
  BriefcaseBusiness,
  Target,
} from "lucide-react";

import { ROUTES } from "./routes";


export const sidebarItems = [

  // ============================================================
  // OVERVIEW
  // ============================================================

  {
    title: "Overview",

    items: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: ROUTES.DASHBOARD,
      },
    ],
  },


  // ============================================================
  // PLANNING
  // ============================================================

  {
    title: "Planning",

    items: [
      {
        title: "Projects",
        icon: FolderKanban,
        path: ROUTES.PROJECTS,
      },

      {
        title: "Sites",
        icon: MapPinned,
        path: ROUTES.SITES,
      },

      {
        title: "GIS Map",
        icon: Map,
        path: ROUTES.GIS,
      },
    ],
  },


  // ============================================================
  // EXISTING INTELLIGENCE
  // ============================================================

  {
    title: "Intelligence",

    items: [
      {
        title: "Environmental",
        icon: Leaf,
        path: ROUTES.ENVIRONMENT,
      },

      {
        title: "Assessment",
        icon: BarChart3,
        path: ROUTES.ASSESSMENT,
      },

      {
        title: "Prediction",
        icon: ChartSpline,
        path: ROUTES.PREDICTION,
      },
    ],
  },


  // ============================================================
  // DEPLOYMENT INTELLIGENCE
  // ============================================================

  {
    title: "Deployment Intelligence",

    items: [

      {
        title: "Site Suitability",
        icon: Target,
        path: ROUTES.SUITABILITY,
      },

      {
        title: "Site Scoring",
        icon: Gauge,
        path: ROUTES.SITE_SCORING,
      },

      {
        title: "Renewable Recommendation",
        icon: SunMedium,
        path: ROUTES.RENEWABLE_RECOMMENDATION,
      },

      {
        title: "Deployment Optimization",
        icon: Zap,
        path: ROUTES.DEPLOYMENT_OPTIMIZATION,
      },

      {
        title: "Energy Forecasting",
        icon: TrendingUp,
        path: ROUTES.ENERGY_FORECASTING,
      },

      {
        title: "Investment",
        icon: WalletCards,
        path: ROUTES.INVESTMENT,
      },
    ],
  },


  // ============================================================
  // ROLE DASHBOARDS
  // ============================================================

  {
    title: "Role Dashboards",

    items: [

      {
        title: "Energy Planner",
        icon: SunMedium,
        path: ROUTES.PLANNER_DASHBOARD,

        roles: [
          "Renewable Energy Planner",
          "Project Manager",
          "Admin",
        ],
      },


      {
        title: "GIS Analyst",
        icon: Target,
        path: ROUTES.GIS_ANALYST_DASHBOARD,

        roles: [
          "GIS Analyst",
          "Project Manager",
          "Admin",
        ],
      },


      {
        title: "Project Manager",
        icon: BriefcaseBusiness,
        path: ROUTES.PROJECT_MANAGER_DASHBOARD,

        roles: [
          "Project Manager",
          "Admin",
        ],
      },

    ],
  },


  // ============================================================
  // ACCOUNT
  // ============================================================

  {
    title: "Account",

    items: [
      {
        title: "Profile",
        icon: User,
        path: ROUTES.PROFILE,
      },
    ],
  },

];