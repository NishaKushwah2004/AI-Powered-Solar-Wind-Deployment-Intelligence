import {
  LayoutDashboard,
  FolderKanban,
  MapPinned,
  Map,
  Sun,
  Wind,
  ChartSpline,
  BarChart3,
  FileText,
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
        title: "Solar Intelligence",
        icon: Sun,
        disabled: true,
      },

      {
        title: "Wind Intelligence",
        icon: Wind,
        disabled: true,
      },

      {
        title: "Forecasting",
        icon: ChartSpline,
        disabled: true,
      },

      {
        title: "Analytics",
        icon: BarChart3,
        disabled: true,
      },
    ],
  },

  {
    title: "Reports",
    items: [
      {
        title: "Reports",
        icon: FileText,
        disabled: true,
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