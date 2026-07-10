import { createBrowserRouter } from "react-router-dom";

import { ROUTES } from "@/config/navigation/routes";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PublicLayout from "@/components/layout/PublicLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

import LandingPage from "@/features/landing/pages/LandingPage";

import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";

import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import ProjectsPage from "@/features/projects/pages/ProjectsPage";
import SitesPage from "@/features/sites/pages/SitesPage";
import GISPage from "@/features/gis/pages/GISPage";
import ProfilePage from "@/features/profile/pages/ProfilePage";
import RoleGuard from "@/components/layout/RoleGuard";

import {
  CreateSitePage,
  EditSitePage,
} from "@/features/sites";



import {
  CreateProjectPage,
  EditProjectPage,
} from "@/features/projects";


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
        path: ROUTES.PROFILE,
        element: <ProfilePage />,
      },
    ],
  },
]);