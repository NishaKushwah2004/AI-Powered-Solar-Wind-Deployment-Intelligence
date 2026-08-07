import {
  LayoutDashboard,
  FolderKanban,
  MapPinned,
  Map,
  Leaf,
  BarChart3,
  ChartSpline,
  User,
} from "lucide-react";

import { ROUTES } from "./routes";

export const sidebarItems = [
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