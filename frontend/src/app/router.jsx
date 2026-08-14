import { createBrowserRouter } from "react-router-dom";

import { ROUTES } from "@/config/navigation/routes";

// Layouts
import DashboardLayout from "@/components/layout/DashboardLayout";
import PublicLayout from "@/components/layout/PublicLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import RoleGuard from "@/components/layout/RoleGuard";

// Public
import { LandingPage } from "@/features/landing";

import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";

// Existing Dashboard
import DashboardPage from "@/features/dashboard/pages/DashboardPage";

// Projects
import ProjectsPage from "@/features/projects/pages/ProjectsPage";
import {
  CreateProjectPage,
  EditProjectPage,
} from "@/features/projects";

// Sites
import SitesPage from "@/features/sites/pages/SitesPage";
import {
  CreateSitePage,
  EditSitePage,
} from "@/features/sites";

// GIS
import { GISPage } from "@/features/gis";

// Profile
import { ProfilePage } from "@/features/profile";

// Environmental
import {
  EnvironmentalPage,
} from "@/features/environmental";

// Assessment
import {
  AssessmentPage,
} from "@/features/assessment";

// Prediction
import { PredictionPage } from "@/features/prediction";

// Errors
import {
  NotFoundPage,
  UnauthorizedPage,
} from "@/features/errors";

// ============================================================
// MILESTONE 3 - INTELLIGENCE MODULES
// ============================================================

// Site Suitability
import {
  SiteSuitabilityPage,
} from "@/features/suitability";

// Site Scoring
import {
  SiteScoringPage,
} from "@/features/site-scoring";

// Renewable Recommendation
import {
  RenewableRecommendationPage,
} from "@/features/renewable-recommendation";

// Deployment Optimization
import {
  DeploymentOptimizationPage,
} from "@/features/deployment-optimization";

// Energy Forecasting
import {
  EnergyForecastingPage,
} from "@/features/energy-forecasting";

// Investment
import {
  InvestmentRecommendationPage as InvestmentPage,
} from "@/features/investment";

// ============================================================
// MILESTONE 3 - ROLE DASHBOARDS
// ============================================================

// Renewable Energy Planner
import {
  PlannerDashboard as RenewableEnergyDashboardPage,
} from "@/features/renewable-energy-dashboard";

// GIS Analyst
import {
  GISAnalystDashboardPage,
} from "@/features/gis-analyst-dashboard";

// Project Manager
import {
  ProjectManagerDashboardPage,
} from "@/features/project-manager-dashboard";


export const router = createBrowserRouter([
  // ============================================================
  // PUBLIC ROUTES
  // ============================================================

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


  // ============================================================
  // UNAUTHORIZED
  // ============================================================

  {
    path: ROUTES.UNAUTHORIZED,
    element: <UnauthorizedPage />,
  },


  // ============================================================
  // PROTECTED APPLICATION
  // ============================================================

  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),

    children: [
      // ==========================================================
      // OVERVIEW
      // ==========================================================

      {
        path: ROUTES.DASHBOARD,
        element: <DashboardPage />,
      },


      // ==========================================================
      // PROJECTS
      // ==========================================================

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


      // ==========================================================
      // SITES
      // ==========================================================

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


      // ==========================================================
      // GIS
      // ==========================================================

      {
        path: ROUTES.GIS,
        element: <GISPage />,
      },


      // ==========================================================
      // EXISTING INTELLIGENCE
      // ==========================================================

      {
        path: ROUTES.ENVIRONMENT,
        element: <EnvironmentalPage />,
      },

      {
        path: ROUTES.ASSESSMENT,
        element: <AssessmentPage />,
      },

      {
        path: ROUTES.PREDICTION,
        element: <PredictionPage />,
      },


      // ==========================================================
      // MILESTONE 3
      // SITE SUITABILITY
      // ==========================================================

      {
        path: ROUTES.SUITABILITY,
        element: <SiteSuitabilityPage />,
      },


      // ==========================================================
      // MILESTONE 3
      // SITE SCORING
      // ==========================================================

      {
        path: ROUTES.SITE_SCORING,
        element: <SiteScoringPage />,
      },


      // ==========================================================
      // MILESTONE 3
      // RENEWABLE ENERGY RECOMMENDATION
      // ==========================================================

      {
        path: ROUTES.RENEWABLE_RECOMMENDATION,
        element: <RenewableRecommendationPage />,
      },


      // ==========================================================
      // MILESTONE 3
      // DEPLOYMENT OPTIMIZATION
      // ==========================================================

      {
        path: ROUTES.DEPLOYMENT_OPTIMIZATION,
        element: <DeploymentOptimizationPage />,
      },


      // ==========================================================
      // MILESTONE 3
      // ENERGY FORECASTING
      // ==========================================================

      {
        path: ROUTES.ENERGY_FORECASTING,
        element: <EnergyForecastingPage />,
      },


      // ==========================================================
      // MILESTONE 3
      // INVESTMENT RECOMMENDATION
      // ==========================================================

      {
        path: ROUTES.INVESTMENT,
        element: <InvestmentPage />,
      },


      // ==========================================================
      // MILESTONE 3
      // RENEWABLE ENERGY PLANNER DASHBOARD
      // ==========================================================

      {
        path: ROUTES.PLANNER_DASHBOARD,

        element: 
            <RenewableEnergyDashboardPage />
      },


      // ==========================================================
      // MILESTONE 3
      // GIS ANALYST DASHBOARD
      // ==========================================================

      {
        path: ROUTES.GIS_ANALYST_DASHBOARD,

        element: <GISAnalystDashboardPage />
      },


      // ==========================================================
      // MILESTONE 3
      // PROJECT MANAGER DASHBOARD
      // ==========================================================

      {
        path: ROUTES.PROJECT_MANAGER_DASHBOARD,

        element: <ProjectManagerDashboardPage />
      },


      // ==========================================================
      // PROFILE
      // ==========================================================

      {
        path: ROUTES.PROFILE,
        element: <ProfilePage />,
      },
    ],
  },


  // ============================================================
  // NOT FOUND
  // ============================================================

  {
    path: ROUTES.NOT_FOUND,
    element: <NotFoundPage />,
  },
]);