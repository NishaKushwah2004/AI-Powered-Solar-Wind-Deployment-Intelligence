import { createBrowserRouter } from "react-router-dom";

import { ROUTES } from "@/config/navigation/routes";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PublicLayout from "@/components/layout/PublicLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

import { LandingPage } from "@/features/landing";

import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";

import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import ProjectsPage from "@/features/projects/pages/ProjectsPage";
import SitesPage from "@/features/sites/pages/SitesPage";
import { GISPage } from "@/features/gis";
import { ProfilePage } from "@/features/profile";
import RoleGuard from "@/components/layout/RoleGuard";
import {
  EnvironmentalPage,
} from "@/features/environmental";

import {
  AssessmentPage,
} from "@/features/assessment";

import {
  CreateSitePage,
  EditSitePage,
} from "@/features/sites";

import {
  NotFoundPage,
  UnauthorizedPage,
} from "@/features/errors";

import {
  CreateProjectPage,
  EditProjectPage,
} from "@/features/projects";

import { PredictionPage } from "@/features/prediction";


export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: ROUTES.LANDING,
        element: <LandingPage />,
      },
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.REGISTER,
        element: <RegisterPage />,
      },
    ],
  },

  {
    path: ROUTES.UNAUTHORIZED,
    element: <UnauthorizedPage />,
  },

  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        path: ROUTES.DASHBOARD,
        element: <DashboardPage />,
      },

      {
        path: ROUTES.PROJECTS,
        element: <ProjectsPage />,
      },

      {
        path: ROUTES.PROJECT_CREATE,
        element: (
          <RoleGuard
            allowedRoles={[
              "Admin",
              "Project Manager",
            ]}
          >
            <CreateProjectPage />
          </RoleGuard>
        ),
      },

      {
        path: ROUTES.PROJECT_EDIT,
        element: (
          <RoleGuard
            allowedRoles={[
              "Admin",
              "Project Manager",
            ]}
          >
            <EditProjectPage />
          </RoleGuard>
        ),
      },

      {
        path: ROUTES.SITES,
        element: <SitesPage />,
      },

      {
        path: ROUTES.SITE_CREATE,
        element: (
          <RoleGuard
            allowedRoles={[
              "Admin",
              "Project Manager",
            ]}
          >
            <CreateSitePage />
          </RoleGuard>
        ),
      },

      {
        path: ROUTES.SITE_EDIT,
        element: (
          <RoleGuard
            allowedRoles={[
              "Admin",
              "Project Manager",
            ]}
          >
            <EditSitePage />
          </RoleGuard>
        ),
      },

      {
        path: ROUTES.GIS,
        element: <GISPage />,
      },

      {
        path: ROUTES.ENVIRONMENT,
        element: (
          <RoleGuard
            allowedRoles={[
              "Admin",
              "GIS Analyst",
              "Project Manager",
              "Renewable Energy Planner",
            ]}
          >
            <EnvironmentalPage />
          </RoleGuard>
        ),
      },

      {
        path: ROUTES.ASSESSMENT,
        element: (
          <RoleGuard
            allowedRoles={[
              "Admin",
              "GIS Analyst",
              "Project Manager",
              "Renewable Energy Planner",
            ]}
          >
            <AssessmentPage />
          </RoleGuard>
        ),
      },

      {
        path: ROUTES.PREDICTION,
        element: <PredictionPage />,
      },

      {
        path: ROUTES.PROFILE,
        element: <ProfilePage />,
      },
    ],
  },

  {
    path: ROUTES.NOT_FOUND,
    element: <NotFoundPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);